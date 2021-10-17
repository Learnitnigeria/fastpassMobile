import React from 'react'
import { TouchableOpacity, Text,StyleSheet,Dimensions,submitting } from 'react-native'
const { width, height } = Dimensions.get("window");
const Button = ({text,bgcolor,onPress,margin}) => {
    backgroundColor = submitting? 'rgba(27,27,51,0.4)':'#000066'
    return (
        <TouchableOpacity
        style={[styles.Btn,{backgroundColor,marginBottom:margin}]}
        onPress={submitting? null: onPress}>
        <Text style={styles.BtnText}>{text}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Btn:{
        backgroundColor:"#000066",
        width:width* 0.9,
        height:60,
        padding:15,
        borderRadius:30,
        alignItems:'center',
        elevation: 1
    },
    BtnText:{
        fontSize:20,
        color:"#fff"
    },
});

export default Button
