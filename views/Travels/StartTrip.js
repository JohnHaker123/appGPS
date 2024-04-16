import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import loginService from '../../services/Login';
import Json from '../../services/Json';
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';

import { Platform } from 'react-native';

const imgDiesel = require('../../img/Diesel.png');
const imgOdometro = require('../../img/odometro.png');
const loadingTruck = require('../../img/loadingTruck.gif');
const Truck = require('../../img/truck.gif');


const Unidades = ({ onSelect, unidades }) => {
    return (
        <SelectDropdown
            data={unidades}
            defaultButtonText={'SELECCIONA LA UNIDAD'}
            defaultValue={''}
            buttonStyle={styles.BS}
            // onSelect={(selectedItem, index) => {
            //     console.log(selectedItem)}}
            onSelect={(selectedItem, index) =>
                 onSelect(selectedItem)
                // console.log(selectedItem.id)
            }

            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.unidad


            }}
            rowTextForSelection={(item, index) => {
                return item.unidad
            }}
        />
    )
};

const Tanque = ({ onSelect }) => {
    let Tanque = ["1/4", "1/2", "3/4", "F"];
    return (
        <SelectDropdown
            data={Tanque}
            defaultButtonText={'SELECCIONA EL NIVEL DEL TANQUE'}
            defaultValue={''}
            buttonStyle={styles.BS}
            // onSelect={(selectedItem, index) => {
            //     console.log(selectedItem)}}
            onSelect={(selectedItem, index) => onSelect(selectedItem)}

            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem

            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
        />
    )
};




async function datosUser(navigation) {
    let errores = 0;
    let id = await SecureStore.getItemAsync('id');
    let nameOperador = await SecureStore.getItemAsync('nombreOperador');

    let datosUnidades = await SecureStore.getItemAsync('Unidades');

    // console.log(datosUnidades, datosParadas, datosFolio);
    // console.log(datosUnidades);
    // console.log(datosFolio);

    const obtenerUbicacion = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            }

            // Obtener la ubicación actual
            let nuevaUbicacion = await Location.getCurrentPositionAsync({});
            return nuevaUbicacion;
        } catch (error) {
        }
    };

    let ViajeActivoDatos = JSON.stringify(await loginService.ViajeActivo(id));
    let ViajeActivo = await Json.extraerJson(ViajeActivoDatos);

    if (ViajeActivo['success'] === 'error') {
        errores = 1;
    } else {
    let Conteo = ViajeActivo[0]['total'];
    if (Conteo > 0) {
    return {
        idOperador: id,
        folio: '',
        operador: nameOperador,
        localizacion: '',
        unidades: '',
        conteo: Conteo,
    };
    } else {
    let ubicacion = await obtenerUbicacion();
    // let lat = ubicacion.coords.latitude;
    // let lng = ubicacion.coords.longitude;

    console.log(ubicacion);

    let lat = 0;
    let lng = 0;



    if (lat == "" && lng == "") {
        lat = 0;
        lng = 0;
    }

    if (datosUnidades !== '') {
        console.log("Entra Con Unidades");
        const json = await SecureStore.getItemAsync('Unidades');
        const unidades = JSON.parse(json);
        
        let conteoDatos = JSON.stringify(await loginService.conteoFolio(id));
        let conteo = await Json.extraerJson(conteoDatos);

        if (conteo['success'] === 'error') {
            errores = 1;
        } else {
            let numero = conteo[0]["total"] + 1;
            numero = numero.toString().padStart(5, '0');
            const palabras = nameOperador.split(' ');
            const iniciales = palabras.map(palabra => palabra[0]);

            let localizacion = lat + "," + lng;

            let numfolio = `${numero}-${iniciales.join('')}`;


            return {
                idOperador: id,
                folio: numfolio,
                operador: nameOperador,
                localizacion: localizacion,
                unidades: unidades,
                conteo: 0,
            };
        }
    } else {
        console.log("Entra Sin Unidades");

        let unidadesDatos = JSON.stringify(await loginService.bringUnits());
        let unidades = await Json.extraerJson(unidadesDatos);

        if (unidades['success'] === 'error') {
            errores = 1;
        } else {
            const jsonString = JSON.stringify(unidades);
            await SecureStore.setItemAsync('Unidades',jsonString);

            let conteoDatos = JSON.stringify(await loginService.conteoFolio(id));
            let conteo = await Json.extraerJson(conteoDatos);

            if (conteo['success'] === 'error') {
                errores = 1;
            } else {
                let numero = conteo[0]["total"] + 1;
                numero = numero.toString().padStart(5, '0');
                const palabras = nameOperador.split(' ');
                const iniciales = palabras.map(palabra => palabra[0]);

                let localizacion = lat + "," + lng;

                let numfolio = `${numero}-${iniciales.join('')}`;

                return {
                    idOperador: id,
                    folio: numfolio,
                    operador: nameOperador,
                    localizacion: localizacion,
                    unidades: unidades,
                    conteo: 0,
                };
            }
        }



    }
    }
    }

    if (errores === 1) {

        alert("Error al obtener los datos, intente de nuevo por favor.");

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTravel' }],
        });

        return {
            idOperador: id,
            folio: '',
            operador: nameOperador,
            localizacion: '',
            unidades: '',
            conteo: '',
        };
    }




}

