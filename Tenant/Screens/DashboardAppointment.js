import React, { useState, useEffect,useRef,useContext} from 'react'
import {Text, View,StyleSheet, Dimensions,TouchableOpacity,Modal,Animated,TouchableWithoutFeedback,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get("window");

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
function DashboardAppointment({user,navigation}) {
    const {totalVisitors, setTotalVisitors} = useContext(AuthContext)
    const [visible, setVisible]= useState(false)
    const [visitorId,setVisitorId] = useState(user._id)
    const [message,setMessage] = useState('')

    // FUNCTION FOR CHECKING OUT VISITOR
    const CheckOutVisitor = async ()=>{
        try {
        const url = "http://192.168.8.100:3001/tenant/checkout_visitor";
        const token = await AsyncStorage.getItem('fastpass');
        const checkOutDetails = await axios.post(url,{visitorId,message}, { headers: {authorization: `Bearer ${token}`} })
        const {visitor} = checkOutDetails.data
        if(visitor){
            console.log(visitor)
            setTotalVisitors(totalVisitors)
        }else{
            return Alert.alert('Sorry checkout not successful');
        }
     
        } catch (error) {
            console.log(error)
        }
    }

    const renewCode= async ()=>{
        const data = {visitorId:visitorId}
        try {
            const url = `http://192.168.8.100:3001/tenant/enable_visitor`;
            const token = await AsyncStorage.getItem('fastpass');
            // console.log(token)
            const enablePassCode = await axios.put(url,data,{ headers: {authorization: `Bearer ${token}`} })
            const {visitor} = enablePassCode.data
            if(visitor){
                Alert.alert('code enabled successful');
                console.log(visitor)
            }else{
                Alert.alert('Sorry cant update code try again');
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

        <SuccessModal visible={visible}>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                            placeholder="Checkout Message"
                            numberOfLines={10}
                            multiline={true}
                            maxHeight={100}
                            style={styles.messageBody}
                            onChangeText={(text) => setMessage(text)}
                            defaultValue={message}
                            />

                        {/* <TouchableWithoutFeedback onPress={()=>{setVisible(false);CheckOutVisitor()} }> */}
                         <View style={{flexDirection:'row'}}>  

                         <TouchableOpacity onPress={()=>{setVisible(false);CheckOutVisitor()} }>
                        <View style={[styles.conformButton, {marginRight:35}]}>
                            <Text style={{fontSize:25, color:'#fff'}}>Submit</Text>
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setVisible(false)} }>
                        <View style={[styles.conformButton, {backgroundColor:"#eed202"}]}>
                            <Text style={{fontSize:25, color:'#fff'}}>Cancel</Text>
                        </View>
                        </TouchableOpacity>
                        </View>
                    {/* </TouchableWithoutFeedback> */}
                        </View>
        </SuccessModal>
                <View style={[styles.bottomView,{backgroundColor:user.status=='active'?'#62C78A':'#CAA852'}]}>
                    <View style={styles.topView}>

                        <View style={[styles.checkedouttop,{backgroundColor:user.status=='active'?'#62C78A':'#CAA852'}]}>
                            <Text style={styles.checkouttext}>{user.status}</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:10,marginLeft:10}}>
                            <View style={styles.header}>
                                <Text style={{color:"#fff"}}>{user.visitorName.charAt(0)}</Text>
                            </View>

                            <View style={{marginLeft:10,alignItems:'center'}}>
                                <Text style={{fontSize:15,fontWeight:'700'}}>{user.visitorName}</Text>
                                <Text style={{color:'#DD4747',fontWeight:'700'}}>Visitor</Text>
                            </View>
                        </View>

                        {/* user details */}
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                            <View>
                                <Text style={{paddingBottom:5}}>{user.phone}</Text>
                                <Text>Unit 5 of 10</Text>
                                <Text>{user.visitType}</Text>
                            </View>
                            <View style={{borderLeftWidth:2, borderColor:'#BAB4B4'}}></View>

                            <View>
                                <Text style={{paddingBottom:5}}>{user.gender}</Text>
                                <Text>{user.passCode}</Text>
                            </View>
                        </View>
                    

                {
                    user.status=='active'? 
                    <View style={{width:'50%',justifyContent:'center',alignItems:'center',marginTop:10, marginLeft:50}}>
                        <TouchableOpacity onPress={() => setVisible(true)} style={{backgroundColor:'#62C78A',marginLeft:20,borderRadius:10}}><Text style={{color:'#fff',padding: 10,}}>checke Out</Text></TouchableOpacity>
                    </View>
                  :
                   user.visitType=='continous' && user.status==='checkedOut'? 
                  <View style={{width:'50%',justifyContent:'center',alignItems:'center',marginTop:10, marginLeft:50}}>
                      <TouchableOpacity onPress={() => renewCode()} style={{backgroundColor:'#36466F',marginLeft:20,borderRadius:10}}><Text style={{color:'#fff',padding: 10,}}>Renew</Text></TouchableOpacity>
                  </View> : 
                    null 
                }
                    </View>
                </View>
        </View>
    )
}

export default DashboardAppointment

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 15,
        backgroundColor: '#F0F6F6',
        marginBottom:10,
        marginTop:10,
    },
    
    bottomView:{
        height:200,
        width:width * 0.9,
        borderRadius:7,
    },
    topView:{
        backgroundColor:'#FDFAFA',
        height:200,
        width:width *0.9,
        marginLeft:6,
        borderRadius:7
    },
    checkedouttop:{
        position:'absolute',
        // left:205,
        right:0,
        borderTopRightRadius: 7,
        borderBottomLeftRadius:7,
    },
    header:{
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor:'#000066',
        justifyContent:'center',
        alignItems:'center'
    },
    checkouttext:{
        fontSize:12,
        padding:4,
        color:'#fff'
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
        height:50,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,

    },
    messageBody:{
        fontSize:20,
        borderRadius:10,
        borderColor:'#36466F',
        borderWidth:3,
        padding: 10,
    }

});
