import React, { useState, useMemo, useRef, useCallback, useEffect }from 'react'
import { View, ScrollView } from 'react-native';
import Header from './Header';
import ScheduleRow from './ScheduleRow';
import Appointment from './Appointment';
import PropTypes from 'prop-types';
import * as en from './Language/en';
import * as fr from './Language/fr';

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

export default function Schedule(props){
    
    const {data, numberOfRows, rowSize, minHour, minMinute, onAppointmentRemoved, canRemove} = props;

    let [dayNumber, setDayNumber] = useState(1);

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
            datetime.setHours(datetime.getHours() + 1);
        }

        return times;
    }

    const onChangeDay = (item) => {
        setDayNumber(item.value);
    }

    const getDayAppointments = () => {
        const localData = data != null ? data : [];
        const selectedDay = dayNumber;

        return localData.filter((item, index)=>{
            return item.DayIndex == selectedDay;
        })
    }

    
    const backColor = 'white';

    const firstHour = new Date(2021, 2, 1 , minHour, minMinute, 0, 0);
        
    return(
        <View style={{flex:1, width: '100%', backgroundColor: backColor}}>
            <Header days={days} onChangeDay={onChangeDay} />
            <ScrollView>
                {createTimesRows(firstHour).map((item, index)=>
                        <ScheduleRow 
                            key={index} 
                            datetime={item} 
                            rowSize={rowSize}
                        />
                )}
                {getDayAppointments().map((item, index)=>
                        <Appointment 
                            key={-index} 
                            canRemove={canRemove}
                            rowSize={rowSize} 
                            firstHour={firstHour} 
                            data={item} 
                            onDelete={app=>{if(onAppointmentRemoved != null) onAppointmentRemoved(app)}}    
                        />
                )} 
            </ScrollView>
        </View>
    );
}

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