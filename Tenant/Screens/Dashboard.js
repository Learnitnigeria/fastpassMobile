
import  React,{useState,useEffect,useContext} from 'react'
import  { View,StyleSheet,Text,TouchableOpacity, FlatList,Alert,TextInput } from 'react-native'
import DashboardAppointment from './DashboardAppointment';
import { AuthContext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Loader from '../../Utils/Loader'
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = ['All','checkedOut', 'active','pending'];

const handleEmpty = () => {
    return <Text style={styles.noRecord}> No Record found </Text>;
  };

function Dashboard({navigation,props}) {
    const {totalVisitors, setTotalVisitors} = useContext(AuthContext)
    const [allCategories, setAllCategories]= useState(categories);
    const [selectedCategoryIndex,setCategoryIndex]= useState(0);
    const [filter,setFilter]= useState('')
    const [status, setStatus] = useState('pending')
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text,setTextDate]= useState('')
    const [pullLoading,setPollLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

   
    // DATE PICKER FUNCTIONS
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear()  + '-' + ((tempDate.getMonth()+1)<= 9 ? '0' + (tempDate.getMonth()+1):(tempDate.getMonth()+1)) + '-' + (tempDate.getDate()<= 9 ? '0' + tempDate.getDate() : tempDate.getDate()) 
        setTextDate(fDate)
      };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const fetchData = async()=>{
        const url = `http://192.168.8.100:3001/tenant/visitors?createdAt=${text}`;
        const token = await AsyncStorage.getItem('fastpass');
        axios.get(url, { headers: {authorization: `Bearer ${token}`} })
        .then((result)=> {
         setTotalVisitors(result.data.visitor)
         setPollLoading(false)
         setFilter(result.data.visitor)
       })
      }

    useEffect(()=>{
            const allV = async()=>{
                const url = `http://192.168.8.100:3001/tenant/visitors?createdAt=${text}`;
                const token = await AsyncStorage.getItem('fastpass');
                axios.get(url, { headers: {authorization: `Bearer ${token}`} })
                .then((result)=> {
                 setTotalVisitors(result.data.visitor)
                 setFilter(result.data.visitor)
               })
             }
             allV()
             fetchData()
             console.log(totalVisitors)
     },[text])

      const filterVisitor = (button)=>{
        if(button === 'All') {
          setFilter(totalVisitors)
        }  else{
       const filtredVisitor = totalVisitors.filter((item)=> item.status == button);
       setFilter(filtredVisitor);
    }
   }
    return (
        <View style={{marginTop:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.heading}>
                <Text style={{fontSize:20, fontWeight:'700'}}>Appointments</Text>
                <Text style={{color:'#AFAEAE'}}>{text}</Text>
            </View>
           
            <TouchableOpacity onPress={()=>showMode('date')} style={styles.filterDate}><Text style={{color:'#fff'}}>Filter By Date</Text></TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
      )}
        {/* <View style={{paddingHorizontal:10}}>
        <TextInput placeholder="search visitor by name"
         style={styles.searchBar}
       
         />
        </View> */}
         
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
                style={{marginBottom: 220,}}
                showsVerticalScrollIndicator={false}
                data={filter}
                keyExtractor={visistorid => visistorid._id}
                renderItem={({item})=><DashboardAppointment user={item}/>}
                onRefresh={()=>fetchData()}
                refreshing={pullLoading}
                ListEmptyComponent={handleEmpty}
                extraData={date}

                /></>):<Loader/>}
        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        paddingVertical: 50,
        paddingHorizontal: 10
    },
    // searchBar: {
    //     fontSize: 24,
    //     marginTop:10,
    //     bottom:40,
    //     position:'relative',
    //     height: 50,
    //     backgroundColor: '#fff',
    //     borderRadius:10,
    //     paddingLeft:10
    //   },
    tabs:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:-30,
        paddingHorizontal:15,
        
    },
    today:{
        backgroundColor: '#589ddc',
        justifyContent:'space-around',
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
        fontSize:18
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
    filterDate:{
        backgroundColor:'#36466F',
        padding: 15,
        height:50,
        marginTop:50,
        marginRight:20,
        borderRadius:10
      
    },
    noRecord:{
        fontSize:18,
        alignSelf:'center',
        paddingTop:20
    }
});

export default Dashboard

