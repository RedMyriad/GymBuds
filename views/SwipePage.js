import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import CardPage from "./CardPage";

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

const SwipePage = ({ route, navigation }) => {
  const db = [
    {
      id: "1",
      name: 'Richard Hendricks',
      img: require('../public/imgs/richard.jpg')
    },
    {
      id: "2",
      name: 'Erlich Bachman',
      img: require('../public/imgs/erlich.jpg')
    },
    {
      id: "3",
      name: 'Monica Hall',
      img: require('../public/imgs/monica.jpg')
    },
    {
      id: "4",
      name: 'Jared Dunn',
      img: require('../public/imgs/jared.jpg')
    },
    {
      id: "5",
      name: 'Dinesh Chugtai',
      img: require('../public/imgs/dinesh.jpg')
    }
  ]
  
  let [cards, setCards] = useState(db);
  const [cardIndex, setCardIndex] = useState(1);

  useEffect(()=>{
    setCards(db.filter(card=>{
      if(parseInt(card.id) < cardIndex){
        return false;
      }
      return true;
    }))
    console.log(cardIndex)
    console.log(cards)

  }, [cardIndex])

  const nextCard = () =>{
    setCardIndex(cardIndex + 1);
  }

  const prevCard = () =>{
    if(cardIndex === 1){
      return;
    }
    setCardIndex(cardIndex - 1);
  }

  const handleLike = () => {
    nextCard();
  }

  const handleDislike = () =>{
    nextCard();
  }

  const handleGoBack = ()=>{
    prevCard();
  }

  const handleIndexUpdate = () =>{
    nextCard();
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

      <CardPage cards={cards} navigation={navigation} handleIndexUpdate={handleIndexUpdate} />

      <Footer>
        <View>
          <TouchableWithoutFeedback onPress={() => handleGoBack()} >
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
          <TouchableWithoutFeedback onPress={() => handleDislike()} >
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
          <TouchableWithoutFeedback onPress={()=>handleLike()} >
            <Icon
              raised
              name='favorite'
              type='material'
              color='#76e2b3'
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