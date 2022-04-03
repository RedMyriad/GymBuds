import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { Icon, Avatar } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

const MessagesContainer = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: #fff;
`
const Header = styled.View`
    flex: 1.5;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom-color: #e2e2e2;
    border-bottom-width: 0.2px;
    padding-bottom: 5px;
`

const LogoImage = styled.Image`
    width: 30%;
    height: 100%;
    overflow: hidden;
`

const MessageListContainer = styled.View`
    flex: 15;
    padding-top: 25px;
    width: 100%;
    height: 100%;
`

const Message = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
    padding-bottom: 5px;
    padding-left: 5px;
`

const MatchContainer = styled.View`
    flex-direction: column;
`

const MatchList = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 5px;
    padding-left: 5px;
`

const MessageContent = styled.View`
    flex-direction: column;
    margin-left: 10px;
    margin-top: 5px;
`

const MatchHeader = styled.Text`
    margin-bottom: 5px;
    font-weight: 500;
    color: #e63946;
`

const MessageHeader = styled.Text`
    margin-bottom: 10px;
    font-weight: 500;
    color: #ffb703;
`


const MessageList = (props) =>{

    const {navigation, user, userDatabase, cardImages} = props;
    const [messages, setMessages] = useState([]);

    let currentUserDbInfo = userDatabase.filter(e=>e.id === user.uid)[0];
    let matchedImages = [];
    let addedID = [];
    
    for(let image of cardImages){
        if(currentUserDbInfo.matches.includes(image.id)){
            if(!addedID.includes(image.id)){
                addedID.push(image.id)
                matchedImages.push(image)
            }
        }
    }

    useEffect(() => {
        firestore().collection("messages").get().then(querySnapshot => {
            let localDB = []
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.id.includes(user.uid)){
                    let messages = documentSnapshot.data().messages
                    let partnerID = ""; 
                    for(let message of messages){
                        if(message.id !== user.uid){
                            partnerID = message.id;
                            break;
                        }
                    }
                    
                    let latest = messages[messages.length-1];
                    localDB.push({"name": partnerID, "message": latest.text, "img": require('../public/imgs/dinesh.jpg')})
                }
            })
            setMessages(localDB);
        });
    }, []);

    return(
        <MessagesContainer>
            <Header>
                <View style={{
                position:'absolute',
                left: 20,
                }}>
                    <TouchableWithoutFeedback onPress={() => {navigation.navigate("Swipe");}} >
                        <Icon
                        name='arrow-back-ios'
                        type='material'
                        color='#767676'
                        size={27}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <LogoImage source={require('../public/imgs/logo_transparent.png')}/>
            </Header>
            <MessageListContainer>
                <TouchableWithoutFeedback >
                    <MatchContainer>
                        <MatchHeader>New Matches</MatchHeader>
                        <MatchList>
                            {matchedImages.map((image) =>
                                <Avatar 
                                    size={50}
                                    rounded 
                                    source={{uri: image.img}}/>
                            )}
                        </MatchList>
                    </MatchContainer>
                </TouchableWithoutFeedback>
                <MessageHeader>Messages</MessageHeader>
                <ScrollView showsVerticalScrollIndicator={false}>
                        {messages.map((character) =>
                            <TouchableWithoutFeedback onPress={()=> {navigation.navigate("Chat",  { partner: 789, user: props.user})}}>
                                <Message key={Math.random().toString(16)}>
                                    <Avatar 
                                        size={50}
                                        rounded 
                                        source={character.img}/>
                                    <MessageContent>
                                        <Text style={{fontWeight: 'bold', color: "black"}}>{character.name}</Text>
                                        <Text>{character.message}</Text>
                                    </MessageContent>
                                </Message>
                            </TouchableWithoutFeedback>
                        )}
                </ScrollView>
            </MessageListContainer>
        </MessagesContainer>
    )
}

const mapStateToProps = (state) => {
    const { user, userDatabase, cardImages } = state
    return { user, userDatabase, cardImages }
};

export default connect(mapStateToProps)(MessageList);