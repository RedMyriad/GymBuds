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

const CardContainer = styled.View`
  flex: 15;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items:flex-start;
  background-color: #fff;
`

const SwipePage = ({ route, navigation, user }) => {
  
  const [cards, setCards] = useState([]);
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
          localCards.push({id: dbUser.id, name: dbUser.name, img: dbUser.images[0]})
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

  const handleNextCard = () =>{
    const localCards = cards.slice(1);
    setCards(localCards.slice())
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
        <CardContainer>
          <CardPage cards={cards} navigation={navigation} handleNextCard={handleNextCard} userInfoDB={userInfoDB} currentUserDbInfo={currentUserDbInfo}/>
        </CardContainer>
      }
    </Container>
  )
}
const mapStateToProps = (state) => {
  const { user } = state
  return { user }
};

export default connect(mapStateToProps)(SwipePage);