import  React,{useState,useEffect,useContext} from 'react'
import  { View,StyleSheet,Text,TouchableOpacity,FlatList } from 'react-native'
import DashboardAppointment from './DashboardAppointment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext';
import Loader from '../../Utils/Loader'

const VisitorsT =  () => {
    const {totalVisitors, setTotalVisitors} = useContext(AuthContext)
    const [filter,setFilter]= useState([])

   
    useEffect(()=>{
        const allV = async()=>{
            const url = `http://192.168.8.100:3001/tenant/all_visitor`;
            const token = await AsyncStorage.getItem('fastpass');
            axios.get(url, { headers: {authorization: `Bearer ${token}`} })
            .then((result)=> {
             setTotalVisitors(result.data.visitors)
            //  setFilter(result.data.visitors)
            //  console.log(result, "fff")
           })
         }
        allV()
        console.log(totalVisitors)
    },[])

    return (
        <View style={{marginTop:20}}>
        <View style={styles.heading}>
            <Text style={{fontSize:20, fontWeight:'700'}}>All Visitors</Text>
            <Text style={{color:'#AFAEAE'}}>Today, 30th August</Text>
        </View>
        {totalVisitors && totalVisitors.length>0?(<><FlatList
                style={{marginBottom: 160}}
                showsVerticalScrollIndicator={false}
                data={totalVisitors}
                keyExtractor={visistorid => visistorid._id}
                renderItem={({item})=><DashboardAppointment user={item}/>}

                /></>):<Loader/>}
    </View>
    )
}

export default VisitorsT
const styles = StyleSheet.create({
    heading:{
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    tabs:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:-30
    },
    today:{
        backgroundColor: '#589ddc',
       
        borderRadius:5,
    },
    active:{
        backgroundColor:'#c4c4c4',
        borderRadius:5,
    },
    checkedout:{
        backgroundColor:'#c4c4c4',
        borderRadius:5,
    },
    todaytext:{
        color:'#fff',
        padding:5,
        fontSize:23
    },
    chekedtext:{
        color:'#fff',
        padding:5,
        fontSize:23
    },
    activetext:{
        color:'#fff',
        padding:5,
        fontSize:23
    },
});