import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Dimensions} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons'
import React from 'react'
const { width, height } = Dimensions.get("window");
import logo from '../assets/img/logo.png'

// import BottomTab from '../components/BottomTab';

function Home({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}/>
          <View style={styles.logoText}>
              <Text style={styles.fast}>Fast</Text>
              <Text style={styles.pass}>Pass</Text>
          </View>

          
          <TouchableOpacity onPress={() => navigation.navigate('Verify')}>
                <View style={styles.verify}>

                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
                    <MaterialCommunityIcons name="checkbox-marked" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    
                    <Text style={{paddingLeft:20}}>Verify Visitor</Text>
                </View>
                <MaterialCommunityIcons/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('checkout')}>
                <View style={styles.verify}>

                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>   
                    <MaterialCommunityIcons name="account" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    
                    <Text style={{paddingLeft:20}}>Verify Checkout</Text>
                </View>
                <MaterialCommunityIcons/>
            </TouchableOpacity>
        
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#F0F6F6',
        alignItems:'center'
    } ,
   logo:{
       width:200,
       height:300,
       marginTop: -30,
   },
   logoText:{
       flexDirection:'row',
       marginBottom:20,
       marginTop:-30
   },
   fast:{
       color: 'red',
       fontSize:40,
       fontWeight:'700'
   },
   pass:{
    color: '#000066',
    fontSize:40,
    fontWeight:'700'
   },

   verify:{
       backgroundColor:'#fff',
       width:width* 0.9,
       height:87,
       borderRadius:30,
       justifyContent:'center',
   },
  });

export default Home
