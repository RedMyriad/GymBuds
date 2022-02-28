import React, { useState, useEffect } from "react";
import { StyleSheet, PixelRatio, View, ImageBackground, Text, Button } from 'react-native';

export default function AboutPage({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>About Page</Text>
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