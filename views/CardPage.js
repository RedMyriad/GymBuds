
import React, { useState, useMemo, useEffect, useRef, useCallback} from 'react'
import { StyleSheet, Text, View, Dimensions, Image, PanResponder, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components'
import SwipeCards from "react-native-swipe-cards-deck";
import firestore from '@react-native-firebase/firestore';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCards } from "../state/actions/cards";


import { Icon, Avatar } from 'react-native-elements';

const CardContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items:flex-start;
    background-color: #fff;
`

const CardContainerSub = styled.View`
    position: absolute;
    top: -315px;
    left: 20px;
    width: 90%;
    height: 560px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
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

const NoCards = styled.View`
    position: absolute;
    left: 20px;
    width: 90%;
    height: 540px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: bold;
    font-size: 21px;
    color: #fff;
`

const Footer = styled.View`
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    padding-bottom: 10px;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    z-index: 2;
`

function CardPage({ navigation, cards, cardImages, userDatabase, user, updateCards}) {

  let currentUserDbInfo = userDatabase.filter(e=>e.id === user.uid)[0];

  const handleNextCard = () =>{
    let localCards = cards;
    localCards = localCards.splice(1);
    updateCards(localCards);
  }

  const handleLike = (userID, likedID) =>{
    // add new like for current user
    firestore().collection("users").doc(userID)
    .update({
      Likes: firestore.FieldValue.arrayUnion(String(likedID))
    })
  };

  function handleYup(card) {
    
    let likedUser = userDatabase.filter(e=>e.id === card.id)[0];

    let matched = false;

    handleLike(currentUserDbInfo.id, card.id)
    

    // check if other user liked current user back
    for(let like of likedUser.Likes){
      if(like === currentUserDbInfo.id){
        matched = true;
        break;
      }
    }

    // send to match page.
    // to be added
    if(matched){
      console.log("Congrats! You got a match!")
    }

    handleNextCard();

    return true;
  };

  function handleNope(card) {
    handleNextCard();
    return true;
  }

  function StatusCard() {
    return (
      <NoCards>
        <LoadingImage source={require('../public/imgs/Loading.gif')}></LoadingImage>
      </NoCards>
    );
  }

  function Card({ data }) {

    let imageURL;
    for(let image of cardImages){
      if(image.id == data.id){
        imageURL = image;
      }
    }

    imageURL = imageURL === undefined? {img: "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2Fdinesh.jpg?alt=media&token=064fc862-b384-42d4-85cc-f448818a9efc"}: imageURL;

    return (
      <CardContainerSub>
        <CardImage source={{uri: imageURL.img}}>
          <CardTitle>{data.name}</CardTitle>
        </CardImage>
      </CardContainerSub>
    );
  }
  
  return (
    <CardContainer>
      <SwipeCards
        cards={cards}
        renderCard={(cardData) => <Card data={cardData} />}
        keyExtractor={(cardData) => String(cardData.id)}
        renderNoMoreCards={() => <StatusCard/>}
        dragY={false}
        stack={true}
        stackDepth={cards.length}
        actions={{
          nope: { show: false, onAction: handleNope },
          yup: { show: false, onAction: handleYup },
        }}
      />
      <Footer>
        <View>
          <TouchableWithoutFeedback onPress={() => handleNope({})} >
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
          <TouchableWithoutFeedback onPress={()=>handleYup(cards[0])} >
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
          <TouchableWithoutFeedback onPress={() => {}} >
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
    </CardContainer>
  );
}

const mapStateToProps = (state) => {
  const { user, cards, cardImages, userDatabase} = state
  return { user, cards, cardImages, userDatabase }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      updateCards,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);