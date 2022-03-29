
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import React, { useState, useEffect,use } from "react";
import { StyleSheet, PixelRatio, View, Linking, ImageBackground, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from "../state/actions/user"

function LoginPage(props) {
    const { navigation } = props
    const [userInfo, setuserInfo] = useState(null);

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    useEffect(()=>{
        if(user){
            props.updateUser(user);
            navigation.navigate("Swipe");
        }
    }, [user]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

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
                        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
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


const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUser,
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);