import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TripsMade from "./Travels/TripsMade";
import ItStops from "./Travels/Itstops";

import HomeViajesRealizados from "./Travels/HomeViajesRealizados";
import BuscarViaje from "./Travels/Viajes/BuscarViaje";
import BusquedaViajes from "./Travels/Viajes/BusquedaViajes";

const Stack = createNativeStackNavigator();

function ListaViajes(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Viajes Realizados" component={HomeViajesRealizados} options={{headerShown: false}} />
            <Stack.Screen name="Viajes Realizados" component={TripsMade} />
            <Stack.Screen name="Lista Paradas" component={ItStops} /> 
            <Stack.Screen name="Buscar Viaje" component={BuscarViaje} />  
            <Stack.Screen name="Viajes Por Fecha" component={BusquedaViajes} />  
        </Stack.Navigator>   
    );
}

const ViajesLista = () => {
    return (
           <ListaViajes />
    );
}


export default ViajesLista;