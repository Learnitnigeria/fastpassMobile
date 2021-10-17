import {Modal,SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback,ActivityIndicator,View,Animated,Image} from 'react-native';
import React, { useState, useEffect,useRef} from 'react'
import Button from '../Utils/Button';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/img/check.png'

//MODAL FUNCTION
const SuccessModal =({visible,children})=>{
    const [showModal, setShowModal]= useState(visible)
    const scaleValue = useRef(new Animated.Value(0)).current;

    const toggleModal=()=>{
        if(visible){
            setShowModal(true)
            Animated.spring(scaleValue,{
                toValue:1,
                duration:300,
                useNativeDriver:true
            }).start()
        
        }else{
            setShowModal(false)
        }
    }
    useEffect(() => {
        toggleModal()
    }, [visible])

    return <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer,{transform:[{scale:scaleValue}]}]}>
                {children}
            </Animated.View>
        </View>
    </Modal>
}
function Decline({route,navigation}) {
    const { visitor } = route.params;
    const passCode = visitor.passCode;
    const[messageError,setmessageError]=useState('')
    const [loading, setLoading] = useState(false);
    const [visible, setVisible]= useState(false)
    const [message,setMessage]= useState('')

    // DECLINE VISITOR FUNCTION
    const DeclineVisitor = async ()=>{
        setLoading(true)
        if(message==""){
            setmessageError('Field cant be empty');
            setLoading(false)
        }else{
        const url = "http://192.168.8.100:3001/security/decline_visitors";
        const token = await AsyncStorage.getItem('fastpass');
        const decline = await axios.post(url,{passCode,message}, { headers: {authorization: `Bearer ${token}`} });
        const {visitor} = decline.data
        if(visitor){
            console.log(visitor)
            setLoading(false)
            setVisible(true)
            setMessage('');
        }else{
            setmessageError('decline not successful try again')
        }
    }

    }

    return (
        <SafeAreaView style={{ backgroundColor:'#F0F6F6', flex:1}}>
            <SuccessModal visible={visible}>
                <View style={{alignItems:'center'}}>
                    <Image source={logo} style={{width:150, height:150,marginVertical:10}}/>
                    <Text style={{color:'#F84C4C',fontSize:23}}>Decline Successfully</Text>

                    <TouchableWithoutFeedback onPress={()=>{ setVisible(false); navigation.navigate('Home')}}>
                        <View style={styles.conformButton}>
                            <Text style={{fontSize:25, color:'#fff'}}>OK</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SuccessModal>
            <View style={{marginTop:60, paddingHorizontal:40,}}>
                <View>
                    <Text style={{paddingBottom:20, textAlign:'center', fontSize:25}}>Reason for Decline</Text>
                </View>

                <Text style={styles.messageText}>{messageError}</Text>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                <TextInput
                style={styles.input}
                multiline={true}
                underlineColorAndroid='transparent'
                placeholder="Enter your reason"
                onChangeText={(text)=>setMessage(text)}
                defaultValue={message}
                />
            </View>

            <View style={{justifyContent:'center', alignItems:'center',marginTop:20}}>

            <Button
                    text={loading?<ActivityIndicator
                    color = '#fff'
                    size = "large"
                    />: 'Proceed'}
                    bgcolor="#000066"
                    onPress={() =>DeclineVisitor()}
                /> 
            {/* <TouchableOpacity onPress={()=>DeclineVisitor()} style={styles.decline}><Text style={{fontSize:25, color:'#fff'}}>Proceed</Text></TouchableOpacity> */}
            </View>
            </View>
         
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width:350,
        borderWidth: 2,
        borderColor:'#F3F3F3',
        backgroundColor:'#fff',
        height:300,
        elevation: 2,
        textAlign:'center',
        fontSize:20,
        paddingHorizontal:20
    },

    decline:{
        backgroundColor:"#000066",
        width:300,
        height:80,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
        marginTop:20
     }
    ,modalBackground:{
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
    },
    loadingIndicator:{
        position:'absolute',
        top:350,
        left:150,
    },
    messageText:{
        color:'red',
        fontSize:20,
        alignSelf:'center',
        paddingBottom:10
    },
});

export default Decline
