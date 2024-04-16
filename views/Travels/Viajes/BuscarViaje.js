import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function BuscarViaje() {
    const [showPicker, setShowPicker] = useState(false);
    const [showFecha, setShowFecha] = useState(false);
    const [fecha, setFecha] = useState(null);

    const navigation = useNavigation();


    const onChange = async (event, selectedDate) => {

        setShowPicker(false);

        const currentDate = selectedDate;
        const fechaFormat = await convertirFecha(currentDate);
        await setFecha(fechaFormat);

        setShowFecha(true);
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const convertirFecha = async (fecha) => {
        const fechaOriginal = fecha;
        const fechaFormateada = new Date(fechaOriginal);

        const año = fechaFormateada.getFullYear();
        const mes = fechaFormateada.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        const dia = fechaFormateada.getDate();

        // Formatear la cadena resultante en el formato "YYYY-MM-DD"
        const newFecha = `${año}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        return newFecha
    }

    const buscarViaje = async () => {
        if (!fecha) {
            alert("❌Favor De Ingresar Una Fecha❌");
        } else {
            setShowFecha(false);
            navigation.navigate("Viajes Por Fecha", { valor: fecha })
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.input2} onPress={showDatepicker}>
                <MaterialCommunityIcons name="calendar" size={24} color="black">
                    <Text style={styles.title2}>Mostrar Calendario</Text>
                </MaterialCommunityIcons>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                    style={styles.input2}
                />
            )}


            {showFecha ? (
                <Text style={styles.fecha} >{fecha}</Text>
            ) : (
                <Text style={styles.fecha} >Asignar Fecha</Text>
            )}
            <TouchableOpacity style={styles.input2} onPress={buscarViaje}>
                <Text style={styles.title2}>Ver Fecha</Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    title2: {
        fontSize: 22,
        textAlign: "center",
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

});
export default BuscarViaje;