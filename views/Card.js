import React, { useState, useMemo, useEffect, useRef, useCallback} from 'react'
import styled from 'styled-components'
import { Dimensions, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import { connect } from 'react-redux';

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
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

const CardTitle = styled.Text`
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: bold;
    font-size: 21px;
    color: #fff;
`

const LeftHandle = styled.Text`
    position: absolute;
    top: 20px;
    left: 20px;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
`

const RightHandle = styled.Text`
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
`

const SCREEN_WIDTH = Dimensions.get("screen").width;

function Card({ data, cardImages, imageList}) {
    
    let [currentIndex, setCurrentIndex] = useState(0);

    const handleLeft = () =>{
        if(currentIndex === 0){
            return
        }
        setCurrentIndex(currentIndex-1);
    }

    const handleRight = () =>{
        if(currentIndex === imageList.length-1){
            return
        }
        setCurrentIndex(currentIndex+1);
    }

    return (
      <CardContainerSub>
        <CardImage style={[styles.container]} source={{uri: imageList[currentIndex] === undefined? "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2Fdinesh.jpg?alt=media&token=064fc862-b384-42d4-85cc-f448818a9efc" : imageList[currentIndex].img}}>
            <TouchableOpacity
                onPress={handleLeft}
                style={[styles.touchable, styles.left]}
            />
           <TouchableOpacity
                onPress={handleRight}
                style={[styles.touchable, styles.right]}
            />
          <CardTitle>{data.name}</CardTitle>
        </CardImage>
      </CardContainerSub>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row"
    },
    touchable: {
      flex: 1,
      width: SCREEN_WIDTH / 2
    },
    left: {
        backgroundColor: "transparent"
    },
    right: {
        backgroundColor: "transparent"
    }
  });

const mapStateToProps = (state) => {
    const { cardImages } = state
    return { cardImages }
};
  
  
export default connect(mapStateToProps)(Card);
