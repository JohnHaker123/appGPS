import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import loginService from '../../../services/Login';
import Json from '../../../services/Json';
import { Platform } from 'react-native';



async function datosUser(fecha, navigation) {
    let id = await SecureStore.getItemAsync('id');
    let data = [{ "id": id, "fecha": fecha }];
    let datosApi = JSON.stringify(await loginService.getViajesFecha(data));
    let datos = await Json.extraerJson(datosApi);
    if (datos['success'] === 'error') {
        alert("Error al obtener los datos, intente de nuevo por favor.");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Buscar Viaje' }],
        });

    } else {
        return datos
    }
    // return datos
}

const ListaViajes = ({ navigation,idOperador, fechaInicio, folioViaje, fechaTermino, diesel, odometro, unidad, estatus }) => (
    
    <View style={styles.tripContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.tituloDatos}>Datos Del Viaje</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.th}>Fecha Inicio: </Text>
            <Text style={styles.th}>{fechaInicio}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.th}>Fecha Termino: </Text>
            <Text style={styles.th}>{fechaTermino}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.th}>Folio Viaje: </Text>
            <Text style={styles.th}>{folioViaje}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.th}>Unidad: </Text>
            <Text style={styles.th}>{unidad}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.th}>Diesel: </Text>
            <Text style={styles.th}>{diesel}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.th}>Odometro: </Text>
            <Text style={styles.th}>{odometro}</Text>
        </View>

        {estatus !== 1 ? (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.th}>Estatus Viaje: </Text>
                <Text style={styles.th}>Terminado</Text>
            </View>
        ) : (
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.th}>Estatus Viaje: </Text>
                <Text style={styles.th}>Sin Terminar</Text>
            </View>
        )}

        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.th}>Paradas</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Lista Paradas", { valor: [folioViaje,idOperador] } , {navigation: navigation})}
                style={styles.thB}
            >
                <Text style={styles.textBoton}>Ver</Text>
            </TouchableOpacity>
        </View>

    </View>
);


function BusquedaViajes({ route, navigation }) {
    const { valor } = route.params;
    useEffect(() => {
        datosUser(valor, navigation).then(userData => {
            setData(userData);
            setLoading(false);
        });
    }, []);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    state = {
        isReady: false,
    };

    return (
        <View style={styles.container}>
            {loading !== false ? (
                <ActivityIndicator style={styles.container} size={120} color={"black"}></ActivityIndicator>
            ) : (
                <View style={styles.container}>
                    {data['Error'] === 'error' ? (
                        <Text style={styles.mensaje}>No Existen Viajes En Esta Fecha {valor}</Text>
                    ) : (
                        <ScrollView style={styles.content}>
                            {data.map((dato, index) => (
                                <ListaViajes key={`trip-${index}`} navigation={navigation} {...dato}/>
                            ))}
                        </ScrollView>
                    )
                    }
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android",
    },

    title2: {
        fontSize: 22,
        textAlign: "center",
    },
    mensaje: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
    },

    input2: {
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        borderRadius: 15,
        marginVertical: 15,
        width: "25%",
        textAlign: "center",
    },

    fecha: {
        borderWidth: 1,
        borderColor: "black",
        padding: 5,
        borderRadius: 15,
        marginVertical: 15,
        width: "25%",
        textAlign: "center",
        fontSize: 20,
    },

    tripContainer: {
        margin: 20,
        borderWidth: 2,
        borderColor: "black",
    },


    th: {
        flex: 1,
        margin: 5,
        padding: 5,
        fontSize: 25,
        borderWidth: 1,
        borderColor: "#00000020",
    },

    thB: {
        flex: 1,
        margin: 5,
        padding: 5,
        fontSize: 30,
        borderWidth: 1,
        borderColor: "purple",
    },

    tituloDatos: {
        flex: 1,
        margin: 5,
        fontSize: 30,
        textAlign: "center",
    },

    textBoton: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
    },

});
export default BusquedaViajes;