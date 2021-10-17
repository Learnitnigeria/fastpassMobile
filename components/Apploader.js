import React from 'react'
import {View,StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native'

const Apploader =()=>{
    return(
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../assets/img/key.json')} loop autoPlay>

            </LottieView>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex:1
    }
})

export default Apploader