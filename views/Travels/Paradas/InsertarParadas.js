import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import loginService from '../../../services/Login';
import Json from '../../../services/Json';

import SelectDropdown from 'react-native-select-dropdown';

import * as Location from 'expo-location';
import { Platform } from 'react-native';


async function datosUser(navigation) {

    let id = await SecureStore.getItemAsync('id');
    let user = await SecureStore.getItemAsync('User');
    let idUnidad = await SecureStore.getItemAsync('idUnidad');
    let nameUnidad = await SecureStore.getItemAsync('nameUnidad');
    let nameOperador = await SecureStore.getItemAsync('nombreOperador');

    let tipoParadas = await SecureStore.getItemAsync('tipoParadas');

    // const obtenerUbicacion = async () => {
    //     try {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //         }
    //         let nuevaUbicacion = await Location.getCurrentPositionAsync({});
    //         return nuevaUbicacion;
    //     } catch (error) {
    //     }
    // };

    let errores = 0;
    // let ubicacion = await obtenerUbicacion();
    // let lat = ubicacion.coords.latitude;
    // let lng = ubicacion.coords.longitude;

    let lat = 0;
    let lng = 0;

    if (lat == "" && lng == "") {
        lat = 0;
        lng = 0;
    }

    let FoliosDatos = JSON.stringify(await loginService.Folios(id));
    let Folios = await Json.extraerJson(FoliosDatos);
    let Paradas = '';

    if (Folios['success'] === 'error') {
        console.log("Entra aqui 1");
        errores = 1;
    } else if (Folios['Error'] === 'error') {
        console.log("Entra aqui 2");
        return {
            idOperador: '',
            idUnidad: '',
            unidad: '',
            folios: Folios,
            folio: '',
            paradas: '',
            operador: '',
            latitud: '',
            longitud: '',
            horas: '',
            diesel: '',
        };

    } else {
        console.log("Entra aqui 3 ");
        if (tipoParadas !== '') {
            console.log("Hay Datos Tipo Paradas");
            const json = await SecureStore.getItemAsync('tipoParadas');
            Paradas = JSON.parse(json);

        } else {
            console.log("No Hay Datos Tipo Paradas");
            let ParadasDatos = JSON.stringify(await loginService.Paradas());
            Paradas = await Json.extraerJson(ParadasDatos);
            if (Paradas['success'] === 'error') {
                errores = 1;
            }else{
                const jsonString = JSON.stringify(Paradas);
                await SecureStore.setItemAsync('tipoParadas', jsonString); 
            }
        }        
    }

    if (errores === 1) {
        alert("Error al obtener los datos, por favor intentarlo de nuevo");

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTravel' }],
        });


        return {
            idOperador: '',
            idUnidad: '',
            unidad: '',
            folios: '',
            folio: '',
            paradas: '',
            operador: '',
            latitud: '',
            longitud: '',
            horas: '',
            diesel: '',
        };
    } else {
        let folio = '';
        let datosDiesel = '';

        if (Folios['Error'] !== 'error') {
            folio = Folios[0]['folioViaje'];
            let idUnidadFolio = Folios[0]['idUnidad']
            let ViajeActivoDatos = JSON.stringify(await loginService.Diesel(idUnidadFolio));
            let ViajeActivo = await Json.extraerJson(ViajeActivoDatos);

            if (ViajeActivo)
                if (ViajeActivo['success'] === 'Error' || ViajeActivo['success'] === 'error') {
                    datosDiesel = [0, 0];
                } else {
                    datosDiesel = ViajeActivo
                }
        }


        const Horas = [];

        for (let hour = 0; hour <= 12; hour++) {
            Horas.push({
                id: Horas.length + 1,
                hora: `${hour.toString().padStart(2, '0')}:00`
            });

            Horas.push({
                id: Horas.length + 1,
                hora: `${hour.toString().padStart(2, '0')}:30`
            });
        }



        const HorasModificadas = Horas.slice(1, -1);

        return {
            idOperador: id,
            idUnidad: idUnidad,
            unidad: nameUnidad,
            folios: Folios,
            folio: folio,
            paradas: Paradas,
            operador: nameOperador,
            latitud: lat,
            longitud: lng,
            horas: HorasModificadas,
            diesel: datosDiesel,
        };
    }



}

const Paradas = ({ onSelect, paradas }) => {
    return (
        <SelectDropdown
            data={paradas}
            defaultButtonText={'SELECCIONA EL TIPO DE PARADA'}
            defaultValue={''}
            buttonStyle={styles.BS}
            // onSelect={(selectedItem, index) => {
            //     console.log(selectedItem)}}
            onSelect={(selectedItem, index) => onSelect(selectedItem)}

            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.tipoParada
            }}
            rowTextForSelection={(item, index) => {
                return item.tipoParada
            }}
        />
    )
};

