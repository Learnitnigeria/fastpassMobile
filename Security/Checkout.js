import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Image, TouchableWithoutFeedback, Animated, Alert, ActivityIndicator } from 'react-native'
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import React,{useState} from 'react'
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Checkout({navigation}) {
    const [passCode, setCode] = useState('9870');
    const [loading,setLoading]=useState(false);
    const [message,setMessage]= useState('')
    // ===VERIFY VISITOR ====///
    const VerifyVisitor = async ()=>{
        setLoading(true)
        if(passCode==""){
            setMessage('Field cant be empty');
            setLoading(false)
        }
        try {
        const url = `http://192.168.8.100:3001/security/verify_checkout?passCode=${passCode}`;
        const token = await AsyncStorage.getItem('fastpass');
        const registerVdata = await axios.get(url,{ headers: {authorization: `Bearer ${token}`} })
        const {visitor} = registerVdata.data
        if(!visitor){
            setMessage('Record not found');
            setLoading(false)
            
        }
        else{
            console.log(visitor)
            navigation.navigate('PersonalVisitorProfile',{visitor:visitor})
            setMessage('');
            setLoading(false)
        }
      
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <KeyboardAvoidView>
        <SafeAreaView style={styles.container}>

        <View style={{marginTop:150}}>
        <Text style={styles.headerText}>Verify Checkout</Text>
        <Text style={styles.messageText}>{message}</Text>
                  <Input
                      size={30}
                      text="Enter Checkin Code"
                      onChangeText={(text) => setCode(text)}
                      defaultValue={passCode}
                      />
                  <View>

                  <Button
                    text={loading?<ActivityIndicator
                    color = '#fff'
                    size = "large"
                    />: 'Checkout'}
                    bgcolor="#000066"
                    onPress={() =>VerifyVisitor()}
                />
                  </View>
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
    errorText:{
        color:'red',
        fontSize: 20,
        alignSelf:'center',
        paddingBottom:10

    },
    container:{
        flex: 1, 
        paddingHorizontal: 20,
        backgroundColor: '#F0F6F6',
        alignItems:'center',
    },
    messageText:{
        color:'red',
        fontSize:16,
        alignSelf:'center',
        paddingBottom:10
    },
    modalBackground:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'
    },
    modalContainer:{
        width:'80%',
        paddingVertical:30,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        borderRadius:20,
        elevation:20
    },
    conformButton:{
        backgroundColor:'#33A854',
        width:100,
        height:60,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    }
   
});
export default Checkout
