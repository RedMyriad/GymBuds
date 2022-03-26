import React, { useState, useMemo, useRef } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import CardPage from "./CardPage";
import MessagePage from './MessageList';
import LottieView from 'lottie-react-native';

import { Icon, Avatar } from 'react-native-elements';


const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Header = styled.View`
  flex: 1.5;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`

const LogoImage = styled.Image`
    width: 30%;
    height: 100%;
    overflow: hidden;
`

const Footer = styled.View`
    display: flex;
    flex: 2;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;

    width: 100%;
    height: 100%;

    background-color: #fff;
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

const SwipePage = ({ route, navigation }) => {

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
  }

  return (
    <Container>
      <Header>
        <View style={{
          position:'absolute',
          left: 20,
        }}>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true);}} >
            <Icon
              name='person'
              type='material'
              color='#767676'
              size={30}
              />
          </TouchableWithoutFeedback>
        </View>
        <LogoImage source={require('../public/imgs/logo_transparent.png')}/>
        <View style={{
          position:'absolute',
          right: 20,
        }}>
          <TouchableWithoutFeedback onPress={() => {navigation.navigate("MessageList");}} >
            <Icon
              name='forum'
              type='material'
              color='#767676'
              size={25}
              />
          </TouchableWithoutFeedback>
        </View>
      </Header>

      <CardPage/>

      <Footer>
        <View>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true);}} >
            <Icon
              raised
              name='replay'
              type='material'
              color='#f5b748'
              size={20}
              />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true);}} >
            <Icon
              raised
              name='close'
              type='material'
              color='#ec5e6f'
              size={20}
              />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true);}} >
            <Icon
              raised
              name='favorite'
              type='material'
              color='#62b4f9'
              size={20}
              />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => {setCardShowing(true);}} >
            <Icon
              raised
              name='flash-on'
              type='material'
              color='#915dd1'
              size={20}
              />
          </TouchableWithoutFeedback>
        </View>
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