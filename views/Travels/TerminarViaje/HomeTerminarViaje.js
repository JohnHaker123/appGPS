import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import loginService from '../../../services/Login';
import Json from '../../../services/Json';
import { Platform } from 'react-native';


const iOperador = require('../../../img/IOperador.png');
const loadingTruck = require('../../../img/loadingTruck.gif');

async function datosUser(navigation) {
    let id = await SecureStore.getItemAsync('id');
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

    // let ubicacion = await obtenerUbicacion();
    // let lat = ubicacion.coords.latitude;
    // let lng = ubicacion.coords.longitude;

    // console.log(lat);

    let lat = 0;
    let lng = 0; 

    if (lat == "" && lng == "") {
        lat = 0;
        lng = 0;
    }

    let errores = 0;

    let localizacion = lat + "," + lng;

    let FoliosDatos = JSON.stringify(await loginService.Folios(id));
    let Folios = await Json.extraerJson(FoliosDatos);
    if (Folios['success'] === 'error') {
        errores = 1;
    } else {
        let folio = '';
        let datosDiesel = '';
        if (Folios['Error'] === 'error') {
            return {
                idOperador: '',
                folio: '',
                folios: Folios,
                localizacion: '',
                diesel: '',
            };
        } else {
            folio = Folios[0]['folioViaje'];
            let idUnidad = Folios[0]['idUnidad'];
            let ViajeActivoDatos = JSON.stringify(await loginService.Diesel(idUnidad));
            let ViajeActivo = await Json.extraerJson(ViajeActivoDatos);
            if (ViajeActivo['success'] === 'Error' || ViajeActivo['success'] === 'error') {
                datosDiesel = [0, 0];
            } else {
                datosDiesel = ViajeActivo
            }
        }


        return {
            idOperador: id,
            folio: folio,
            folios: Folios,
            localizacion: localizacion,
            diesel: datosDiesel,
        };
    }

    if (errores === 1) {
        alert("Error al obtener los datos, intente de nuevo por favor.");

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTravel' }],
        });


        return {
            idOperador: '',
            folio: '',
            folios: '',
            localizacion: '',
            diesel: '',
        };
    }


}

// const Folios = ({ onSelect, folios }) => {
//     return (
//         <SelectDropdown
//             data={folios}
//             defaultButtonText={'SELECCIONA EL FOLIO'}
//             defaultValue={''}
//             buttonStyle={''}
//             // onSelect={(selectedItem, index) => {
//             //     console.log(selectedItem)}}
//             onSelect={(selectedItem, index) => onSelect(selectedItem)}

//             buttonTextAfterSelection={(selectedItem, index) => {
//                 return selectedItem.folioViaje
//             }}
//             rowTextForSelection={(item, index) => {
//                 return item.folioViaje
//             }}
//         />
//     )
// };

function HomeTerminarViaje({ navigation }) {
    const [viajeGuardado, setViajesGuardados] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        idOperador: '',
        folio: '',
        folios: '',
        localizacion: '',
        diesel: '',
    });

    useEffect(() => {
        datosUser(navigation).then(userData => {
            setData(userData);
            setLoading(false)
        });
    }, []);


    const guardarTerminoViaje = async () => {
        if (!data.folio || !data.localizacion) {
            alert("❌FAVOR DE SELECCIONAR UN FOLIO❌");
        } else {
            setViajesGuardados(true);
            try {
                let resData = JSON.stringify(await loginService.TerminarViaje(data));
                let res = await Json.extraerJson(resData);
                if (res['success'] === 'error') {
                    setTimeout(() => {
                        setViajesGuardados(false);
                        alert("❌ERROR AL TERMINAR VIAJE❌");
                    }, 2000);
                    return;
                } else {
                    setTimeout(() => {
                        alert("✅VIAJE TERMINADO CORRECTAMENTE✅");
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeTravel' }],
                            });
                        }, 1000);
                    }, 3000);
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
                <ActivityIndicator size={120} color={"black"}></ActivityIndicator>
            ) : (
                <View style={styles.View}>
                    {viajeGuardado !== false ? (
                        <View style={styles.View}>
                            <Image source={loadingTruck} style={styles.loading} />
                            <Text style={styles.mensaje}>Terminando viaje.....</Text>
                        </View>
                    ) : (
                        <View style={styles.View}>

                            <Text style={styles.title}>TERMINAR VIAJE</Text>
                            <View style={styles.body}>
                                <View style={styles.bodyA}>
                                    <ImageBackground source={iOperador} resizeMode="cover" style={styles.imgMenu}></ImageBackground>
                                </View>

                                <View style={styles.bodyB}>
                                    {data.folios['Error'] === 'error' || data.folios === '' ? (
                                        <Text style={styles.tituloTermino}>"¡Todo está en orden! No existen viajes pendientes. Empieza un nuevo viaje cuando lo necesites."
                                        </Text>
                                    ) : (
                                        <ScrollView>
                                            <View style={styles.bodyB}>
                                                <Text style={styles.tituloTermino}>
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

                                                <Text style={styles.subtituloTermino}>
                                                    "Por favor, ten presente que solo se mostrará el folio asociado al viaje en activo en este momento."

                                                </Text>
                                                <TouchableOpacity style={styles.boton2} onPress={guardarTerminoViaje}>
                                                    <Text style={styles.textBoton}>TERMINAR VIAJE</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 15,
        paddingTop: Platform.OS === "android",
        justifyContent: "center",
    },

    loading: {
        justifyContent: "center",
    },

    View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },

    mensaje: {
        fontSize: 27,
        textAlign: "center",
        fontStyle: 'italic',
    },

    loading: {
        width: 290,
        height: 250,
        // padding: 5,
    },

    body: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        // paddingTop: 10,
    },

    bodyA: {
        flex: 1,
        alignItems: "center",
    },

    bodyB: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
    },

    title: {
        marginTop: 20,
        fontWeight: "600",
        letterSpacing: 0.5,
        fontSize: 35,
        textAlign: "center",
        fontStyle: 'italic',
        // fontFamily: 'AnticDidone'
    },

    imgMenu: {
        // flex: 1,
        width: 300,
        height: 300,
    },

    imgMenuP: {
        display: "none",
    },

    tituloTermino: {
        fontSize: 25,
        textAlign: "center",
    },

    subtituloTermino: {
        fontSize: 15,
        marginVertical: 10,
        textAlign: "center",

    },

    boton: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        width: "60%",
        alignSelf: "center",
        borderRadius: 10,
    },

    select: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
    },

    boton2: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    boton3: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    textBoton: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
        // fontFamily: 'Calistoga',
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

export default HomeTerminarViaje;