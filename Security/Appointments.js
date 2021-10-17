
import  React,{useState,useEffect,useContext} from 'react'
import  { View,StyleSheet,Text,TouchableOpacity, FlatList } from 'react-native'
import  Visitors from '../components/Visitors';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Utils/Loader'

const categories = ['Today','checkedOut', 'active'];

function Appointments() {
    const {totalVisitors, setTotalVisitors} = useContext(AuthContext)
    // const [loading,setLoading] = useState(false)
    const [allCategories, setAllCategories]= useState(categories);
    const [selectedCategoryIndex,setCategoryIndex]= useState(0);
    const [filter,setFilter]= useState('')

     useEffect(()=>{
        const allV = async()=>{
            const url = "http://192.168.8.100:3001/security/visitors";
            const token = await AsyncStorage.getItem('fastpass');
            axios.get(url, { headers: {authorization: `Bearer ${token}`} })
            .then((result)=> {
             setTotalVisitors(result.data.visitor)
             setFilter(result.data.visitor)
           })
         }
         allV()
     },[])

    const filterVisitor = (button)=>{
        if(button === 'Today') {
          setFilter(totalVisitors)
        }  else{
       const filtredVisitor = totalVisitors.filter((item)=> item.status == button);
       setFilter(filtredVisitor);
    }
   }
    return (
        <View style={{marginTop:20}}>
            <View style={styles.heading}>
                <Text style={{fontSize:20, fontWeight:'700'}}>Appointments</Text>
                {/* <Text style={{color:'#AFAEAE'}}>Today, 24th </Text> */}
            </View>
            <View style={styles.tabs}>
                {
                    allCategories.map((item,index)=>(
                    <TouchableOpacity 
                        onPress={()=>{filterVisitor(item),setCategoryIndex(index) }}
                        style={[styles.today,{backgroundColor:selectedCategoryIndex==index?'#589ddc':'#c4c4c4'}]}
                        key={index}><Text style={styles.todaytext}>{item}</Text>
                    </TouchableOpacity>
                    ))
                }
            </View>
            {filter?(<><FlatList
                style={{marginBottom: 200}}
                showsVerticalScrollIndicator={false}
                data={filter}
                keyExtractor={visistorid => visistorid._id}
                renderItem={({item})=><Visitors user={item}/>}
                /></>):<Loader/>}
                
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        paddingVertical: 50,
        paddingHorizontal: 10
    },
    tabs:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:-30,
        paddingHorizontal:15
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
        fontSize:20
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

export default Appointments
