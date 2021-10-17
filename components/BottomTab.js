import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// SCREENS
import Dashboard from '../Security/Dashboard'
import CheckIn from '../Security/CheckIn'
import Appointments from '../Security/Appointments'
import Love from '../Security/Love'
import Decline from '../Security/Decline'
import Home from '../Security/Home'
import Logout from '../Security/Logout'
// import Login from '../screens/Login'
import React, { useContext } from 'react'
import Settings from '../Security/Settings'
import Verify from '../Security/Verify'
import PersonalVisitorProfile from '../Security/PersonalVisitorProfile'
import Checkout from '../Security/Checkout'
import ForgetPassword from './ForgetPassword'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

// NAVIGATIONS IMPORT
const HomeStack = createStackNavigator()
const Stack = createStackNavigator()
const DashboardStack = createStackNavigator()
const Tab = createBottomTabNavigator();

const PasswordNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Forget" component={ForgetPassword} />
    </Stack.Navigator>
  )
}


const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <HomeStack.Screen options={{ headerShown: false }} name="Verify" component={Verify} />
      <HomeStack.Screen options={{ headerShown: false }} name="checkout" component={Checkout} />
      <HomeStack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
      <HomeStack.Screen options={{ headerShown: false }} name="Decline" component={Decline} />
      <HomeStack.Screen options={{ headerShown: false }} name="PersonalVisitorProfile" component={PersonalVisitorProfile} />
    </HomeStack.Navigator>
  )
}

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen options={{ headerShown: false }} name="Appointments" component={Appointments} />
      <DashboardStack.Screen options={{ headerShown: false }} name="CheckIn" component={CheckIn} />
    </DashboardStack.Navigator>
  )
}

const BottomTab = ({ navigation }) => {
  const { setIslogin, isLogin } = useContext(AuthContext)
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
              height: 60,
              position:'absolute',
              marginBottom:0
            },

            null,
          ],
          headerShown: false
        }
      }
    >

      <Tab.Screen
        name="Home1"
        component={HomeStackScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.bottomIcon}>
              <MaterialCommunityIcons name="home-outline" size={25} style={{ color: '#fff' }} />
              <Text style={{ color: '#fff', fontSize: 13 }}>Home</Text>
            </View>

          ),
        }}
      />

      <Tab.Screen
        name="Dashboard2"
        component={DashboardStackScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.bottomIcon}>
              <MaterialCommunityIcons name="apps" size={25} style={{ color: '#fff' }} />
              <Text style={{ color: '#fff', fontSize: 13 }}>Dashboard</Text>
            </View>

          ),
        }}
      />

      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarIcon: () => (
            <View style={styles.bottomIcon}>
              <MaterialCommunityIcons name="cog-outline" size={25} style={{ color: '#fff' }} />
              <Text style={{ color: '#fff', fontSize: 13 }}>Settings</Text>
            </View>

          ),
        }}
      />
      <Tab.Screen name="Logout" component={Logout}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity style={styles.bottomIcon} onPress={() => {
              AsyncStorage.removeItem('fastpass')
              setIslogin(!isLogin);
            }}>

              <MaterialCommunityIcons name="login" size={25} style={{ color: '#fff' }} />
              <Text style={{ color: '#fff', fontSize: 13 }}>Logout</Text>
            </TouchableOpacity>

          ),
        }}
      />
    </Tab.Navigator>

  )
}

export default BottomTab

const styles = StyleSheet.create({
  bottomIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
