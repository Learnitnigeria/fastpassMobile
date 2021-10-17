import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Screen1 from '../../Utils/Screen1';
import Screen2 from '../../Utils/Screen2';

const General =()=>{
    return(
        <Tab.Navigator
        screenOptions={
            {
                "tabBarHideOnKeyboard": true,
                "tabBarStyle": [
                  {
                    "display": "flex"
                  },
                  null
                ]
              }
        }
        >
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
      </Tab.Navigator>
    )
}

export default General