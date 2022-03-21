import React, { useState, useMemo, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux';

import firestore from '@react-native-firebase/firestore';

const MessagesContainer = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
`
const Header = styled.View`
    flex: 1.5;
    width: 100%;
    height: 100%;
`

const ProfileImage = styled.Image`
    width: 45px;
    height: 45px;
    border-radius: 15px;
    overflow: hidden;
    margin-right: 20px;
`

const MessageList = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
`

const Message = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
    border-bottom-color: black;
    border-bottom-width: 0.5px;
    padding-bottom: 5px;
`

const MessageContent = styled.View`
    flex-direction: column;
`


const MessagePage = (props) =>{

    const {navigation} = props;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        firestore().collection("messages").get().then(querySnapshot => {
            let localDB = []
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.id.includes(props.user.user.uid)){
                    let messages = documentSnapshot.data().messages
                    let partnerID = ""; 
                    for(let message of messages){
                        if(message.id !== props.user.user.uid){
                            partnerID = message.id;
                            break;
                        }
                    }
                    
                    let latest = messages[messages .length-1];
                    localDB.push({"name": partnerID, "message": latest.text, "img": require('../public/imgs/dinesh.jpg')})
                }
            })

            setMessages(localDB);
        });
    }, []);

    return(
        <MessagesContainer>
            <Header>
                <Text style={{fontWeight: 'bold', color: "black"}}>Messages</Text>
            </Header>
            <MessageList>
              <ScrollView showsVerticalScrollIndicator={false}>
                    {messages.map((character) =>
                        <TouchableWithoutFeedback onPress={()=> {navigation.navigate("Message",  { partner: 789, user: props.user})}}>
                            <Message key={Math.random().toString(16)}>
                                <ProfileImage source={character.img}/>
                                <MessageContent>
                                    <Text style={{fontWeight: 'bold', color: "black"}}>{character.name}</Text>
                                    <Text>{character.message}</Text>
                                </MessageContent>
                            </Message>
                        </TouchableWithoutFeedback>
                    )}
              </ScrollView>
            </MessageList>
        </MessagesContainer>
    )
}

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

export default connect(mapStateToProps)(MessagePage);