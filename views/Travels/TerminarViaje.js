import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTerminarViaje from "./TerminarViaje/HomeTerminarViaje";

const Stack = createNativeStackNavigator();

function TerViaje(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Terminar Viaje" component={HomeTerminarViaje} options={{headerShown: false}} />  
        </Stack.Navigator>   
    );
}

const TerminarViaje = () => {
    return (
           <TerViaje />
    );
}


export default TerminarViaje;