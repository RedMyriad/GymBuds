import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import CardPage from "./CardPage";
import { connect } from 'react-redux';

import { Icon, Avatar } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


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

const NoCards = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items:flex-start;
    padding-bottom: 10px;
    background-color: #fff;
`

const LoadingImage = styled.ImageBackground`
    width: 90%;
    height: 90%;
    overflow: hidden;
    position: relative;
    top: 30px;
    left: 35px;
    border-radius: 10px;
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

const SwipePage = ({ route, navigation, user }) => {
  
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(1);
  const [userInfoDB, setUserInfoDB] = useState([]);
  const [currentUserDbInfo, setCurrentUserDbInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore().collection("users").get().then(querySnapshot => {
      let localDB = []
      querySnapshot.forEach(documentSnapshot => {
        localDB.push(documentSnapshot.data())
      })
      setUserInfoDB(localDB);
    });

  }, [user]);

  useEffect(()=>{
    let localCards = cards === undefined? []: cards;

    for(let dbUser of userInfoDB){
      if(!(user.user.uid === dbUser.id)){
        if(!localCards.filter(e=>e.id === dbUser.id).length > 0){
          let imageString = require(`../public/imgs/dinesh.jpg`);
          localCards.push({id: dbUser.id, name: dbUser.name, img: imageString})
        }
      }
      else{
        setCurrentUserDbInfo(dbUser);
      }
    }
    setCards(localCards);
    if(!(cards !== undefined && cards.length === 0)){
      setLoading(false);
    }

  }, [userInfoDB])

  useEffect(()=>{
    if(cardIndex !== 1){
      const localCards = cards;
      localCards.shift();
      setCards(localCards)
    }
  }, [cardIndex]);

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

      {loading? 
      <NoCards>
        <LoadingImage source={require('../public/imgs/Loading.gif')}></LoadingImage>
      </NoCards>: 
        <CardPage cards={cards} navigation={navigation} handleIndexUpdate={handleIndexUpdate} userInfoDB={userInfoDB} currentUserDbInfo={currentUserDbInfo}/>
      }

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
const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps)(SwipePage);