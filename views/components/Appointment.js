import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'


function Appointment(props){
    const data = props.data;
    
    const alertToDelete = () => {
        props.onDelete(data);
    }

    let startMoment = new Date("2021/02/" + data.DayIndex + " " + data.StartTime);
    let endMoment = new Date("2021/02/" + data.DayIndex + " " + data.EndTime);

    let startHours = parseInt(data.StartTime.split(":")[0]);
    let startMin = parseInt(data.StartTime.split(":")[1]);

    const top = (((startHours * 60) + startMin) - (0 - (0 / 60))) / 30

    let endHours = parseInt(data.EndTime.split(":")[0]);
    let endMin = parseInt(data.EndTime.split(":")[1]);

    endMoment = (endHours *60) + endMin;
    startMoment = (startHours *60) + startMin;

    let hoursSlots = (endMoment-startMoment) / (60*60)

    if(hoursSlots % 1 != 0){
        hoursSlots += 1;
    }

    const textColor = 'black'

    return(
        <TouchableOpacity 
            key={props.Key}
            style={[
                styles.appointment_container, 
                {
                    height: hoursSlots * props.rowSize,
                    top: (top * props.rowSize) + 5
                }
            ]}
            onPress={alertToDelete}
        >
            <View style={ {flex: 1 }} />
            <View style={ [styles.appointment_style ,{ backgroundColor: props.data.Color }]}>
                <Text style={[styles.title_text, {color: textColor}]}>
                    {props.data.Title}
                </Text>
                <Text style={[styles.subtitle_text, {color: textColor}]}>
                    {props.data.Subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appointment_container: {
        position: 'absolute',
        flexDirection: 'row',
        height: '100%',
        width: '100%'
    },

    appointment_style: {
        flex: 5,
        justifyContent: 'center',
        borderTopWidth: 1,
    },

    title_text: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },

    subtitle_text: {
        textAlign: 'center',
        fontSize: 14,
    }
})

export default Appointment