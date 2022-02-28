import React, { useState, useMemo, useRef } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import CardPage from "./CardPage";
import MessagePage from './MessagePage';
import LottieView from 'lottie-react-native';

import { Icon } from 'react-native-elements';


const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const ProfileImage = styled.Image`
    z-index: 2;
    position: absolute;
    top: 8px;
    left: 15px;
    width: 45px;
    height: 45px;
    border-radius: 15px;
    overflow: hidden;
`

const LogoImage = styled.Image`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const Header = styled.View`
    flex: 1.5;
    color: #000;
    font-size: 30px;

    align-items: center;
    justify-content: center;
    resize-mode: cover;

    width: 100%;
    height: 100%;
    color: "yellow";
`

const Footer = styled.View`
    display: flex;
    flex: 1.5;
    color: #000;
    align-items: center;
    font-size: 30px;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #ffe476;
    z-index: 2;
`

const db = [
  {
    name: 'Richard Hendricks',
    img: require('../public/imgs/richard.jpg')
  },
  {
    name: 'Erlich Bachman',
    img: require('../public/imgs/erlich.jpg')
  },
  {
    name: 'Monica Hall',
    img: require('../public/imgs/monica.jpg')
  },
  {
    name: 'Jared Dunn',
    img: require('../public/imgs/jared.jpg')
  },
  {
    name: 'Dinesh Chugtai',
    img: require('../public/imgs/dinesh.jpg')
  }
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

const SwipePage = ({ navigation }) => {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();
  const [cardShowing, setCardShowing] = useState(true);

  const msgAnimationRef = useRef(null);

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete + ' to the ' + direction)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  const messageSelected = () =>{
    setCardShowing(false); 
    msgAnimationRef.current.play();
  }

  return (
    <Container>
      <Header>
        <ProfileImage source={require('../public/imgs/richard.jpg')}/>
        <LogoImage source={require('../public/imgs/twitter_header_photo_2.png')}/>
      </Header>
      { (!cardShowing) && 
        <MessagePage/>
      }
      { cardShowing && 
        <CardPage/>
      }
      <Footer>
        <View style={{paddingLeft: 100, zIndex: 2,}}>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true); console.log("ere")}} >
            <Icon
                  name='code-of-conduct'
                  type='octicon'

                  size={45}
                  />
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={()=>messageSelected()}>
          <LottieView 
            ref={msgAnimationRef} 
            style={styles.message} 
            source={require('../public/imgs/message-conversation.json')} loop speed={0.9} />
        </TouchableWithoutFeedback>
      </Footer>
    </Container>
  )
}

let styles = StyleSheet.create({
  message:{
    marginTop: 2,
    marginLeft: 100,
  }
});


export default SwipePage;