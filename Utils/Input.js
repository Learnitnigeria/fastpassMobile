import React from 'react'
import { View, TextInput,StyleSheet,Dimensions,Text } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
const { width, height } = Dimensions.get("window");

const Input = ({size,name,text,defaultValue,onChangeText, error, ...otherProps}) => {
    return (
        <View style={styles.searchSection}>
        <MaterialCommunityIcons style={styles.searchIcon} name={name} size={size} color="#CECECE"/>
        <TextInput
            style={styles.input}
            placeholder={text}
            underlineColorAndroid="transparent"
            {...otherProps}
            onChangeText={onChangeText}
            defaultValue={defaultValue}
        />
        {error? <Text style={styles.errorMessage}>{error}</Text>:null}
        </View>
        
    )
}

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom:10,
        borderRadius:20,
        width:width* 0.9,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 0,
        fontSize:20,
        color: '#424242',
       
    },
    errorMessage:{
        color:'red',
        fontSize:18,
        position:'absolute',
        paddingTop:95
    }

});

export default Input
