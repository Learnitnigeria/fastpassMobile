import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react';
import { AuthContext } from '../Context/AuthContext'
import Login from '../Security/Login'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import ActiveVisitor from '../Tenant/Screens/ActiveVisitor'
import TotalVisitor from '../Tenant/Screens/TotalVisitor'
import VisitorsT from '../Tenant/Screens/VisitorsT'
import ActiveAppointments from '../Tenant/Screens/ActiveAppointments'
import CheckedOutVistors from  '../Tenant/Screens/CheckedOutVistors'
import AddVisitor from '../Tenant/Screens/AddVisitor'
import Dashboard from '../Tenant/Screens/Dashboard'
import TenantSettings from '../Tenant/Screens/TenantSettings'


import HomeScreen from '../Tenant/Screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NAVIGATIONS IMPORT
const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeStackScreen =()=>{
  return (
    <HomeStack.Navigator>
    <HomeStack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen}/>
    <HomeStack.Screen options={{headerShown: false}} name="ActiveVisitor" component={ActiveVisitor}/>
    <HomeStack.Screen options={{headerShown: false}} name="TotalVisitor" component={TotalVisitor}/>
    <HomeStack.Screen options={{headerShown: false}} name="VisitorsT" component={VisitorsT}/>
    <HomeStack.Screen options={{headerShown: false}} name="ActiveAppointments" component={ActiveAppointments}/>
    <HomeStack.Screen options={{headerShown: false}} name="CheckedOutVistors" component={CheckedOutVistors}/>
    <HomeStack.Screen options={{headerShown: false}} name="AddVisitor" component={AddVisitor}/>
  </HomeStack.Navigator>
  )
}

const TenantBottom = () => {
  const {setIslogin,isLogin} = useContext(AuthContext)
    return (
       <Tab.Navigator 
       screenOptions={
        {
          "tabBarShowLabel": false,
           "tabBarHideOnKeyboard": true,
          "tabBarStyle": [
            {
              "display": "flex",
              backgroundColor: '#000066',
              height:60,
            },
            null
          ],
          headerShown: false,
        }
       }
       >
        <Tab.Screen 
        name="HomeStackScreen" 
        component={HomeStackScreen}
        options={{
            tabBarIcon: () => (
               <View style={styles.bottomIcon}>
                   <MaterialCommunityIcons name="home-outline" size={25} style={{color:'#fff'}}/>
                   <Text style={{color:'#fff', fontSize:13}}>Home</Text>
               </View>
              
            ),
          }}
        />

        <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
            tabBarIcon: () => (
               <View style={styles.bottomIcon}>
                   <MaterialCommunityIcons name="apps" size={25} style={{color:'#fff'}}/>
                   <Text style={{color:'#fff', fontSize:13}}>Dashboard</Text>
               </View>
              
            ),
          }}
        />

        <Tab.Screen name="TenantSettings" component={TenantSettings}
        options={{
            tabBarIcon: () => (
               <View style={styles.bottomIcon}>
                   <MaterialCommunityIcons name="cog-outline" size={25} style={{color:'#fff'}}/>
                   <Text style={{color:'#fff', fontSize:13}}>Settings</Text>
               </View>
              
            ),
          }}
        />
        <Tab.Screen name="Login" component={Login}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity style={styles.bottomIcon} 
            onPress={()=>{
            AsyncStorage.removeItem('fastpass')  
            setIslogin(!isLogin); 
            }}>
            <MaterialCommunityIcons name="login" size={25} style={{color:'#fff'}}/>
            <Text style={{color:'#fff', fontSize:13}}>Logout</Text>
        </TouchableOpacity>
            
          ),
        }}
        />
       </Tab.Navigator>
    )
}

export default TenantBottom

const styles = StyleSheet.create({
  bottomIcon:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  }
})
