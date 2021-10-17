import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import React,{useState,useContext} from 'react'
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import logo from '../assets/img/logo.png'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';

function Login({navigation}) {
    const {isLogin,setIslogin,setProfile,loading,setLoading} = useContext(AuthContext)
    // const [email, setEmail] = useState('sec@gmail.com');
    // const [password, setPassword] = useState('Sec@9673');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const[message,setMessage]=useState('')
    const userdata = {email,password}
    
    //===FUNCTION FOR HANDLING LOGIN
    const handlelogin = async ()=>{
      if(email=='' || password ==''){
        return setMessage('email or password cant be empty') 
    }
      setLoading(true)
      try {
        const url = "http://192.168.8.100:3001/auth/user/login"
        const userInfo =  await axios.post(url,{email,password})
        const {error,user,accessToken} = userInfo.data;
        if(!error){
          try {
            setProfile(user);
            await AsyncStorage.setItem('fastpass',accessToken)
            setLoading(false);
            setIslogin(!isLogin)
            if(user.userType =='user'){
              navigation.dispatch(StackActions.replace('TenantStack'))
            }else if(user.userType =='security'){
              navigation.dispatch(StackActions.replace('Bottom'))
            }else{
              return setMessage('invalid credentials')
            }
            
          } catch (error) {
            console.log(error.message)
             setLoading(false)
          }

        }
        else{
          setLoading(false)
          setMessage(error)
        }
        
      } catch (err) {
        console.log(err)
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
                text="Email address"
                onChangeText={(text) => setEmail(text)}
                defaultValue={email}
              />

              <Input
                name="lock"
                size={30}
                text="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                defaultValue={password}
              />
            <View>
                  <Text style={styles.message}>{message}</Text>
            </View>
         
            <Button text={loading?<ActivityIndicator
               color = '#fff'
               size = "large"
              />: 'Login'}
              bgcolor="#000066"
              onPress={() => handlelogin()} />

              <View style={{marginTop:10}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
                  <Text style={{paddingTop:10, fontSize:20, color:'#F84C4C'}}>Forgot Password?</Text>
                  </TouchableOpacity>
              </View>
    
          </SafeAreaView>
          </KeyboardAvoidView>
    )
}
export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 20,
        backgroundColor: '#F0F6F6',
        alignItems:'center'
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
   message:{
      color:'red',
      fontSize:17,
      paddingBottom:10
   }
  
  });
