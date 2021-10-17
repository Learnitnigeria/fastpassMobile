// import BottomTab from '../components/BottomTab';
import HomeScreen from '../Tenant/Screens/HomeScreen';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TenantBottom from '../components/TenantBottom';
const Stack = createStackNavigator();
const TenantStack = () => {
    return (
        <Stack.Navigator screenOptions={{header: () => null}}>
            <Stack.Screen name="TenantBottom" component={TenantBottom} />
            {/* <Stack.Screen name="TenantStack" component={TenantStack} /> */}
      </Stack.Navigator>
    )
}

export default TenantStack
