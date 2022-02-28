import React, { useState, useMemo } from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import styled from 'styled-components'

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

const db = [
    {
      name: 'Richard Hendricks',
      message: "When did you want to meet up?",
      img: require('../public/imgs/richard.jpg')
    },
    {
      name: 'Erlich Bachman',
      message: "What gym do you go to?",
      img: require('../public/imgs/erlich.jpg')
    },
    {
      name: 'Monica Hall',
      message: "I do an Upper / Lower split.",
      img: require('../public/imgs/monica.jpg')
    },
    {
      name: 'Jared Dunn',
      message: "How often do you spar?",
      img: require('../public/imgs/jared.jpg'),
    },
    {
      name: 'Dinesh Chugtai',
      message: "I like boxing too.",
      img: require('../public/imgs/dinesh.jpg')
    }
  ]

const MessagePage = () =>{

    const [characters, setCharacters] = useState(db)

    return(
        <MessagesContainer>
            <Header>
                <Text style={{fontWeight: 'bold', color: "black"}}>Messages</Text>
            </Header>
            <MessageList>
              <ScrollView showsVerticalScrollIndicator={false}>
                    {characters.map((character) =>
                        <Message key={character.name}>
                            <ProfileImage source={character.img}/>
                            <MessageContent>
                                <Text style={{fontWeight: 'bold', color: "black"}}>{character.name}</Text>
                                <Text>{character.message}</Text>
                            </MessageContent>
                        </Message>
                    )}
                    {characters.map((character) =>
                        <Message key={character.name}>
                            <ProfileImage source={character.img}/>
                            <MessageContent>
                                <Text style={{fontWeight: 'bold', color: "black"}}>{character.name}</Text>
                                <Text>{character.message}</Text>
                            </MessageContent>
                        </Message>
                    )}
              </ScrollView>
            </MessageList>
        </MessagesContainer>
    )
}

export default MessagePage;