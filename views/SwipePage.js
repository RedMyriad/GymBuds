import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import CardPage from "./CardPage";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCardImages } from "../state/actions/cardImages";
import { updateUserImages } from "../state/actions/userImages";

import { Icon, Avatar } from 'react-native-elements';
import storage from '@react-native-firebase/storage';


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

const SwipePage = ({ route, navigation, user, cards, userAppInfo, updateCardImages, updateUserImages}) => {

  const [loading, setLoading] = useState(true);

  const setLoadingStateAsync = (check) =>{
    return new Promise((resolve) => {
      setLoading(check);
    });
  }

  const setImagesAsync = (imageList) =>{
    return new Promise((resolve) => {
      updateCardImages(imageList);
    });
  }

  const setUserImagesAsync = (imageList) =>{
    return new Promise((resolve) => {
      updateUserImages(imageList);
    });
  }

  useEffect(()=>{
    if(userAppInfo.id){
      handleGetUserData();
    }
  }, [userAppInfo]);

  useEffect(()=>{
    setLoadingStateAsync(true);
    handleGetCards();
  }, [cards]);

  const handleGetImages = async(imageList) =>{
    setImagesAsync(imageList)
  }


  const handleGetUserImages = async(imageList) =>{
    setUserImagesAsync(imageList)
  }

  const handleGetUserData = async() =>{
    setLoadingStateAsync(true);
    let userLocalImages = [];
    for(let image of userAppInfo.images){
      let url = storage().ref("/images/" + image).getDownloadURL().then((res)=>{
        userLocalImages.push(res.toString())
        handleGetUserImages(userLocalImages);
      });
    }
    setLoadingStateAsync(false);
}

  const handleGetCards = async() =>{
    // obtain card images
    let localImages = []
    for(let card of cards){
      for(let image of card.images){
        let url = storage().ref("/images/" + image).getDownloadURL().then((res)=>{
          localImages.push({id:card.id, img: res})
          if(cards[cards.length-1].id === card.id){
            handleGetImages(localImages);
            setLoadingStateAsync(false);
          }
        });
      }
    }
  }

  return (
    <Container>
      <Header>
        <View style={{
          position:'absolute',
          left: 20,
        }}>
          <TouchableWithoutFeedback onPress={() => {navigation.navigate("Profile");}} >
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
        </NoCards> :
        <CardContainer>
          <CardPage navigation={navigation}/>
        </CardContainer>
      }

      
    </Container>
  )
}


const mapStateToProps = (state) => {
  const { user, cards, userAppInfo} = state
  return { user, cards, userAppInfo }
};


const mapDispatchToProps = dispatch => (
  bindActionCreators({
      updateCardImages,
      updateUserImages,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SwipePage);