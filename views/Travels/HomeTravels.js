import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import useOrientation from '../../hooks/useOrientation';
import { Movil } from "../../hooks/LockOrientation";
import { stylesL, stylesP } from '../../components/styles/estiloHomeTravels';
const iOperador = require('../../img/IOperador.png');

function HomeTravel({ navigation }) {
    Movil();
    const orientacion = useOrientation();
    const estilos = orientacion == 'LANDSCAPE' ? stylesL : stylesP;

    return (
        <View style={estilos.container}>
            <ScrollView>
            <Text style={estilos.title}>Bienvenido</Text>
            <View style={estilos.body}>
                <View style={estilos.bodyA}>
                    <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgMenu}/>
                </View>

                <View style={estilos.bodyB}>

                    <TouchableOpacity style={estilos.boton} onPress={() => navigation.navigate("Iniciar Viaje")}>
                        <Text style={estilos.textBoton}>INICIAR VIAJE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.boton3} onPress={() => navigation.navigate("Terminar Viaje")}>
                        <Text style={estilos.textBoton}>TERMINAR VIAJE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilos.boton2} onPress={() => navigation.navigate("Paradas")}>
                        <Text style={estilos.textBoton}>PARADAS</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={estilos.boton2} onPress={() => navigation.navigate("Insertar Unidad")}>
                        <Text style={estilos.textBoton}>CAMBIAR DE UNIDAD</Text>
                    </TouchableOpacity> */}

                    <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgMenuP}></ImageBackground>

                </View>
            </View>
            </ScrollView>
        </View>
    );
}

export default HomeTravel;