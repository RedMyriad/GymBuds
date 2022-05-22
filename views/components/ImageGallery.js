import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text, ImageBackground } from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as ImagePicker from "react-native-image-picker"
import { PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const GalleryContainer = styled.View`
    
`

const GalleryRow = styled.View`
    margin-top: 20px;
    height: 150px;
    width: 100%;
    flexDirection: row;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`

const MediaActionIcon = styled.View`
    position: absolute;
    bottom: -4px;
    right: -4px;
    z-index: 5;
`

const StyledIcon = styled(Icon)`
    z-index: 5;
    background: red;
`

const CardContainerSub = styled.View`
    width: 30%;
    height: 100%;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
    margin-left: 10px;
`

const ImageGallery = ({userImages, userDatabase, user}) => {
    
    let currentUserDbInfo = userDatabase.filter(e=>e.id === user.uid)[0];
    const [firstRow , setFirstRow] = useState(true);
    const [secondRow, setSecondRow] = useState(true);

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [loading, setLoading] = useState(true);

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.CAMERA);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    useEffect(()=>{

        let tempFirstRow = [];
        let tempSecondRow = [];
        
        for(let image of userImages){
            // no more images allowed
            if(tempFirstRow.length == 3 && tempSecondRow.length == 3){
                break;
            }

            if(tempFirstRow.length < 3){
                tempFirstRow.push(image);
                continue;
            }
            tempSecondRow.push(image);
        }

        // fill empty spaces
        let firstSize = 3 - tempFirstRow.length;
        let secondSize = 3 - tempSecondRow.length;
        let defaultImage = "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea";

        for(let i = 0; i < firstSize; i++){
            tempFirstRow.push(defaultImage);
        }   

        for(let i = 0; i < secondSize; i++){
            tempSecondRow.push(defaultImage);
        }

        setFirstRow(tempFirstRow);
        setSecondRow(tempSecondRow);
        setLoading(false);
    }, [userImages]);


    useEffect(()=>{

        if(image){
            uploadImage();
        }

    }, [image]);

    const handleAddImageName = (filename) =>{
        // add new like for current user
        firestore().collection("users").doc(currentUserDbInfo.id,)
        .update({
          images: firestore.FieldValue.arrayUnion(String(filename))
        })
    };

    const handleRemoveImageName = (filename) =>{

        // match firebase image storage url to get file name
        let regex = /%.*(?:jpg|gif|png)/g,
            match;
        match = regex.exec(filename)[0].replace('%2F', '');

        firestore().collection("users").doc(currentUserDbInfo.id,)
            .update({
                images: firestore.FieldValue.arrayRemove(String(match))
            })
    }

    const uploadImage = async () => {
        
        const uri  = image;

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        setUploading(true);
        setTransferred(0);

        const task = storage()
            .ref("/images/" + filename)
            .putFile(uploadUri);

        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });

        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        
        setUploading(false);
        setImage(null);

        handleAddImageName(filename);
    };

    const handleShowImagePicker = () =>{
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setImage(res.assets[0].uri);
            }
        });
    }



    return (
        <GalleryContainer>
            {loading? 
                <View></View>:
                <GalleryRow>
                    {firstRow.map(image => {
                        if(image === "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea"){
                            return(
                                <CardContainerSub> 
                                    <CardImage source={{uri: image}}>
                                        <TouchableWithoutFeedback onPress={() => {handleShowImagePicker()}}>
                                            <MediaActionIcon>
                                                <StyledIcon
                                                    raised
                                                    name='add'
                                                    type='material'
                                                    color='green'
                                                    size={10}
                                                />
                                            </MediaActionIcon>
                                        </TouchableWithoutFeedback>
                                    </CardImage>
                                </CardContainerSub>
                            )
                        }
                        return(
                            <CardContainerSub> 
                                <CardImage source={{uri: image}}>
                                    <TouchableWithoutFeedback  onPress={() => {handleRemoveImageName(image)}}>
                                        <MediaActionIcon>
                                            <StyledIcon
                                                raised
                                                name='close'
                                                type='material'
                                                color='red'
                                                size={10}
                                            />
                                        </MediaActionIcon>
                                    </TouchableWithoutFeedback>
                                </CardImage>
                            </CardContainerSub>
                        )
                    })}
                </GalleryRow>
            }
            {loading? 
                <View></View>:
                <GalleryRow>
                    {secondRow.map(image => {
                        if(image === "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea"){
                            return(
                                <CardContainerSub> 
                                    <CardImage source={{uri: image}}>
                                        <TouchableWithoutFeedback onPress={() => {handleShowImagePicker()}}>
                                            <MediaActionIcon>
                                                <StyledIcon
                                                    raised
                                                    name='add'
                                                    type='material'
                                                    color='green'
                                                    size={10}
                                                />
                                            </MediaActionIcon>
                                        </TouchableWithoutFeedback>
                                    </CardImage>
                                </CardContainerSub>
                            )
                        }
                        return(
                            <CardContainerSub > 
                                <CardImage source={{uri: image}}>
                                    <TouchableWithoutFeedback  onPress={() => {handleRemoveImageName(image)}}>
                                        <MediaActionIcon>
                                            <StyledIcon
                                                raised
                                                name='close'
                                                type='material'
                                                color='red'
                                                size={10}
                                            />
                                        </MediaActionIcon>
                                    </TouchableWithoutFeedback>
                                </CardImage>
                            </CardContainerSub>
                        )
                    })}
                </GalleryRow>
            }
        </GalleryContainer>
    )
}

const mapStateToProps = (state) => {
    const { user, userImages, userAppInfo, userDatabase} = state
    return { user, userImages, userAppInfo, userDatabase}
};
  
export default connect(mapStateToProps)(ImageGallery);