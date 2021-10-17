import React from 'react'
import ForgetPassword from './ForgetPassword'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

const PasswordNavigator = () => {
    return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Forget" component={ForgetPassword}/>
    </Stack.Navigator>
    )
}

export default PasswordNavigator


