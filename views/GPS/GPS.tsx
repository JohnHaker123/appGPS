import { useEffect, useRef, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAssets } from 'expo-asset';
import * as Location from 'expo-location';

import { WebView } from 'react-native-webview';

const imgWifi = require('../../img/wifi.gif');
const imgGPS = require('../../img/GPS.gif');


const camionRpng = require('../../img/wifi.gif'); 


const GPS = () => {
    const [assets] = useAssets([require('./Map.html')]);
    const [htmlString, setHtmlString] = useState('');
    const webViewRef = useRef(null);
    const dimensions = useWindowDimensions();

    const [coords, setCoords] = useState(null);
    const [altitude, setAltitud] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [isMapVisible, setIsMapVisible] = useState(false);

    useEffect(() => {
        if (assets) {
            fetch(assets[0].localUri || '')
                .then(res => res.text())
                .then(setHtmlString);
        }
    }, [assets]);


    useEffect(() => {

        const obtenerUbicacion = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permiso de ubicación no concedido');
                    return;
                }

                let nuevaUbicacion = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                let lat = nuevaUbicacion.coords.latitude;
                let lng = nuevaUbicacion.coords.longitude;
                let speed = `${nuevaUbicacion.coords.speed}`;
                let alti = `${nuevaUbicacion.coords.altitude}`;
                let datos = [lat, lng];

                var entero = parseInt(speed);
                var altitud = parseInt(alti);
                var velocidad = parseInt(speed);

                sendCoordinatesToWebView(lat, lng, velocidad);
                setSpeed(`${entero}`);
                setAltitud(`${altitud}`);
                setCoords(datos);

            } catch (error) {
            }
        };
        const intervalId = setInterval(obtenerUbicacion, 20000);
        return () => clearInterval(intervalId);
    }, []);




    const sendCoordinatesToWebView = (lat, lng, speed) => {
        const script = `addMarker(${lat}, ${lng}, ${speed}); true;`;
        webViewRef.current?.injectJavaScript(script);
    };

    function mostrarMapa() {
        if (isMapVisible === false) {
            setIsMapVisible(true);
        } else {
            setIsMapVisible(false);
        }
    }
  

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
            {coords !== null ? (
                <View style={styles.body}>
                    <View style={styles.bodyA}>
                        {isMapVisible !== false ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {/* <WebView
                                    ref={webViewRef}
                                    originWhitelist={['*']}
                                    source={{ html: htmlString }}
                                    style={{ width: 740, height: dimensions.height, borderRadius: 15 }}
                                />    */}
                                <Text>Proximamente....</Text>
                            </View>
                        ) : (
                            <Image
                                source={imgGPS}
                                style={styles.Image2}
                            />
                        )}

                    </View>

                    <View style={styles.bodyB}>
                        <View style={styles.body}>
                            <View style={styles.bodyG}>
                                <Text style={styles.titulo2}>Altitud (m)</Text>
                                <TextInput
                                    placeholder=""
                                    value={(altitude !== null ? (altitude) : ("Sin Datos"))}
                                    style={[
                                        styles.input,
                                        { borderWidth: 1, borderColor: "black", textAlign: "center", color: "black" },
                                    ]}
                                    editable={false}
                                />

                            </View>
                        </View>
                        {(isMapVisible ? (
                            <TouchableOpacity
                                onPress={mostrarMapa}
                                style={styles.boton}
                            >
                                <Text style={styles.textBoton}>Ocultar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={mostrarMapa}
                                style={styles.boton}
                            >
                                <Text style={styles.textBoton}>Mostrar</Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={styles.subMapa}>El consumo de datos se vera reflejado si el mapa esta activo</Text>

                        <View style={styles.body}>
                            <Image
                                source={imgWifi}
                                style={styles.Image}
                            />
                        </View>

                    </View>
                </View >
            ) : (
                <View>
                    <ActivityIndicator size={120} color={"black"}></ActivityIndicator>
                    <Text style={styles.mensaje}>Obteniendo Ubicacion.....</Text>
                </View>
            )}
        </View>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },

    markerImage: {
        width: 40,
        height: 40,
    },

    Image: {
        width: 170,
        height: 122,
    },

    Image2: {
        width: 400,
        height: 400,
    },


    body: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
    },

    bodyA: {
        flex: 3,
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#00000020",
        borderRadius: 15,
        justifyContent: "center",
    },

    bodyB: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
    },

    bodyG: {
        flex: 2,
        alignItems: "center",
    },



    mensaje: {
        fontSize: 30,
    },
    titulo2: {
        fontSize: 20,
    },

    tituloMapa: {
        fontSize: 15,
    },

    subMapa: {
        fontSize: 10,
        textAlign: 'center',
    },

    textBoton: {
        fontSize: 15,
        textAlign: 'center',
    },

    input: {
        borderWidth: 2,
        borderColor: "#00000020",
        padding: 5,
        borderRadius: 15,
        marginVertical: 1,
        width: "70%",
        textAlign: "center",
        fontSize: 17,
        // fontSize: 12,
    },

    boton: {
        borderWidth: 2,
        borderColor: "#00000020",
        padding: 5,
        borderRadius: 15,
        width: "70%",
        textAlign: "center",
        fontSize: 22,
    },
});

export default GPS;



