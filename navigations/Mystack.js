import BottomTab from '../components/BottomTab';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function Mystack() {
    return (
    <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    )
}
