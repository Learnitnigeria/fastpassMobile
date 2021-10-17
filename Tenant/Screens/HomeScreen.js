import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Dimensions} from 'react-native';
import Button from '../../Utils/Button';
import Input from '../../Utils/Input';

import {MaterialCommunityIcons} from '@expo/vector-icons'
const { width, height } = Dimensions.get("window");
import React from 'react';
import logo from '../../assets/img/logo.png'
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen ({navigation}) {
    return (
    
          <SafeAreaView style={styles.container}>
              <ScrollView 
              showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}>
              <View style={{alignItems:'center',marginBottom:10}}>
                <Image style={styles.logo} source={logo}/>
                <View style={styles.logoText}>
                    <Text style={styles.fast}>Fast</Text>
                    <Text style={styles.pass}>Pass</Text>
                </View>
            </View>    
              

            <TouchableOpacity style={styles.verifyContainer} onPress={() => navigation.navigate('VisitorsT')}>
                <View style={styles.verify}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20,paddingVertical:5}}>
                    <MaterialCommunityIcons name="chart-pie" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    
                    <Text style={{paddingLeft:20,paddingBottom:10}}>Total Visitors</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.verifyContainer} onPress={() => navigation.navigate('ActiveAppointments')}>
                <View style={styles.verify}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20,paddingVertical:5}}>
                    <MaterialCommunityIcons name="account-check" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    <Text style={{paddingLeft:20,paddingBottom:10}}>Active Visitors</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.verifyContainer} onPress={() => navigation.navigate('CheckedOutVistors')}>
                <View style={styles.verify}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20,paddingVertical:10}}>
                    <MaterialCommunityIcons name="checkbox-marked" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    <Text style={{paddingLeft:20,paddingBottom:10}}>Checkedout Visitors</Text>
                </View>
            </TouchableOpacity>

        </ScrollView >
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddVisitor')}>
                <Text style={styles.addtext}>+</Text>
        </TouchableOpacity>
              
          </SafeAreaView>
    
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1, 
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
       marginBottom:5
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
   verifyContainer:{
    backgroundColor:'#FDFAFA', 
    borderRadius:30,
     width:width* 0.9,
     marginBottom:10
    },
 
    verify:{
        justifyContent:'center',
    },
    addBtn:{
        width:80,
        height:80,
        borderRadius:80/2,
        backgroundColor:'#F44242',
        position:'absolute',
        bottom:1,
        alignSelf:'flex-end',
        justifyContent:'center',
        alignItems:'center',
        left:250,
        flex:1,
    },
    addtext:{
        position:'relative',
        fontSize:40,
        fontWeight:'bold',
        color:'#fff'
    }
  
  });
