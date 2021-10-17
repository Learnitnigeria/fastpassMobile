import React,{useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import Mystack from './navigations/Mystack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Security/Login';
import ForgetPassword from './components/ForgetPassword';
import ConfirmPin from './components/ConfirmPin'
import TenantStack from './navigations/TenantStack';
import NewPassword from './components/NewPassword';
import General from './Tenant/Screens/General';
import { AuthContext } from './Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const StackApp = createStackNavigator()
export default function App() {
const [isLogin, setIslogin] = useState(false)
const [profile, setProfile] = useState({})
const [loading,setLoading] = useState(false);
const [totalVisitors, setTotalVisitors] =useState([])

// const fetchUser = async ()=>{
//         const url = "http://192.168.8.102:3003/auth/user/currentUser";
//               try{
//                   const token = await AsyncStorage.getItem('fastpass');
//                   if(token !==null){
//                   const res =  axios.get(url,{headers:{ authorization:`Bearer ${token}`}})

//                   if(!res.data.error){
//                     setProfile(res.data.user)
//                     setIslogin(true)
//                   }else{
//                     setProfile()
//                     setIslogin(false)
//                   }
//                   }else{
//                     setProfile()
//                     setIslogin(false)
//                 }
//                 }
//                 catch(err){
//                 console.log('erro' + err)
//                 }
//                 }

//                 useEffect(()=>{
//                 fetchUser()
//                 return () => {
//                 setProfile([]);
//             setIslogin();
//             };
// },[])
  return (
    <>
    <StatusBar/>
    <AuthContext.Provider value={{isLogin,setIslogin,profile,setProfile,loading,setLoading,totalVisitors, setTotalVisitors}}>
    <NavigationContainer>
        <StackApp.Navigator>
          {
            isLogin?
              <>
                  <StackApp.Screen options={{headerShown: false}} name="TenantStack" component={TenantStack}/>
                  <StackApp.Screen options={{headerShown: false}} name="Bottom" component={Mystack}/>
              </>
              :(
                <>
                  <StackApp.Screen options={{headerShown: false}} name="Login" component={Login}/>
                  <StackApp.Screen name="Forget" component={ForgetPassword}/>
                  <StackApp.Screen options={{headerShown: false}} name="ConfirmPin" component={ConfirmPin}/>
                  <StackApp.Screen options={{headerShown: false}} name="NewPassword" component={NewPassword}/>
                  <StackApp.Screen options={{headerShown: false}} name="General" component={General}/>
                </>
              )
              
            
          }
        </StackApp.Navigator>
      </NavigationContainer>
</AuthContext.Provider>
</>
  );
}