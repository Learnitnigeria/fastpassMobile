import React, { useState, useEffect,useRef,useContext} from 'react'
import {Text, View,StyleSheet, Dimensions,TouchableOpacity,Modal,Animated,TouchableWithoutFeedback,TextInput} from 'react-native';
const { width, height } = Dimensions.get("window");
import { AuthContext } from '../../Context/AuthContext';

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

const TotalVisitor = ({user}) => {
    const [visible, setVisible]= useState(false)
   
    return (
        <View style={styles.container}>

<SuccessModal visible={visible}>
                        <View style={{alignItems:'center'}}>
                            <TextInput
                            placeholder="Checkout Message"
                            numberOfLines={10}
                            multiline={true}
                            maxHeight={60}
                            style={{fontSize:20}}
                            />
                        <TouchableWithoutFeedback onPress={()=> setVisible(false)}>
                        <View style={styles.conformButton}>
                            <Text style={{fontSize:25, color:'#fff'}}>Submit</Text>
                        </View>
                    </TouchableWithoutFeedback>
                        </View>
        </SuccessModal>
                <View style={[styles.bottomView,{backgroundColor:user.status=='pending'?'#62C78A':'#CAA852'}]}>
                    <View style={styles.topView}>

                        <View style={[styles.checkedouttop,{backgroundColor:user.status=='pending'?'#62C78A':'#CAA852'}]}>
                            <Text style={styles.checkouttext}>{user.status}</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:10,marginLeft:10}}>
                            <View style={styles.header}>
                                <Text style={{color:"#fff"}}>{`${user.visitorName.charAt(0)} ${user.visitorName.charAt(0)}`}</Text>
                            </View>

                            <View style={{marginLeft:10,alignItems:'center'}}>
                                <Text style={{fontSize:15,fontWeight:'700'}}>{`${user.visitorName}   ${user.visitorName}`}</Text>
                                <Text style={{color:'#DD4747',fontWeight:'700'}}>Visitor</Text>
                            </View>
                        </View>

                        {/* user details */}
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:10}}>
                            <View>
                                <Text style={{paddingBottom:5}}>{user.phone}</Text>
                                <Text>Unit 5 of 10</Text>
                            </View>
                            <View style={{borderLeftWidth:2, borderColor:'#BAB4B4'}}></View>

                            <View>
                                <Text style={{paddingBottom:5}}>{user.gender}</Text>
                                <Text>{user.passCode}</Text>
                            </View>
                        </View>
                        {
                    user.status=='pending'? 

                    <Text style={{paddingLeft:15, paddingTop:15, color:'#908D8D'}}></Text>

                  
                  :  <View style={{width:'50%',justifyContent:'center',alignItems:'center',marginTop:30, marginLeft:70}}>
                        <TouchableOpacity onPress={() => setVisible(true)} style={{backgroundColor:'#36466F',marginLeft:20,borderRadius:10}}><Text style={{color:'#fff',padding: 5,}}>Checkout</Text></TouchableOpacity>
                    </View>
                   
                } 
                    </View>
                </View>
        </View>
    )
}

export default TotalVisitor

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 15,
        backgroundColor: '#F0F6F6',
        marginBottom:10,
    },
    
    bottomView:{
        width:width * 0.9,
        borderRadius:7,
    },
    topView:{
        backgroundColor:'#FDFAFA',
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
        marginTop:50
    }


})
