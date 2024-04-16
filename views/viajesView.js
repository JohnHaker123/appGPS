import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartTrip from "./Travels/StartTrip";
import HomeTravel from "./Travels/HomeTravels";
import TerminaViaje from "./Travels/TerminarViaje";
import Paradas from "./Travels/Paradas/InsertarParadas";




const Stack = createNativeStackNavigator();

function Viajes(){
    return (
        <Stack.Navigator initialRouteName="HomeTravel">
            <Stack.Screen name="HomeTravel" component={HomeTravel} options={{headerShown: false}} />
            <Stack.Screen name="Iniciar Viaje" component={StartTrip} />   
            <Stack.Screen name="Terminar Viaje" component={TerminaViaje} /> 
            <Stack.Screen name="Paradas" component={Paradas} />   
        </Stack.Navigator>   
    );
}

const ViajesOperador = () => {
    return (
           <Viajes />
    );
}


export default ViajesOperador;