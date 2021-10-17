import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

const DetailCard = ({header,Vdata}) => {
    return (
        <View style={styles.info}>
            <Text style={styles.title}>{header}</Text>
            <Text style={styles.data}>{Vdata}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    info:{
        marginTop:10,
        backgroundColor:'#FDFAFA',
        borderRadius:10,
        padding:5
    },
    title:{
        borderBottomWidth:2,
        borderColor:"#E3E3E3",
        fontSize:16,
        color:'#CDCDCD'
    },
    data:{
        fontSize:16
    },
});

export default DetailCard
