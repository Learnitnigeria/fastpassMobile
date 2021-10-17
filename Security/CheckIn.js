import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import {MaterialCommunityIcons} from '@expo/vector-icons'
import React from 'react'

const CheckIn = () => {
    return (
        <SafeAreaView style={{marginTop:70, paddingHorizontal:30}}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <MaterialCommunityIcons name="check-circle" size={300} style={styles.Checkicon}/>
                <Text style={styles.successMessage}>Check in Successful</Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Checkicon:{
        color:'#26CC7C'
    },
    successMessage:{
        fontSize:30,
        color:'#F84C4C'
    }
});

export default CheckIn
