
import React, { useState, useMemo, useEffect, useRef, useCallback} from 'react'
import { StyleSheet, Text, View, Dimensions, Image, PanResponder } from 'react-native';
import styled from 'styled-components'
import SwipeCards from "react-native-swipe-cards-deck";


import LottieView from 'lottie-react-native';


const CardContainer = styled.View`
    flex: 15;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items:flex-start;
    padding-bottom: 10px;
    background-color: #fff;
`

const CardContainerSub = styled.View`
    position: absolute;
    top: -260;
    left: 20;
    width: 90%;
    height: 540px;
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

export default function CardPage({ navigation, cards, handleIndexUpdate }) {

  function handleYup(card) {
    handleIndexUpdate();
    return true;
  }

  function handleNope(card) {
    handleIndexUpdate();
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
    return (
      <CardContainerSub>
        <CardImage source={data.img}>
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
            nope: { show: true, onAction: handleNope },
            yup: { show: false, onAction: handleYup },
          }}
        />
    </CardContainer>
  );
}

