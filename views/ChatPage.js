import React, { useState, useMemo, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native'

import styled from 'styled-components'

import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

const ChatPageContainer = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    padding: 20px 20px 0 20px;
    background-color: #fff;
`
const Header = styled.View`
    flex: 0.7;
    width: 100%;
    height: 5px;
    min-height: 10px;
    flex-direction: row;
`

const UserHeader = styled.Text`
    width: 100%;
    flex-direction: row;
    border-color: gray;
    border-bottom-width: 1px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
    padding-right: 5%;
    padding-left: 5%;
`

const Footer = styled.View`
    flex: 1.5;
    width: 100%;
    margin-top: 1px;
    flex-direction: row;
    justify-content: center;
    align-items:center;
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
    padding-bottom: 5px;
    color:white;
`

const MessageContent = styled.View`
    flex-direction: column;
`

const MessageBox = styled.TextInput`
    width: 90%;
    padding-right: 10px;
    border-color: gray;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
`

export function useLottieAnim() {
    const animation = useRef<LottieView>(null)

    useEffect(() => {
        if (animation.current) {
        animation.current.play()
        }
        return () => {
        animation.current && animation.current.reset()
        }
    }, [])

    return animation
}

const ChatPage = ({  route, navigation }) =>{

    const [messages, setMessages] = useState([]);
    const [workingUID, setWorkingUID] = useState();
    let message = "";

    let inputRef = useRef(null);
    let listViewRef = useRef(null);

    let partnerName = route.params.partner;
    let user = route.params.user.user;

    let partnetID = "789";

    let userIdCombo1 = user.uid + "_" + partnetID;
    let userIdCombo2 = partnetID + "_" + user.uid;


    useEffect(() => {

        const firstSubscriber = firestore().collection("messages").doc(userIdCombo1).onSnapshot(documentSnapshot => {
            const data = documentSnapshot.data();
            if(data == undefined){
                return;
            }
            setWorkingUID(userIdCombo1);
            data.messages.forEach(message=>{
                let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                message["key"] = id;
            })
            setMessages(data.messages);
        });

        const secondSubscriber = firestore().collection("messages").doc(userIdCombo2).onSnapshot(documentSnapshot => {
            const data = documentSnapshot.data();
            if(data == undefined){
                return;
            }
            setWorkingUID(userIdCombo2);
            data.messages.forEach(message=>{
                let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
                message["key"] = id;
            })
            setMessages(data.messages);
        });

        // Stop listening for updates when no longer required
        return () => { firstSubscriber(); secondSubscriber(); }
    }, []);

    const onMessageChange = (msg) =>{
        message = msg;
    }

    async function handleMessage(){
        if(workingUID !== ""){
            console.log(workingUID)
            firestore().collection("messages").doc(workingUID)
            .update({
                messages: firestore.FieldValue.arrayUnion({
                    id: String(user.uid),
                    text: message,
                })
            }).then((res)=>{
                console.log(res)
            })

        }
    }

    const handleSend = () =>{

        if(message === ""){
            return;
        }

        handleMessage();

        listViewRef.current.scrollToEnd({ animated: true });
        inputRef.current.clear();
        onMessageChange("");
    }

    return(
        <ChatPageContainer>
            <Header>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Swipe")} >
                    <Icon
                        name='chevron-left'
                        type='octicon'

                        size={25}
                        />
                </TouchableWithoutFeedback>
                <UserHeader>{partnerName}</UserHeader>
            </Header>
            
            <MessageList >
              <ScrollView showsVerticalScrollIndicator={false} ref={listViewRef}>
                    {messages.map((messageContent) =>{
                        if(messageContent.id === user.uid){
                            return(
                                <View style={{
                                    backgroundColor: "#147efb",
                                    padding:10,
                                    marginLeft: '45%',
                                    borderRadius: 5,
                                    marginTop: 5,
                                    marginRight: "5%",
                                    maxWidth: '50%',
                                    alignSelf: 'flex-end',
                                    borderRadius: 20,
                                }} key={messageContent.key}>
              
                                    <Message>
                                        <MessageContent>
                                            <Text style={{color: "white"}}>{messageContent.text}</Text>
                                        </MessageContent>
                                    </Message> 
                                </View>
                            )
                        }
                        else{
                            return(
                                <View style={{
                                    backgroundColor: "#caccd1",
                                    padding:10,
                                    borderRadius: 5,
                                    marginTop: 5,
                                    marginLeft: "5%",
                                    maxWidth: '50%',
                                    alignSelf: 'flex-start',
                                    borderRadius: 20,
                                }} key={messageContent.key}>
                                    <Message>
                                        <MessageContent>
                                            <Text style={{color: "black"}}>{messageContent.text}</Text>
                                        </MessageContent>
                                    </Message>
                                </View>
                            )
                        }
                    })}
              </ScrollView>
            </MessageList>
            <Footer>
                <MessageBox
                    onChangeText={onMessageChange}
                    ref={inputRef}
                    placeholder="Text message"
                    keyboardType="default"
                />
                <TouchableWithoutFeedback onPress={handleSend} >
                    <Icon
                        name='send'
                        type='material'
                        color={'#147efb'}
                        size={25}
                        />
                </TouchableWithoutFeedback>
            </Footer>
        </ChatPageContainer>
    )
}

let styles = StyleSheet.create({
    message:{
      marginLeft: 150,
    }
  });

export default ChatPage;