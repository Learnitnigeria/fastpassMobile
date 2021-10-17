import {SafeAreaView, StyleSheet, Text, Image, View,Alert} from 'react-native';
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import React from 'react'
import logo from '../assets/img/logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState } from 'react';

function ForgetPassword({navigation}) {
    const [email, setEmail] = useState('kukwaa@gmail.com');

    const data = {email:email}
    // ==Confirm email address==//
    const confirmEmail = async ()=>{
        const url = "http://192.168.8.101:3001/auth/user/forgotpassword"
        const userEmail =  await axios.post(url,data)
        const {email} = userEmail.data;
        if(!email){
          console.log(userEmail.data)
        }else{
            console.log(userEmail.data)
        }
        
    }
    return (
        <KeyboardAvoidView>
          <SafeAreaView style={styles.container}>

          <Image style={styles.logo} source={logo}/>
              <View style={styles.logoText}>
                  <Text style={styles.fast}>Fast</Text>
                  <Text style={styles.pass}>Pass</Text>
              </View>

                    <Input
                        name="email"
                        size={30}
                        text="Enter Your Email address"
                        onChangeText={(text) => setEmail(text)}
                        defaultValue={email}
                        />

                    <View>
                        <Button
                        text="Continue"
                        bgcolor="#000066"
                        onPress={()=>confirmEmail()}
                        />
                    </View>   
          </SafeAreaView>
          </KeyboardAvoidView>
    )
}
const styles = StyleSheet.create({
    headerText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:10
    },

    container:{
        flex: 1, 
        paddingHorizontal: 20,
        backgroundColor: '#F0F6F6',
        alignItems:'center',
    },

   logo:{
    width:150,
    height:150,
    marginTop:20,

},
logoText:{
    flexDirection:'row',
    marginBottom:10
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
   
});
export default ForgetPassword

