import React from 'react';
import { View,TouchableWithoutFeedback, Text, TextInput, Button} from 'react-native';
import styled from 'styled-components';

const ScheduleContainer = styled.View`
    margin-top: 10px;
    flex: 1;
    color: black;
    flex-direction: column;
    padding: 10px;
`

const DayHeader = styled.Text`
    font-weight: 500;
`

const TimeBlock = styled.Text`
    font-weight: 300;
    margin-left: 10px;
`

const DayContainer = styled.View`
    width: 100%;
`


export default function CurrentSchedule({ data }){

    const getFormattedTime =  (fourDigitTime) => {
        var hours24 = parseInt(fourDigitTime.substring(0,2));
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = fourDigitTime.substring(2);
    
        return hours + ':' + minutes + amPm;
    };

    data.forEach(day=>{
        day.forEach((scheduleBlock,index)=>{
            getFormattedTime(scheduleBlock.start.replace(":", ""))
            getFormattedTime(scheduleBlock.end.replace(":", ""))
            day[index] = {start: getFormattedTime(scheduleBlock.start.replace(":", "")), end: getFormattedTime(scheduleBlock.end.replace(":", ""))}
        })
    })

    const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    /*

    {console.log(data[index])}
                    {data[index].map(timeblock=>{
                        {timeblock.start} {timeblock.end}
                    })}
    */

    return(
        <ScheduleContainer>
            {days.map((item, index)=>{
                return (
                    <DayContainer>
                        <DayHeader>{item}</DayHeader>
                        {data[index].length > 0?
                            data[index].map(timeblock=>{
                                return(
                                    <TimeBlock>{timeblock.start} to {timeblock.end}</TimeBlock>
                                )
                            }):

                            <TimeBlock>No Workouts Scheduled</TimeBlock>
                        }
                    </DayContainer>
                );
            })}
        </ScheduleContainer>
    );
}