const TripsMade = () => {
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
        unidades: '',
        unidad: '',
        folio: '',
        operador: '',
        Diesel: '',
        odometro: '',
        localizacion: '',
        conteo: '',
    });

    const [diesel, setDiesel] = useState(null);
    const [viajeGuardado, setViajesGuardados] = useState(false);
    const [loading, setLoading] = useState(true);

    const mostrarDiesel = async (selectedItem) => {
        let idUnidad = selectedItem.id;
        let ViajeActivoDatos = JSON.stringify(await loginService.Diesel(idUnidad));
        let ViajeActivo = await Json.extraerJson(ViajeActivoDatos);
        if (ViajeActivo['success'] === 'Error' || ViajeActivo['success'] === 'error') {
            let datos = [0, 0];
            setDiesel(datos)
        } else {
            setDiesel(ViajeActivo)
        }

    };

    const guardarViaje = async () => {
        if (!data.unidad || !data.folio || !data.odometro || !data.Diesel) {
            alert("❌Favor de ingresar los datos correspondientes❌");
        } else {
            setViajesGuardados(true);
            try {
                const userDatos = JSON.stringify(await loginService.insertViaje(data, diesel));
                let user = await Json.extraerJson(userDatos);
                if (user['success'] === 'error') {
                    setTimeout(() => {
                        setViajesGuardados(false);
                        alert("❌Error al insertar el viaje❌");
                    }, 2000);
                    return;
                } else {
                    setTimeout(() => {
                        alert("✅Viaje agregado correctamente✅");
                        data.folio = "";
                        data.odometro = "";
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeTravel' }],
                            });
                        }, 2000);
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
                <View style={styles.container}>
                    {viajeGuardado !== false ? (
                        <View style={styles.View}>
                            <Image source={loadingTruck} style={styles.loading} />
                            <Text style={styles.mensaje}>Guardando viaje.....</Text>
                        </View>
                    ) : (
                        <View>
                            {data.conteo === 0 || data.conteo === '' ? (
                                <View>
                                    <ScrollView>
                                        <Text style={styles.operador}>Nombre Del Operador:      {data.operador}</Text>
                                        <View style={styles.container2}>
                                            <View style={styles.part1}>
                                                <Text style={styles.title}>Ingresar Inicio Del Viajeeee</Text>

                                                <View style={styles.container2}>
                                                    <View style={styles.part1}>
                                                        <Text style={styles.titulo2}>
                                                            Unidad
                                                        </Text>
                                                        <Unidades
                                                            onSelect={(selectedItem) => {
                                                                setData({ ...data, unidad: selectedItem });
                                                                mostrarDiesel(selectedItem);
                                                            }}
                                                            unidades={data.unidades} />
                                                    </View>

                                                    <View style={styles.part2}>
                                                        <Text style={styles.titulo2}>
                                                            Folio Del viaje
                                                        </Text>
                                                        <TextInput
                                                            placeholder=" Folio Carta Porte"
                                                            onChangeText={(text) => setData({ ...data, folio: text })}
                                                            value={data.folio}
                                                            name='folio'
                                                            editable={false}
                                                            style={[
                                                                styles.input,
                                                                { borderWidth: 1, borderColor: "black", textAlign: "center", color: "black" },
                                                            ]}
                                                        />
                                                    </View>
                                                </View>


                                                <View style={styles.container2}>
                                                    <View style={styles.part1}>
                                                        <Text style={styles.titulo2} >
                                                            Nivel Tanque
                                                        </Text>
                                                        <Image source={imgDiesel} style={styles.imgMenu} />
                                                        <Tanque onSelect={(selectedItem) => setData({ ...data, Diesel: selectedItem })} />
                                                    </View>
                                                    <View style={styles.part2}>

                                                        <Text style={styles.titulo2}>Odometro (Km)</Text>
                                                        <Image source={imgOdometro} style={styles.imgMenu2} />

                                                        <TextInput
                                                            placeholder="Km odometro"
                                                            onChangeText={(text) => setData({ ...data, odometro: text })}
                                                            value={data.odometro}
                                                            name='odometro'
                                                            style={[
                                                                styles.input,
                                                                { borderWidth: 1, borderColor: "black", textAlign: "center" },
                                                            ]}
                                                        />
                                                    </View>
                                                </View>

                                                <TouchableOpacity style={styles.input2} onPress={guardarViaje}>
                                                    <Text style={styles.title2}>Iniciar Viaje</Text>
                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                    </ScrollView>
                                </View>
                            ) : (
                                <View style={styles.ViewConteo}>
                                    <Text style={styles.mensaje}>"¡Oops! Parece que ya tienes un viaje en progreso. Finalízalo para poder empezar uno nuevo."
                                    </Text>
                                    <Image source={Truck} style={styles.loading} />
                                </View>
                            )}
                        </View>

                    )}
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android",
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },

    ViewConteo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },

    // ViewConteo: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: "white"
    // },

    // mensajeConteo: {
    //     fontSize: 27,
    //     textAlign: "center",
    //     fontStyle: 'italic',
    // },


    loading: {
        width: 290,
        height: 250,
        // padding: 5,
    },

    imgMenu: {
        width: 190,
        height: 110,
        // padding: 5,
    },

    imgMenu2: {
        width: 190,
        height: 140,
        // padding: 5,
    },

    mensaje: {
        fontSize: 27,
        textAlign: "center",
        fontStyle: 'italic',
    },

    operador: {
        paddingTop: 30,
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
        alignItems: 'center',
    },

    part2: {
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontSize: 22,
        textAlign: "center",
    },

    title2: {
        fontSize: 22,
        textAlign: "center",
    },

    titulo2: {
        textAlign: "center",
        fontSize: 18,
        paddingTop: 2,
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
        marginVertical: 15,
        marginBottom: 40,
        width: "35%",
        textAlign: "center",
    },


});


export default TripsMade;