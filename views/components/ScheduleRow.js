import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
 
function ScheduleRow(props){

    const handleConvertDate = (date) =>{
        let newDate = date.split(" ")[1];
        let timeSplit = newDate.split(":");
        
        let hour = parseInt(timeSplit[0]);
        let am = true;

        if(hour === 0){
            hour = 12;
        }
        else{
            if(hour >= 12){
                hour = hour - 12;
                am = false;
            }
        }

        let modifier = am? "am": "pm";

        return hour + ":00 " + modifier;
    }

    return(
        <View style={[styles.main_container, { height: props.rowSize }]}>
            <View style={styles.time_container}>
                <Text>{handleConvertDate(props.datetime)}</Text>
            </View>
            <View style={styles.grid_container}>
                <View style={[styles.separator, {borderBottomColor: 'black', borderBottomWidth:0.7}]} />
                <View style={styles.separator} />
                <View style={[styles.separator, {borderBottomColor: 'black'}]} />
                <View style={styles.separator} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row'
    },

    time_container: {
        flex: 1
    },

    time_text: {
        color: '#c2c2c2',
        textAlign: 'center'
    },

    grid_container: {
        flex: 5,
        justifyContent: 'space-around'
    },

    separator: {
        borderBottomColor: '#757575',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default ScheduleRow