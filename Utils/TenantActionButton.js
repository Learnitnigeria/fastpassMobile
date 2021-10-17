import React from 'react'
import { View, Text } from 'react-native'

const TenantActionButton = () => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('VisitorsT')}>
                <View style={[styles.verify,{backgroundColor:bgcolor,marginBottom:margin}]}>

                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
                    <MaterialCommunityIcons name="checkbox-marked" color="#000066" size={50}/>
                    <MaterialCommunityIcons name="chevron-right" size={50}/>
                    </View>
                    
                    <Text style={{paddingLeft:20}}>Total Visitors</Text>
                </View>
                <MaterialCommunityIcons/>
        </TouchableOpacity>
    )
}

export default TenantActionButton
