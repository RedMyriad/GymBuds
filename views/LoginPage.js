import {
    GoogleSignin,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';

import React, { useState, useEffect } from "react";
import { StyleSheet, PixelRatio, View, Linking, ImageBackground, Text, Button } from 'react-native';


export default function LoginPage({ navigation }) {

    const [userInfo, setuserInfo] = useState(null);

    useEffect(()=>{
        if(userInfo){
            navigation.navigate("Swipe");
        }
    }, [userInfo])

    const signInAsync = async () => {
        GoogleSignin.configure({
            clientId: '647950479411-m7e8l4nis71912stg9f20go3hk2gpans.apps.googleusercontent.com',
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((user_info) => {
                    setuserInfo(user_info);
                }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
        })
    };

    const _syncUserWithStateAsync = async () =>{
        GoogleSignin.configure({
            clientId: '647950479411-m7e8l4nis71912stg9f20go3hk2gpans.apps.googleusercontent.com',
        });
        const user = await GoogleSignIn.signInSilentlyAsync();
        setuserInfo(user);
    };
    
    const onPress = () => {
        if (!userInfo) {
            signInAsync();
        }
    };

    const navigateAbout = () =>{
        navigation.navigate("About");
    }

    const size = 140;
    return(
        <View style={styles.container}>
            <ImageBackground 
                source={require('../public/imgs/yellow_brick.jpg')} 
                resizeMode="cover" 
                style={styles.image}>
                <View style={styles.logo}>
                    <ImageBackground 
                        source={require('../public/imgs/logo_transparent.png')}  
                        style={{
                            width: PixelRatio.getPixelSizeForLayoutSize(size),
                            height: PixelRatio.getPixelSizeForLayoutSize(size),
                        }}/>
                </View>
                <View style={styles.instructions}>
                    <Text style={styles.text}  onPress={()=>Linking.openURL("https://policies.google.com/technologies/partner-sites?hl=en-US")}>By tapping Sign In, you agree to Google's Terms. To learn how this data will be used visit Google's help pages.</Text>  
                </View>
                <View style={styles.signInContainer}>
                    <GoogleSigninButton
                        style={styles.google_button}
                        size={GoogleSigninButton.Size.Standard}
                        color={1}
                        onPress={onPress}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column"
    },

    image: {
        flex: 1,
        justifyContent: "center"
    },

    logo:{
        flex:2,
        top: 100,
    },

    instructions:{
        flex:1,
        flexDirection: "row",
        justifyContent: "center"
    },

    text:{
        top: 35,
        right: 12,
        fontFamily: "Roboto-Medium",
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        padding: 45,
    },

    signInContainer:{
        flex:1,
        right: 10,
    },

    google_button:{
        width: 130,
        height: 50,
        left: 130,
        top: -40,
    },
});