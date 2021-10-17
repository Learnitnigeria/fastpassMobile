import React from 'react'
import { View, Text,TouchableWithoutFeedback,StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const CopyAndShare = ({bgcolor,text,name}) => {
    return (
        <TouchableWithoutFeedback  style={[styles.Btn,{backgroundColor:bgcolor}]}>
            <MaterialCommunityIcons name={name} size={30}/>
            <Text>{text}</Text>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    Btn:{
        width:150,
        height:30,
        fontSize: 15,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
});

export default CopyAndShare
