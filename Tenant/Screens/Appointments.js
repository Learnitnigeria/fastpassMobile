
import  React,{useState,useEffect} from 'react'
import  { View,StyleSheet,Text,TouchableOpacity, Dimensions, FlatList } from 'react-native'
const   {height,width} = Dimensions.get('window')
import TotalVisitor from '../Tenant/Screens/TotalVisitor';
import  visitor from '../Data/visitor'

const categories = ['Today', ...new Set(visitor.map(item=> item.cat))];

function Appointments() {
    const [allCategories, setAllCategories]= useState(categories);
    const [filter,setFilter]= useState()
    const [selectedCategoryIndex,setCategoryIndex]= useState(0);

    const filterVisitor = (button)=>{
     if(button === 'Today') {
         setFilter(visitor)
         return
     }  
    const filtredVisitor = visitor.filter((item)=> item.cat == button);
    setFilter(filtredVisitor);
}

useEffect(()=>{
    setFilter(visitor)
},[])

    return (
        <View style={{marginTop:20}}>
            <View style={styles.heading}>
                <Text style={{fontSize:20, fontWeight:'700'}}>Appointments</Text>
                <Text style={{color:'#AFAEAE'}}>Today, 15th August </Text>
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
                    <FlatList
                    style={{marginBottom: 160}}
                    showsVerticalScrollIndicator={false}
                    data={filter}
                    keyExtractor={visistorid => visistorid.id}
                    renderItem={({item})=><TotalVisitor user={item}/>}
                    />
        </View>
    )
}

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

export default Appointments
