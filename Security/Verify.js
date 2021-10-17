import {SafeAreaView, StyleSheet, Text, ActivityIndicator, View,Alert} from 'react-native';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import React,{useState} from 'react'
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Verify({navigation}) {
    const [passCode, setCode] = useState('');
    const [loading,setLoading]=useState(false);
    const [message,setMessage]= useState('')
    // ===VERIFY VISITOR ====///
    const VerifyVisitor = async ()=>{
        setLoading(true)
        if(passCode==""){
           setMessage('Field cant be empty');
           return setLoading(false)
        }
        try {
        const url = "http://192.168.8.100:3001/security/verify_visitor";
        const token = await AsyncStorage.getItem('fastpass');
        const registerVdata = await axios.post(url,{passCode}, { headers: {authorization: `Bearer ${token}`} })
        const {visitor} = registerVdata.data

        if(!visitor){
            setMessage('No Record Found');
            setLoading(false)
        }else{
            navigation.navigate('Dashboard',{visitor:visitor})
            setMessage('');
            setLoading(false)
        }
        // const {status} = visitor
        // if(!visitor){
        //     setMessage('no record found');
        //     setLoading(false)
        // }else if(status === "checkedOut"){
        //     console.log(status)
        //     setMessage('you have been checked out');
        //     setLoading(false)
        // }else if(status === "pending" || status === "active"){
        //     console.log(status)
        //     navigation.navigate('Dashboard',{visitor:visitor})
        //     setMessage('');
        //     setLoading(false)
            
        // }
        // else{
        //     setMessage('invalid pass code');
        // }
      
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

        
    }

    return (
        <KeyboardAvoidView>
        <SafeAreaView style={styles.container}>

        <View style={{marginTop:150}}>
        <Text style={styles.headerText}>Verify Visitor</Text>
        <Text style={styles.messageText}>{message}</Text>
                  <Input
                      size={30}
                      text="Enter Verification Code"
                      onChangeText={(text) => setCode(text)}
                      defaultValue={passCode}
                      />
                  <View>

                  <Button
                    text={loading?<ActivityIndicator
                    color = '#fff'
                    size = "large"
                    />: 'Verify'}
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
        fontSize: 25,
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
        fontSize:20,
        alignSelf:'center',
        paddingBottom:10
    },
   
});
export default Verify
