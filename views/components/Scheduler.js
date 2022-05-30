import React, { useState, useMemo, useRef, useCallback, useEffect }from 'react'
import { View, ScrollView } from 'react-native';
import Header from './Header';
import styled from 'styled-components';
import ScheduleRow from './ScheduleRow';
import Appointment from './Appointment';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserSchedule } from "../../state/actions/userSchedule";

const days = [
    {
        label: 'Monday',
        value: 1
    },
    {
        label: 'Tuesday',
        value: 2
    },
    {
        label: 'Wednesday',
        value: 3
    },
    {
        label: 'Thursday',
        value: 4
    },
    {
        label: 'Friday',
        value: 5
    },
    {
        label: 'Saturday',
        value: 6
    },
    {
        label: 'Sunday',
        value: 7
    },
];

const Timeblocks = styled.ScrollView`
    margin-top: 10px;
`

const ScheduleButton = styled.Button`

`

const ScheduleContainer = styled.View`
    margin-top: 10px;
`


function Schedule({ navigation, numberOfRows, rowSize, minHour, minMinute, canRemove, updateUserSchedule }){

    const [dayNumber, setDayNumber] = useState(1);
    const [appointments, setAppointments] = useState([]);
    const [displayedAppointments, setDisplayedAppointments] = useState([]);
    const [timeRows, setTimeRows] = useState([]);

    const backColor = 'white';
    const firstHour = new Date(2021, 2, 1 , minHour, minMinute, 0, 0);

    useEffect(()=>{
        setTimeRows(createTimesRows(firstHour));
    }, [])

    useEffect(()=>{
        let visibleAppointments = [];
        appointments.forEach((value, index)=>{
            if(value.DayIndex === dayNumber){
                visibleAppointments.push(value)
            }
        })
        setDisplayedAppointments(visibleAppointments);
    }, [dayNumber, appointments]);

    const formatDateYYYYMMDD = (date) => {
        let yourDate = new Date()
        yourDate.toISOString().split('T')[0]
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))

        let newDate = new Date(date)
        let dateText = newDate.toTimeString(); 
        dateText = dateText.split(' ')[0];

        return yourDate.toISOString().split('T')[0] + " " + dateText;
    }

    const createTimesRows = (firstHour) => {
        var datetime = new Date(firstHour);
        var times = [];
        var lines = numberOfRows;
        
        for(var i = 0; i < lines; i++){
            times.push(formatDateYYYYMMDD(datetime));
            if(datetime.getMinutes() === 30){
                datetime.setMinutes(0);
                datetime.setHours(datetime.getHours() + 1);
                continue;
            }
            datetime.setMinutes(datetime.getMinutes() + 30);
        }
        return times;
    }

    const onChangeDay = (item) => {
        if(item === dayNumber){
            return;
        }
        setDayNumber(item);
    }

    const makeid = ()=>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 20; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    const onTimeSelect = (time) =>{
        // hh:mm am/pm
        let splitTime = time.split(":");

        let hour = parseInt(splitTime[0]);
        let min = parseInt(splitTime[1].split(" ")[0]);
        let period = splitTime[1].split(" ")[1];
        if(hour == 12 && period == "am"){
            hour = 0;
        }
        else{
            if( hour !== 12 && period == "pm"){
                hour += 12;
            }
        }

        let newStartTime = String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0');
        let newEndTime = min === 30? String((hour+1)).padStart(2, '0') + ":00": String(hour).padStart(2, '0') + ":30";
        let newAppointment = {
            Title: '',
            Subtitle: '',
            DayIndex: dayNumber, 
            StartTime: newStartTime,
            EndTime: newEndTime,
            Color: "#56b7fc",
            Key: makeid(),
        };

        let localApointments = appointments.slice();
        localApointments.push(newAppointment);
        setAppointments(localApointments)
    }


    const handleDeleteTimeBlock = (dataBlock) =>{

        let localApointments = appointments.filter(function(item) {
            return item.Key !== dataBlock.Key
        });

        setAppointments(localApointments)
    }

    const handleAcceptSchedule = () =>{
        updateUserSchedule(appointments);
        navigation.navigate("EditProfile");
    }
        
    return(
        <View style={{flex:1, width: '100%', backgroundColor: backColor, padding: 10}}>
            <Header days={days} changeDay={(item) => onChangeDay(item)} />
            {appointments.length > 0? 
                <ScheduleContainer>
                    <ScheduleButton 
                        title="Accept"
                        onPress={() => handleAcceptSchedule()}
                    >
                    </ScheduleButton>
                </ScheduleContainer>:
                null
            }
            <Timeblocks>
                {timeRows.map((item, index)=>
                        <ScheduleRow 
                            key={index} 
                            datetime={item} 
                            rowSize={rowSize}
                            onTimeSelect={(time)=>onTimeSelect(time)}
                        />
                )}
                {displayedAppointments.map((item, index)=>
                        <Appointment 
                            key={item.Key} 
                            canRemove={canRemove}
                            rowSize={rowSize} 
                            firstHour={firstHour} 
                            data={item} 
                            onDelete={(data)=>handleDeleteTimeBlock(data)}    
                        />
                )} 
            </Timeblocks>
        </View>
    );
}

const mapStateToProps = (state) => {
    const { user, cards, userAppInfo} = state
    return { user, cards, userAppInfo }
  };

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserSchedule,
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

Schedule.propTypes = {
  data: PropTypes.array,
  numberOfRows: PropTypes.number,
  darkMode: PropTypes.bool,
  rowSize: PropTypes.number,
  minHour: function(props, propName, componentName){
    if(props[propName] > 23 || props[propName] < 0){
        return new Error('Invalid value for ' + propName + ' prop for' + componentName + ' component. The value must be between 0 and 23.' );
    }
  },
  minMinute: function(props, propName, componentName){
    if(props[propName] > 59 || props[propName] < 0){
        return new Error('Invalid value for ' + propName + ' prop for ' + componentName + ' component. The value must be between 0 and 59.' );
    }
  },
  canRemove: PropTypes.bool,

  onSelectedDayChanged: PropTypes.func,
  onAppointmentRemoved: PropTypes.func
}

Schedule.defaultProps = {
    data: [],
    canRemove: true,
    numberOfRows: 13,
    rowSize: 100,
    minHour: 8,
    minMinute: 30
}