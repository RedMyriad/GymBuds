import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View,TouchableWithoutFeedback, Text, ImageBackground } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { Icon, Avatar } from 'react-native-elements';

const PageHeader = styled.Text`
    font-weight: 700;
`

const UserName = styled.Text`
    flexDirection: row;
    justifyContent: center;
    marginTop: 10px;
    font-weight: 700;
    font-size: 20px;
    color: black;
`

const ActionContainer = styled.View`
    margin-top: 30px;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    padding-bottom: 10px;
    width: 100%;
    z-index: 2;
`;

const AvatarContainer = styled.View`
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
`
const ProfileContainer = styled.View`
    flex:1;
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

const ContentsContainer = styled.View`
    flex: 1;
    width: 100%;
    align-self: stretch;
    background-color: #fff;
`


const ProfilePage = ({ route, navigation, user, userImages, userAppInfo}) => {
    return (
        <ProfileContainer>
            <Header>
                <View style={{
                position:'absolute',
                left: 20,
                }}>
                    <TouchableWithoutFeedback onPress={() => {navigation.navigate("Swipe")}} >
                        <Icon
                        name='arrow-back-ios'
                        type='material'
                        color='#767676'
                        size={27}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <PageHeader>Profile</PageHeader>
            </Header>
            
            <ContentsContainer>
                <AvatarContainer>
                    <Avatar
                        size={84}
                        rounded
                        source={{ uri: userImages[0]}}
                    />
                    <UserName>{ userAppInfo.name}, {userAppInfo.age}</UserName>
                </AvatarContainer>
                <ActionContainer>
                    <View>
                        <TouchableWithoutFeedback >
                            <Icon
                                raised
                                name='settings'
                                type='material'
                                color='#ec5e6f'
                                size={20}
                            />
                        </TouchableWithoutFeedback>
                        <Text>Settings</Text>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={() => {navigation.navigate("EditProfile")}}>
                            <Icon
                                raised
                                name='edit'
                                type='material'
                                color='#915dd1'
                                size={20}
                            />
                        </TouchableWithoutFeedback>
                        <Text>Edit Profile</Text>
                    </View>
                </ActionContainer>
            </ContentsContainer>
            
        </ProfileContainer>
    )
}


const mapStateToProps = (state) => {
  const { user, userImages, userAppInfo} = state
  return { user, userImages, userAppInfo}
};



export default connect(mapStateToProps)(ProfilePage);