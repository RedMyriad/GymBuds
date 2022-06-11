import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { View,TouchableWithoutFeedback, Text, TextInput, Button, ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ImagePicker from "react-native-image-picker"
import { PermissionsAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { updateUserDatabase } from "../state/actions/userDatabse";
import { updateUserAppInfo } from "../state/actions/userAppInfo";

const IntroductionContainer = styled.View`
    flex: 1;
    overflow-y: scroll;
    background: #DDDDDD;
`

const PageHeader = styled.Text`
    font-weight: 700;
`

const UserInfoForm = styled.View`
    flex:1;
    background: white;
    padding: 40px;
    align-items: center;
`

const NameBox = styled.TextInput`
    width: 100%;
    border-color: gray;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 25px;
`

const PhoneNumberBox = styled.TextInput`
    width: 100%;
    border-color: gray;
    border-width: 1px;
    border-radius: 5px;
    border-top: 0px;
    padding: 5px;
    margin-bottom: 25px;
`

const EmailBox = styled.TextInput`
    width: 100%;
    border-color: gray;
    border-width: 1px;
    border-radius: 5px;
    border-top: 0px;
    padding: 5px;
    margin-bottom: 50px;
`

const AgeBox = styled.TextInput`
    width: 100%;
    border-color: gray;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 25px;
`

const GenderSelection = styled.View`
    flex-direction: column;
    margin-bottom: 25px;
    width: 100%;
`

const GenderButton = styled.View`
    border-color: gray;
    border-width: 2px;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 10px;
    align-items: center;
    justify-content: center;
`

const SignUpButton = styled.View`
    background: red;
    border-width: 0px;
    color: white;
    border-radius: 25px;
    margin-bottom: 10px;
    padding: 15px;
    align-items: center;
    justify-content: center;
    width: 100%;
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
    width: 50%;
    height: 150px;
    shadow-color: black;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    border-radius: 10px;
    resize-mode: cover;
    margin-left: 10px;
    margin-bottom: 25px;

    border-color: gray;
    border-width: 2px;
`

const IntroductionPage = ({ route, navigation, userImages, userSchedule, userDatabase, user}) => {

    const [selectedGender, setSelectedGender] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState("https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea");

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.CAMERA);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    const onNameChange = (e)=>{
        setName(e);
    }

    const onPhoneNumberChange = (e)=>{
        setPhoneNumber(e);
    }

    const onAgeChange = (e)=>{
        setAge(e);
    }


    const onEmailChange = (e)=>{
        setEmail(e);
    }

    const handleSubmit = () =>{
        console.log(user.uid, name, phoneNumber, age),
        firestore().collection("users").doc(user.uid)
        .set({
            id: user.uid,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            age: age,
            Likes: [],
            matches:[],
            images: [image.substring(image.lastIndexOf('/') + 1)],
        }).then(()=>{
            if(image !== "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea"){
                uploadImage();
            }
        });
    }

    const handleAddImageName = (filename) =>{
        // add new like for current user
        firestore().collection("users").doc(user.uid)
        .update({
          images: firestore.FieldValue.arrayUnion(String(filename))
        }).then(()=>{
            updateUserAppInfo({
                id: user.uid,
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                age: age,
                Likes: [],
                matches:[],
                images: [filename],
            });
    
            navigation.navigate("Swipe")
        })
    };

    const handleRemoveImageName = (filename) =>{

        // match firebase image storage url to get file name
        setImage("https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea")
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

    // console.log - remove placeholders later

    return(
        <IntroductionContainer>
            <UserInfoForm>
                <NameBox
                    onChangeText={onNameChange}
                    keyboardType="default"
                    placeholder="name"
                    textAlign='center'
                />

                <AgeBox
                    onChangeText={onAgeChange}
                    keyboardType='numeric'
                    placeholder="age"
                    maxLength={3} 
                    textAlign='center'
                />

                <PhoneNumberBox
                    onChangeText={onPhoneNumberChange}
                    keyboardType="default"
                    placeholder="phone number"
                    textAlign='center'
                />

                <EmailBox
                    onChangeText={onEmailChange}
                    keyboardType="default"
                    placeholder="email"
                    textAlign='center'
                />

                <GenderSelection>
                    <TouchableWithoutFeedback onPress={() => {setSelectedGender("Male")}} >
                        <GenderButton 
                            style={{ borderColor: selectedGender === "Male" ? "red" : "grey" }}
                        >
                            <Text 
                                style={{ color: selectedGender === "Male" ? "red" : "black" }}
                            >
                                Male
                            </Text>
                        </GenderButton>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {setSelectedGender("Female")}} >
                        <GenderButton 
                            style={{ borderColor: selectedGender === "Female" ? "red" : "grey" }}
                        >
                            <Text 
                                style={{ color: selectedGender === "Female" ? "red" : "black" }}
                            >
                                Female
                            </Text>
                        </GenderButton>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {setSelectedGender("Other")}} >
                        <GenderButton 
                            style={{ borderColor: selectedGender === "Other" ? "red" : "grey" }}
                        >
                            <Text 
                                style={{ color: selectedGender === "Other" ? "red" : "black" }} 
                            >
                                Other
                            </Text>
                        </GenderButton>
                    </TouchableWithoutFeedback>
                </GenderSelection>
                {image === "https://firebasestorage.googleapis.com/v0/b/gymbudsv3.appspot.com/o/images%2FgreySquare.jpg?alt=media&token=8c2d0291-91d7-4362-9311-b573bf64edea"?
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
                    :
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
                }

                <TouchableWithoutFeedback onPress={handleSubmit} >
                        <SignUpButton>
                            <Text style={{ color: "white" }} >
                                Sign Up
                            </Text>
                        </SignUpButton>
                    </TouchableWithoutFeedback>
            </UserInfoForm>
        </IntroductionContainer>
    );

};

const styles = StyleSheet.create({
    selectedGender: {
        borderColor: 'red',
        color: 'red',
    },
});

const mapStateToProps = (state) => {
    const { user, userDatabase} = state
    return { user, userDatabase}
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserDatabase,
        updateUserAppInfo,
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);