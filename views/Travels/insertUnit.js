import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useOrientation from '../../hooks/useOrientation';
import { Movil } from "../../hooks/LockOrientation";
import { stylesL, stylesP } from '../../components/styles/estiloHomeTravels';
import * as SecureStore from 'expo-secure-store';
import loginService from '../../services/Login';
import SelectDropdown from 'react-native-select-dropdown';

async function unidades() {
    const datos = await loginService.bringUnits();
    return datos;
}


const TraerUnidades =  ({ onSelect, unidades }) => {
    return (
        <SelectDropdown
            data={unidades}
            defaultButtonText={'Selecciona La Unidad'}
            defaultValue={'Sin Valor'}
            buttonStyle={styles.BS}
            // onSelect={(selectedItem, index) => {
            //     console.log(selectedItem)}}
            onSelect={(selectedItem, index) => onSelect(selectedItem)}

            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.unidad
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.unidad
            }}
        />
    )
};

function InsertUnit({ navigation }) {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [valores, setValores] = useState(null);

    useEffect(() => {
        unidades().then(valorUnidades => {
            setValores(valorUnidades);
        });
    }, []);

    Movil();
    const orientacion = useOrientation();
    const estilos = orientacion == 'LANDSCAPE' ? stylesL : stylesP;

    const guardarDato = async () => {

        if (selectedUnit === null) {
            alert('No Hay Unidad Seleccionada');
        } else {
            let idUnidad = selectedUnit.id;
            let nameUnidad = selectedUnit.unidad;

            
            await SecureStore.setItemAsync('idUnidad', `${idUnidad}`);
            await SecureStore.setItemAsync('nameUnidad', `${nameUnidad}`);

            alert("✅Unidad agregada correctamente✅");
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeTravel' }],
            });
        }


    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Por favor ingrese la unidad para continuar</Text>
            <TraerUnidades style={styles.styleUnidades} onSelect={(selectedItem) => setSelectedUnit(selectedItem)} unidades={valores}/>
            <TouchableOpacity style={styles.input} onPress={guardarDato}>
                <Text style={styles.title2}>Guardar Unidad</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9EF',
        paddingTop: Platform.OS === "android",
        alignItems: 'center',
    },
    title: {
        marginTop: 200,
        fontSize: 25,
        textAlign: 'center',
    },

    title2: {
        fontSize: 20,
        textAlign: 'center',
    },
    BS: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#444',
        marginTop: 20
    },

    input: {
        borderWidth: 4,
        borderColor: "#00000020",
        padding: 10,
        borderRadius: 15,
        marginVertical: 20,
        width: "80%",
        alignItems: "center",
    },
})
export default InsertUnit;