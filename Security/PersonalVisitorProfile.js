import {SafeAreaView, StyleSheet, Text,Dimensions, View,Animated,Modal,Image,TouchableWithoutFeedback} from 'react-native'
// import {MaterialCommunityIcons} from '@expo/vector-icons'
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import Input from '../Utils/Input';
import DetailCard from '../Utils/DetailCard';
import Button from '../Utils/Button';
const { width, height } = Dimensions.get("window");
import React, { useState, useEffect,useRef} from 'react'
import logo from '../assets/img/check.png'
import { ScrollView } from 'react-native-gesture-handler';

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

const PersonalVisitorProfile = ({navigation,route}) => {
    let tempDate = new Date();
    let fDate = tempDate.getFullYear()  + '-' + ((tempDate.getMonth()+1)<= 9 ? '0' + (tempDate.getMonth()+1):(tempDate.getMonth()+1)) + '-' + (tempDate.getDate()<= 9 ? '0' + tempDate.getDate() : tempDate.getDate())
    let input = false
    const { visitor } = route.params;
    const [showInput, setShowInput]= useState(input)
    const [visible, setVisible]= useState(false)
    return (
        <KeyboardAvoidView>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom:10}}
        >
          
        <SafeAreaView style={styles.container}>
        <SuccessModal visible={visible}>
                <View style={{alignItems:'center'}}>
                    <Image source={logo} style={{width:150, height:150,marginVertical:10}}/>
                    <Text style={{color:'#F84C4C',fontSize:13,fontWeight:'900'}}>Password Changed Successfully</Text>

                    <TouchableWithoutFeedback onPress={()=> {setVisible(false),navigation.navigate('Login')}}>
                        <View style={styles.conformButton}>
                            <Text style={{fontSize:25, color:'#fff'}}>OK</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SuccessModal>

        <View style={{alignItems:'center'}}>
        <View style={styles.headerProfile}>
            <View style={styles.profilePicx}>
                <Text style={styles.subname}>MA</Text>
            </View>
            <View style={{alignItems:'center', marginTop:10}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{visitor.visitorName}</Text>
                <Text style={{fontSize:18, color:'#DD4747'}}>Visitor</Text>
            </View>
        </View>
        </View>

        <View style={styles.subheader}>
            <Text style={{fontSize:17,fontWeight:'700'}}>Basic Info</Text>
            <Text style={{fontSize:17,color:'#4F4747'}}>{fDate}</Text>
        </View>


        <DetailCard
        header="House Number"
        Vdata="Unit 5 No 10"
        />

        <DetailCard
        header="Phone Number"
        Vdata={visitor.phone}
        />

        <DetailCard
        header="Gender"
        Vdata={visitor.gender}
        />

        <DetailCard
        header="Status"
        Vdata={visitor.status}
        />

        <DetailCard
        header="Message"
        Vdata={visitor.declineMessage}
        />
       
        <View style={{marginTop:20, justifyContent:'space-between'}}>
            
        {visitor.status=='active'?<Button text="Call" bgcolor="#75B286"/>:null}
        
        </View>
    </SafeAreaView>
    <Text></Text>
    </ScrollView>  
    </KeyboardAvoidView> 
    )
}
export default PersonalVisitorProfile

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 20,
        backgroundColor: '#F0F6F6',
    },
    headerProfile:{
        backgroundColor: '#FDFAFA',
        marginTop:50,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        padding:10,
    },
    profilePicx:{
        backgroundColor:'#000066',
        width: 70,
        height: 70,
        borderRadius: 70/2,
        alignItems:'center',
        justifyContent:'center',
        elevation: 2,
        marginTop:5
    },
    subname:{
        fontSize: 30,
        position:'absolute',
        color:'#fff'
    },
    subheader:{
        flexDirection:'row',
        marginTop:10,
        width:width* 0.9,
        justifyContent:'space-between'
    },
    
    changePassword:{
        backgroundColor:"#ffcc00",
        borderRadius:15,
        width:320,
       height:50,
       alignItems:'center',
       justifyContent:'center'
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#fff',
        padding: 10,
        width:300,
        height:60,
        borderRadius:10,
        marginBottom:15,
        elevation: 2
    },
    input:{
        fontSize:20,
        paddingRight:110,
        paddingLeft:20
    },
    icon:{
        color:'#CDCDCD'
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
})

