import React from 'react'
import {Text, View,StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get("window");

const ActiveVisitor = ({user}) => {
    return (
        <View style={styles.container}>
        <View style={[styles.bottomView,{backgroundColor:user.cat=='Active'?'#62C78A':'#CAA852'}]}>
            <View style={styles.topView}>

                <View style={[styles.checkedouttop,{backgroundColor:user.cat=='Active'?'#62C78A':'#CAA852'}]}>
                    <Text style={styles.checkouttext}>{user.cat}</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:10,marginLeft:10}}>
                    <View style={styles.header}>
                        <Text style={{color:"#fff"}}>{`${user.firstname.charAt(0)} ${user.lastname.charAt(0)}`}</Text>
                    </View>

                    <View style={{marginLeft:10,alignItems:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'700'}}>{`${user.firstname}   ${user.lastname}`}</Text>
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
                        <Text style={{paddingBottom:5}}>Female</Text>
                        <Text>{user.code}</Text>
                    </View>
                </View>
                {
                    user.cat=='Active'? 
                    <View style={{width:'50%',justifyContent:'center',alignItems:'center',marginTop:40, marginLeft:50}}>
                        <TouchableOpacity style={{backgroundColor:'#36466F',marginLeft:20,borderRadius:10}}><Text style={{color:'#fff',padding: 10,}}>Checkout</Text></TouchableOpacity>
                    </View>
                  :
                    <Text style={{paddingLeft:15, paddingTop:30, color:'#908D8D'}}> let her go am safe and sound</Text>
                } 
            </View>
        </View>
</View>
    )
}

export default ActiveVisitor

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingHorizontal: 15,
        backgroundColor: '#F0F6F6',
        marginBottom:10,
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
    }


})
