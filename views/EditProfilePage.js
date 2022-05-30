import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View,TouchableWithoutFeedback, Text, TextInput, Button, ScrollView} from 'react-native';
import styled from 'styled-components';
import ImageGallery from './components/ImageGallery';
import CurrentSchedule from './components/CurrentSchedule';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

const ProfileContainer = styled.View`
    flex: 1;
    overflow-y: scroll;
    background: #DDDDDD;
`
const Header = styled.View`
    height: 60px;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom-color: #e2e2e2;
    border-bottom-width: 0.2px;
`

const PageHeader = styled.Text`
    font-weight: 700;
`

const ScheduleButton = styled.Button`

`

const ScheduleContainer = styled.View`
    margin-top: 40px;
    margin: 40px 10px 10px 10px;
`

const SectionHeader = styled.Text`
    font-weight: 500;
    margin-left: 10px;
    margin-bottom: 10px;
`

const AboutInfoContainer = styled.View`
    height: 100px;
    margin: 40px 10px 0px 10px;
`;

const AboutInput = styled.TextInput`
    background: white;
    border-radius: 10px;
    text-align-vertical: top;
`;

const EditProfilePage = ({ route, navigation, userImages, userSchedule}) => {

    let [aboutText, setAboutText] = useState("");
    let [schedule, setSchedule] = useState([]);

    const handleLeave = () =>{
        navigation.navigate("Profile")
        // save new data;
    }

    const handleViewSchedule = () =>{
        // save data
        navigation.navigate("SchedulePage")
    }

    const handleTimeCheck = (itemTime, checkedTime)=>{

        let checkHr = parseInt(checkedTime.split(":")[0]);
        let checkMin = parseInt(checkedTime.split(":")[1]);

        let itemHr = parseInt(itemTime.split(":")[0]);
        let itemMin = parseInt(itemTime.split(":")[1]);

        if(checkHr === itemHr && checkMin === itemMin){
            return true;
        }

    
        if(checkMin === itemMin && checkHr === itemHr){
            return true;
        }

        return false;
    }

    useEffect(()=>{

        if(userSchedule.length > 0){
            let localSchedule = schedule.slice();

            for(let i = 1; i <= 7; i++){

                let dateGroups = [];

                let daySchedule = userSchedule.filter(function(item) {
                    return item.DayIndex === i;
                });

                daySchedule.forEach(item=>{

                    let positionFound = false;

                    if(dateGroups.length === 0){
                        positionFound = true;
                        dateGroups.push({start: item.StartTime, end: item.EndTime});
                    }
                    else{
                        for(let date of dateGroups){
                            let dateHr = parseInt(date.start.split(":")[0]);
                            let checkHr = parseInt(item.StartTime.split(":")[0]);

                            if(checkHr < dateHr && handleTimeCheck(item.EndTime, date.start)){
                                positionFound = true;
                                date.start = item.StartTime;
                            }
                            else if((checkHr === dateHr+1 || checkHr === dateHr) && handleTimeCheck(item.StartTime, date.end)){
                                positionFound = true;
                                date.end = item.EndTime; 
                            }
                        }
                    }
                    if(!positionFound){
                        dateGroups.push({start: item.StartTime, end: item.EndTime});
                    }
                });
                
                localSchedule[i-1] = dateGroups;
            }
            console.log("updating schedule")
            setSchedule(localSchedule);
        }
    }, [userSchedule])

    return (
        <ProfileContainer>
            <Header>
                <View style={{
                position:'absolute',
                left: 20,
                }}>
                    <TouchableWithoutFeedback onPress={() => handleLeave()} >
                        <Icon
                        name='arrow-back-ios'
                        type='material'
                        color='#767676'
                        size={27}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <PageHeader>Edit Profile</PageHeader>
            </Header>
            <ScrollView>
                <ImageGallery/>
                <AboutInfoContainer>
                    <SectionHeader>About Me</SectionHeader>
                    <AboutInput 
                        multiline={true}
                        numberOfLines={4}
                        maxLength={199}
                        onChangeText={(text) => setAboutText(text)}
                        value={aboutText}
                    />
                </AboutInfoContainer>
                <ScheduleContainer>
                    <SectionHeader>Schedule</SectionHeader>
                    <ScheduleButton 
                        title="Set Schedule"
                        onPress={() => handleViewSchedule()}
                    >
                    </ScheduleButton>
                    {schedule.length > 0?
                        <CurrentSchedule data={schedule} />:
                        null
                    }
                </ScheduleContainer>
            </ScrollView>
        </ProfileContainer>
    )
};


const mapStateToProps = (state) => {
    const { user, userImages, userAppInfo, userSchedule} = state
    return { user, userImages, userAppInfo, userSchedule}
};
  
export default connect(mapStateToProps)(EditProfilePage);