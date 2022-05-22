import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

function alertToDelete(props){
    if(!props.canRemove){
        return;
    }
    
    Alert.alert(
        props.data.Title,
        props.langRsc.deleteConfirm,
        [
          {
                text: props.langRsc.no,
                style: "cancel",
          },
          { 
                text: props.langRsc.yes, 
                onPress: () => {
                    if(props.onDelete){
                        props.onDelete(props.data);
                    }
                } 
          }
        ],
        { cancelable: false }
      );
}

function Appointment(props){
    const data = props.data;
    const startMoment = new Date("2021/02/" + data.DayIndex + " " + data.StartTime);
    const endMoment = new Date("2021/02/" + data.DayIndex + " " + data.EndTime);
    const top = startMoment.hour() + startMoment.minute()/60 - props.firstHour.getHours() - props.firstHour.getMinutes()/60
    const hoursSlots = endMoment.diff(startMoment) / (1000*60*60)
    const textColor = props.darkMode ? 'white' : 'black'

    return(
        <TouchableOpacity 
            style={[
                styles.appointment_container, 
                {
                    height: hoursSlots * props.rowSize,
                    top: top * props.rowSize
                }
            ]}
            onPress={()=>alertToDelete(props)}
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
        borderRadius: 10,
        justifyContent: 'center',
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