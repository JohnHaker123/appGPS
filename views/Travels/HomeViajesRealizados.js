import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, ImageBackground} from 'react-native';
import useOrientation from '../../hooks/useOrientation';
import { Movil } from "../../hooks/LockOrientation";

import { stylesL, stylesP } from '../../components/styles/estiloHomeTravels';

const iOperador = require('../../img/IOperador.png');

function HomeViajesRealizados({ navigation }) {

    Movil();
    const orientacion = useOrientation();
    const estilos = orientacion == 'LANDSCAPE' ? stylesL : stylesP;

    return (
        <View style={estilos.container}>
            <Text style={estilos.title}>Viajes Realizados</Text>
            <View style={estilos.body}>
                <View style={estilos.bodyA}>
                    <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgMenu}></ImageBackground>
                </View>

                <View style={estilos.bodyB}>

                    <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate("Viajes Realizados")}>
                        <Text style={estilos.textBoton}>Ver Ultimos Viajes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.boton3} onPress={() => navigation.navigate("Buscar Viaje")}>
                        <Text style={estilos.textBoton}>Buscar Viaje</Text>
                    </TouchableOpacity>

                    <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgMenuP}></ImageBackground>

                </View>
            </View>
        </View>
    );
}

export default HomeViajesRealizados;