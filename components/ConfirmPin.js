import {SafeAreaView, StyleSheet, Text, Image, View} from 'react-native';
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import React from 'react'
import logo from '../assets/img/logo.png'

function ForgetPassword({navigation}) {
    return (
        <KeyboardAvoidView>
          <SafeAreaView style={styles.container}>

          <Image style={styles.logo} source={logo}/>
              <View style={styles.logoText}>
                  <Text style={styles.fast}>Fast</Text>
                  <Text style={styles.pass}>Pass</Text>
              </View>

                    <Input
                        size={30}
                        text="Verification Code"
                        />

                    <View>
                        <Button
                        text="Continue"
                        bgcolor="#000066"
                        onPress={()=>navigation.navigate('NewPassword')}
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
    width:200,
    height:200,
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

