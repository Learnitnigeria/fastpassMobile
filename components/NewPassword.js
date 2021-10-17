import { Modal, SafeAreaView, StyleSheet, Text, View,Image, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { useState, useEffect,useRef} from 'react'
import KeyboardAvoidView from '../components/KeyboardAvoidView';
import Button from '../Utils/Button';
import Input from '../Utils/Input';
import logo from '../assets/img/logo.png'
import check from '../assets/img/check.png'

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

function NewPassword({navigation}) {
    const [visible, setVisible]= useState(false)
    return (
        <KeyboardAvoidView>
          <SafeAreaView style={styles.container}>

          <SuccessModal visible={visible}>
                <View style={{alignItems:'center'}}>
                    <Image source={check} style={{width:150, height:150,marginVertical:10}}/>
                    <Text style={{color:'#F84C4C',fontSize:17}}>Password Changed Successful</Text>

                    <TouchableWithoutFeedback onPress={()=> {setVisible(false),navigation.navigate('Login')}}>
                        <View style={styles.conformButton}>
                            <Text style={{fontSize:25, color:'#fff'}}>OK</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SuccessModal>

          <Image style={styles.logo} source={logo}/>
              <View style={styles.logoText}>
                  <Text style={styles.fast}>Fast</Text>
                  <Text style={styles.pass}>Pass</Text>
              </View>

                    <Input
                        name="lock"
                        size={30}
                        text="Enter New Password"
                        />

                        <Input
                        name="lock-check"
                        size={30}
                        text="Confirm New Password"
                        />

                    <View>
                        <Button
                        text="submit"
                        bgcolor="#000066"
                        onPress={()=>setVisible(true)}
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
export default NewPassword

