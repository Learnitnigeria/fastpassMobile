import  React,{useState,useEffect,useContext} from 'react'
import  { View,StyleSheet,Text,FlatList } from 'react-native'

import { AuthContext } from '../../Context/AuthContext';
import DashboardAppointment from './DashboardAppointment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loader from '../../Utils/Loader'

const VisitorsT = (navigation) => {
    const {totalVisitors, setTotalVisitors} = useContext(AuthContext)
    const [filter,setFilter]= useState([])
    const [pullLoading,setPollLoading] = useState(true)

    let tempDate = new Date();
    let fDate = tempDate.getFullYear()  + '-' + ((tempDate.getMonth()+1)<= 9 ? '0' + (tempDate.getMonth()+1):(tempDate.getMonth()+1)) + '-' + (tempDate.getDate()<= 9 ? '0' + tempDate.getDate() : tempDate.getDate())

    const fetchData = async()=>{
        const url = `http://192.168.8.100:3001/tenant/active_visitor`;
        const token = await AsyncStorage.getItem('fastpass');
        axios.get(url, { headers: {authorization: `Bearer ${token}`} })
        .then((result)=> {
         setTotalVisitors(totalVisitors, result.data.visitor)
         setPollLoading(false)
         setFilter(result.data.visitor)
       })
      }

    useEffect(()=>{
            const allV = async()=>{
                const url = `http://192.168.8.100:3001/tenant/active_visitor`;
                const token = await AsyncStorage.getItem('fastpass');
                axios.get(url, { headers: {authorization: `Bearer ${token}`} })
                .then((result)=> {
                 setTotalVisitors(totalVisitors, result.data.visitor)
                 setFilter(result.data.visitor)
               })
             }
             allV()
             fetchData()
     },[])

     
    return (
        <View style={{marginTop:20}}>
        <View style={styles.heading}>
            <Text style={{fontSize:20, fontWeight:'700'}}>Active Visitors</Text>
            <Text style={{color:'#AFAEAE'}}>{fDate}</Text>
        </View>

        {filter.length>0?(<><FlatList
                style={{marginBottom: 160}}
                showsVerticalScrollIndicator={false}
                data={filter}
                keyExtractor={visistorid => visistorid._id}
                renderItem={({item})=><DashboardAppointment user={item}/>}
                onRefresh={()=>fetchData()}
                refreshing={pullLoading}

                /></>):<Text style={{alignSelf:'center', fontSize:20}}>No active visitor at the moment</Text>}
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