const Horas = ({ onSelect, horas }) => {
    return (
        <SelectDropdown
            data={horas}
            defaultButtonText={'SELECCIONA EL TIEMPO'}
            defaultValue={''}
            buttonStyle={styles.BS}
            // onSelect={(selectedItem, index) => {
            //     console.log(selectedItem)}}
            onSelect={(selectedItem, index) => onSelect(selectedItem)}

            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.hora
            }}
            rowTextForSelection={(item, index) => {
                return item.hora
            }}
        />
    )
};

function IncertarParadas() {
    const navigation = useNavigation();

    useEffect(() => {
        datosUser(navigation).then(userData => {
            setData(userData);
            setLoading(false);
        });
    }, []);




    const [data, setData] = useState({
        idOperador: '',
        idUnidad: '',
        unidad: '',
        folio: '',
        folios: '',
        parada: '',
        paradas: '',
        operador: '',
        longitud: '',
        latitud: '',
        hora: '',
        horas: '',
        diesel: '',
    });

    const [loading, setLoading] = useState(true);


    const guardarParada = async () => {
        if (!data.folio || !data.parada || !data.hora) {
            alert("❌Favor de ingresar los datos correspondientes❌");
        } else {
            setLoading(true);
            try {
                let MensajesParadasDatos = JSON.stringify(await loginService.insertParadas(data));
                let MensajesParadas = await Json.extraerJson(MensajesParadasDatos);

                if (MensajesParadas['success'] === 'error') {
                    alert("❌Error al insertar la parada❌");
                    setLoading(false);
                    return;
                } else {
                    alert("✅Parada agregada correctamente✅");
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeTravel' }],
                        });
                    }, 2000);
                    return;
                }
            } catch (error) {
                error("Error");
            }
        }
    }

    return (
        <View style={styles.container}>
            {loading !== false ? (
                <ActivityIndicator style={styles.container} size={120} color={"black"}></ActivityIndicator>
            ) : (
                <ScrollView>
                    {data.folios['Error'] === 'error' ? (
                        <Text style={styles.title}>"En este momento, no se pueden añadir paradas debido a que no existen viajes disponibles."</Text>
                    ) : (
                        <View style={styles.container2}>
                            <View style={styles.part1}>
                                <Text style={styles.title}>Ingresar Parada Del Viaje</Text>

                                <View style={styles.container2}>
                                    <View style={styles.part1}>
                                        <Text style={styles.titulo2}>
                                            FOLIO DEL VIAJE
                                        </Text>
                                        <TextInput
                                            placeholder="Folio"
                                            onChangeText={(text) => setData({ ...data, folio: text })}
                                            value={data.folio}
                                            editable={false}
                                            name='user'
                                            style={styles.textFolio}
                                        />
                                        <Text style={styles.titulo2}>
                                            Únicamente se visualizará el folio del viaje activo en este momento
                                        </Text>
                                    </View>

                                    <View style={styles.part2}>
                                        <Text style={styles.titulo2}>
                                            TIPO PARADA
                                        </Text>
                                        <Paradas onSelect={(selectedItem) => setData({ ...data, parada: selectedItem })} paradas={data.paradas} />

                                    </View>
                                </View>


                                <View style={styles.container2}>
                                    <View style={styles.part1}>
                                        <Text style={styles.titulo2} >
                                            TIEMPO ESTIMADO DE LA PARADA
                                        </Text>
                                        <Horas onSelect={(selectedItem) => setData({ ...data, hora: selectedItem })} horas={data.horas} />
                                        <Text style={styles.titulo2}>
                                            Tiempo en horas.
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.input2} onPress={guardarParada}>
                                    <Text style={styles.title2}>Agregar Parada</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )}
                </ScrollView>
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

    imgMenu: {
        width: 270,
        height: 150,
        // padding: 5,
    },

    imgMenu2: {
        width: 200,
        height: 150,
        // padding: 5,
    },

    operador: {
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center",
    },

    container2: {
        flexDirection: 'row',
        paddingTop: 10,
    },

    part1: {
        flex: 1,
        // paddingTop: 10,
        alignItems: 'center',
    },

    part2: {
        flex: 1,
        // paddingTop: 20,
        alignItems: 'center',
    },

    title: {
        fontSize: 25,
        textAlign: "center",
    },

    title2: {
        fontSize: 22,
        textAlign: "center",
    },

    titulo2: {
        textAlign: "center",
        fontSize: 18,
        // paddingTop: 2,
    },

    input: {
        borderWidth: 2,
        borderColor: "#00000020",
        padding: 5,
        borderRadius: 15,
        marginVertical: 5,
        width: "80%",
        textAlign: "center",
    },

    input2: {
        borderWidth: 2,
        borderColor: "black",
        padding: 5,
        borderRadius: 15,
        marginVertical: 25,
        width: "35%",
        textAlign: "center",
    },

    textFolio: {
        borderWidth: 2,
        borderColor: "black",
        padding: 5,
        width: "70%",
        borderRadius: 10,
        fontSize: 20,
        textAlign: "center",
        color: "black",
    },

});

export default IncertarParadas;