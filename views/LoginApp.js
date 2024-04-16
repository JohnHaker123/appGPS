import React from "react";
import { useState } from "react";
import { Dimensions, Keyboard, View, Text, TouchableOpacity, TextInput, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import useOrientation from '../hooks/useOrientation';
import { stylesL, stylesP } from '../components/styles/estilosLogin'; //Estilos
import loginService from '../services/Login';
import Json from '../services/Json';
import { Movil } from "../hooks/LockOrientation";

import * as SecureStore from 'expo-secure-store';

const fondo = require('../img/fondo.png');
const iOperador = require('../img/operador.png');


const { height, width } = Dimensions.get('window');



const LoginView = () => {
    const navigation = useNavigation();
    const orientacion = useOrientation();
    if (height <= 800 && width <= 400) {
        if (orientacion == 'PORTRAIT') {
            if (v == 0) {
                Movil();
                v++;
            }
        }
    }

    const [data, setData] = useState({
        user: '',
        pass: '',
    });

    const [loginLoader, setLoginLoader] = useState(false);

    const [borderColor, setBorderColor] = useState("#00000020");
    const [borderColor2, setBorderColor2] = useState("#00000020");
    const [errorMessage, setErrorMessage] = useState(false);
    const [inputs, setInputs] = useState(false);
    const [Message, setMessage] = useState("");

    const handleSubmit = async () => {
        Keyboard.dismiss();
        setData("");
        if (!data.user || !data.pass) {
            setMessage("Por favor, completa todos los campos.");
            setErrorMessage(true);
            setInputs(true);
            setTimeout(() => {
                setErrorMessage(false);
                setInputs(false);
            }, 3000);
            return;
        } else {
            setLoginLoader(true);
            try {
                let datos = JSON.stringify(await loginService.login(data))
                let user = await Json.extraerJson(`${datos}`);
                if (user['success'] === 'error') {
                    setMessage("Error En Las Credenciales..!");
                    setErrorMessage(true);
                    setLoginLoader(false);
                    setInputs(true);
                    setTimeout(() => {
                        setErrorMessage(false);
                        setInputs(false);
                    }, 3000);
                    return;
                } else {
                    
                    let userId = user[0]['id'];
                    let userName = user[0]['user'];
                    let nameOperador = user[0]['nombre'];
                    await SecureStore.setItemAsync('id',`${userId}`);
                    await SecureStore.setItemAsync('User',`${userName}`);
                    await SecureStore.setItemAsync('nombreOperador',`${nameOperador}`);

                    await SecureStore.setItemAsync('Unidades','');
                    await SecureStore.setItemAsync('tipoParadas','');
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    }, 2000);
                }
            } catch (error) {
                error("Error");
            }
        }
    };

    const estilos = orientacion == 'LANDSCAPE' ? stylesL : stylesP;

    return (
        <View style={[estilos.container, { flexDirection: 'row-reverse' }]}>
            {loginLoader !== false ? (
                <ActivityIndicator style={stylesL.container} size={120} color={"black"}></ActivityIndicator>
            ) : (

                <ImageBackground source={fondo} resizeMode="cover" style={estilos.img}>
                    <View style={estilos.vista1}>
                        <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgOperador}></ImageBackground>
                    </View>
                    <View style={estilos.vista2}>

                        <Text style={[estilos.title, { marginBottom: 20, marginTop: 100 }]}>Login Operador</Text>
                        <View style={estilos.inputs}>
                            <Text style={estilos.description}>
                                Por favor, proporcione la credencial de inicio de sesión para continuar y tener acceso a todos nuestros servicios.
                            </Text>
                        </View>

                        {errorMessage &&
                            // <LoginAlert style={estilos.alert} alertMessage={Message} />
                            <View style={estilos.inputs}>
                            <Text style={estilos.alert}>{Message}</Text>
                            </View>

                        }
                        <ScrollView>
                        {inputs !== true ? (
                            <View style={estilos.inputs}>
                                <Text style={estilos.subtitulo}>
                                    Usuario
                                </Text>
                                <TextInput
                                    placeholder="Usuario"
                                    onChangeText={(text) => setData({ ...data, user: text })}
                                    value={data.user}
                                    name='user'
                                    style={[
                                        estilos.input,
                                        { borderWidth: 3, borderColor: borderColor },
                                    ]}
                                />
                                <Text style={estilos.subtitulo}>
                                    Password
                                </Text>
                                <TextInput
                                    secureTextEntry
                                    placeholder="Password"
                                    onChangeText={(text) => setData({ ...data, pass: text })}
                                    value={data.pass}
                                    style={[
                                        estilos.input,
                                        { borderWidth: 3, borderColor: borderColor2 },
                                    ]}
                                />
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={estilos.boton}
                                >
                                    <Text style={estilos.textBoton}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (<Text></Text>)}
                        </ScrollView>
                        <ImageBackground source={iOperador} resizeMode="cover" style={estilos.imgOperadorP}></ImageBackground>

                    </View>
                </ImageBackground>
            )}
        </View>

        

    );
}
export default LoginView;