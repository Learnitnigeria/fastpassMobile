import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Image, TouchableWithoutFeedback, Animated, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect,useRef} from 'react'
import logo from '../assets/img/check.png'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Dashboard = ({ route, navigation }) => {
    const [visible, setVisible]= useState(false)
    const [loading, setLoading] = useState(false);
    const { visitor } = route.params;
    const passCode = visitor.passCode;
    let tempDate = new Date();

    let fDate = tempDate.getFullYear()  + '-' + ((tempDate.getMonth()+1)<= 9 ? '0' + (tempDate.getMonth()+1):(tempDate.getMonth()+1)) + '-' + (tempDate.getDate()<= 9 ? '0' + tempDate.getDate() : tempDate.getDate()) 

    // ====CHECKIN VISITOR====//
    const checkinVisitor = async ()=>{
        setLoading(true);
        const url = "http://192.168.8.100:3001/security/checkin_visitor";
        const token = await AsyncStorage.getItem('fastpass');
        const checkIn = await axios.post(url,{passCode}, { headers: {authorization: `Bearer ${token}`} });
        const {visitor} = checkIn.data
        if(visitor){
            console.log(visitor)
            setLoading(false);
            setVisible(true)
        }else{
            Alert.alert('cant be in updated')
        }

    }
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom:50}}
        >
        <SafeAreaView style={styles.container}>
           
            <SuccessModal visible={visible}>
                <View style={{alignItems:'center'}}>
                    <Image source={logo} style={{width:150, height:150,marginVertical:10}}/>
                    <Text style={{color:'#F84C4C',fontSize:22}}>Checkin Successful</Text>

                    <TouchableWithoutFeedback onPress={()=>{ setVisible(false); navigation.navigate('Home')}}>
                        <View style={styles.conformButton}>
                            <Text style={{fontSize:25, color:'#fff'}}>OK</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SuccessModal>

           
            <View style={{alignItems:'center'}}>
            <View style={styles.headerProfile}>
                <View style={styles.profilePicx}>
                    <Text style={styles.subname}>HP</Text>
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

            <View style={styles.info}>
                <Text style={styles.title}>House Number</Text>
                <Text style={styles.data}>Unit 5 No 10</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.data}>{visitor.phone}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Unique Code</Text>
                <Text style={styles.data}>{passCode}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>Gender</Text>
                <Text style={styles.data}>{visitor.gender}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>status</Text>
                <Text style={styles.data}>{visitor.status}</Text>
            </View>

            {
            visitor.status=='active'?
             null:
             <View style={{marginTop:20, marginBottom:40, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>checkinVisitor()}  style={styles.checkIn}><Text style={{fontSize:25, color:'#fff',padding: 10}}>Check In</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Decline',{visitor:visitor}) } style={styles.decline}><Text style={{fontSize:25, color:'#fff',padding: 10}}>Decline</Text></TouchableOpacity>
            </View>
             }
             {
                 loading?<View style={styles.loadingIndicator}>
                 <ActivityIndicator size="large" color="#36466F"/>
              </View>: null
             }
           
        </SafeAreaView>
        </ScrollView>
    )
}

export default Dashboard
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 20,
        padding:10,
        backgroundColor: '#F0F6F6',
    },
    headerProfile:{
        backgroundColor: '#FDFAFA',
        marginTop:50,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        padding:10
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
        justifyContent:'space-between'
    },
    info:{
        marginTop:10,
        backgroundColor:'#FDFAFA',
        borderRadius:10,
        padding:5
    },
    title:{
        borderBottomWidth:2,
        borderColor:"#E3E3E3",
        fontSize:16,
        color:'#CDCDCD'
    },
    data:{
        fontSize:16
    },
    checkIn:{
       backgroundColor:"#000066",
       
       height:50,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:15,
    },
    decline:{
        backgroundColor:"#DD4747",
        borderRadius:15,
      
       height:50,
       alignItems:'center',
       justifyContent:'center'
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
    },
    loadingIndicator:{
        position:'absolute',
        top:350,
        left:150,
    }
    
})
