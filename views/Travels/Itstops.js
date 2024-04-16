import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import useOrientation from '../../hooks/useOrientation';
import { Movil } from "../../hooks/LockOrientation";

import { stylesL, stylesP } from '../../components/styles/estiloHomeTravels';

import loginService from '../../services/Login';
import Json from '../../services/Json';
import { Platform } from 'react-native';

async function datosParadas(folio, navigation) {
  let datosApi = JSON.stringify(await loginService.getParadas(folio));
  let datos = await Json.extraerJson(datosApi);
  // let datos = {"success":"error"}

   if (datos['success'] === "error") {
    alert("Error al obtener los datos, intente de nuevo por favor.");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home Viajes Realizados' }],
    });
    datos = { "Error": "error" }
    return datos
  } if(datos['Error'] === "error"){
    return datos;
  }else {
    return datos;
  }

}

const Paradas = ({ fecha, folio, tiempoEstimado, tipoParada }) => (
  <View style={styles.tripContainer}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={styles.tituloDatos}>Datos de las paradas realizadas.</Text>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={styles.th}>Folio Del Viaje: </Text>
      <Text style={styles.th}>{folio}</Text>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={styles.th}>Fecha: </Text>
      <Text style={styles.th}>{fecha}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.th}>Tiempo Estimado De La Parada : </Text>
      <Text style={styles.th}>{tiempoEstimado}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.th}>Tipo Parada: </Text>
      <Text style={styles.th}>{tipoParada}</Text>
    </View>

  </View>
);

function ItStops({ route, navigation }) {
  const { valor } = route.params;
  Movil();
  const orientacion = useOrientation();
  const estilos = orientacion == 'LANDSCAPE' ? stylesL : stylesP;

  useEffect(() => {
    datosParadas(valor, navigation).then(userData => {
      setData(userData);
      setLoading(false);
    });
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <View style={styles.container}>
      {loading !== false ? (
        <ActivityIndicator style={styles.container} size={120} color={"black"}></ActivityIndicator>
      ) : (
        <View style={styles.container}>
          {data['Error'] === 'error' ? (
            <Text style={styles.mensaje}>No Existen Paradas Realizadas En Este Viaje</Text>
          ) : (
            <ScrollView style={stylesL.content}>
              {data.map((dato, index) => (
                <Paradas key={`trip-${index}`} {...dato} />
              ))}
            </ScrollView>
          )}
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

  boton: {
    backgroundColor: "purple",
    padding: 10,
    marginTop: "20%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
  },

  textBoton: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },

  mensaje: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    alignContent: "center",
  },

  tripContainer: {
    margin: 10,
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
});


export default ItStops;