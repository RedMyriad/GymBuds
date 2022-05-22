import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View,TouchableWithoutFeedback, Text, TextInput} from 'react-native';
import styled from 'styled-components';
import ImageGallery from './components/ImageGallery';
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

const EditProfilePage = ({ route, navigation, userImages}) => {

    let [aboutText, setAboutText] = useState("");

    const handleLeave = () =>{
        navigation.navigate("Profile")
        // save new data;
    }

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
        </ProfileContainer>
    )
};


const mapStateToProps = (state) => {
    const { user, userImages, userAppInfo} = state
    return { user, userImages, userAppInfo}
};
  
export default connect(mapStateToProps)(EditProfilePage);