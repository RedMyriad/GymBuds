import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View,TouchableWithoutFeedback, Text, TextInput, Button} from 'react-native';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Schedule from './components/Scheduler';


const ScheduleContainer = styled.View`
    flex: 1;
    overflow-y: scroll;
    background: #DDDDDD;
`

const SomeContainer = styled.View`
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

const SchedulePage = ({ route, navigation, }) => {

    let [weekDates, setWeekDates] = useState([]);

    useEffect(()=>{
        initializeWeekDates();
    }, [])

    const initializeWeekDates = () =>{
        let dates = [];
        let curr = new Date;
        let first = curr.getDate() - curr.getDay();

        dates.push(first);

        for(let i = 0; i < 6; i++){
            dates.push(first+i+1)
        }

        setWeekDates(dates);
    }

    const handleScheduleSelection = (event) =>{

    }

    return (
        <ScheduleContainer>
            <Header>
                <View style={{
                    position:'absolute',
                    left: 20,
                }}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("EditProfile")}>
                        <Icon
                        name='arrow-back-ios'
                        type='material'
                        color='#767676'
                        size={27}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <PageHeader>My Schedule</PageHeader>
            </Header>
            <Schedule 
                lang='en'
                rowSize={48}
                minHour={0}
                minMinute={0}
                numberOfRows={24}
                canRemove={true}
                darkMode={false}
                onAppointmentRemoved={(app)=>console.log(app)}
                onSelectedDayChanged={(dayIndex)=>console.log(dayIndex)}
            />
        </ScheduleContainer>
    )
};


const mapStateToProps = (state) => {
    const { user, userImages, userAppInfo} = state
    return { user, userImages, userAppInfo}
};
  
export default connect(mapStateToProps)(SchedulePage);