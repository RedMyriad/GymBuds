import React, { useState, useMemo, useRef, useCallback, useEffect }from 'react'
import { View, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Header(props){

    const {onChangeDay, days} = props;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);

    const backColor = 'white'
    const textColor =  'black'
    return(
        <View >
            <DropDownPicker
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                style={{zIndex:2, backgroundColor: backColor}}
                dropDownStyle={{backgroundColor: backColor}}
                items={days}
                defaultValue={1}
                containerStyle={{height: 50}}
                itemStyle={{
                    justifyContent: 'center'
                }}
                labelStyle={{textAlign: 'center', color:textColor}}
                onChangeItem={onChangeDay}
            />
        </View>
    )
}