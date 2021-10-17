import React from 'react'
import { View, ActivityIndicator,StyleSheet} from 'react-native'

const Button = (color) => {
 
    return (
       <View>
           <ActivityIndicator
            color = '#3936AC'
            size = "large"
            style = {styles.activityIndicator}/>
       </View>
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:200
     }
});

export default Button
