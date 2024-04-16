import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';


import ListTripsService from "../../services/Login";
import Json from "../../services/Json";
import { Platform } from 'react-native';

async function listTrips(navigation) {
  const id = await SecureStore.getItemAsync('id');
  let datosApi = JSON.stringify(await ListTripsService.listTrips(id));
  let datos = await Json.extraerJson(datosApi);
  // let datos = {"success": "error"}
  if (datos['success'] === 'error') {
    alert("Error al obtener los datos, intente de nuevo por favor.");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home Viajes Realizados' }],
    });
    datos = {"Error":"error"}
    return datos

  } else {

    if(Array.isArray(datos)){
      return datos
    }else{
      alert("Error al obtener los datos, intente de nuevo por favor.");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home Viajes Realizados' }],
      });
    } 
  }


}

const ListTrips = ({ navigation,idOperador, fechaInicio, folioViaje, fechaTermino, diesel, odometro, unidad, estatus }) => (
  <View style={stylesL.tripContainer}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={stylesL.tituloDatos}>Datos Del Viaje</Text>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={stylesL.th}>Fecha Inicio: </Text>
      <Text style={stylesL.th}>{fechaInicio}</Text>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={stylesL.th}>Fecha Termino: </Text>
      <Text style={stylesL.th}>{fechaTermino}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={stylesL.th}>Folio Viaje: </Text>
      <Text style={stylesL.th}>{folioViaje}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={stylesL.th}>Unidad: </Text>
      <Text style={stylesL.th}>{unidad}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={stylesL.th}>Diesel: </Text>
      <Text style={stylesL.th}>{diesel}</Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <Text style={stylesL.th}>Odometro: </Text>
      <Text style={stylesL.th}>{odometro}</Text>
    </View>

    {estatus !== 1 ? (
      <View style={{ flexDirection: 'row' }}>
        <Text style={stylesL.th}>Estatus Viaje: </Text>
        <Text style={stylesL.th}>Terminado</Text>
      </View>
    ) : (
      <View style={{ flexDirection: 'row' }}>
        <Text style={stylesL.th}>Estatus Viaje: </Text>
        <Text style={stylesL.th}>Sin Terminar</Text>
      </View>
    )}

    <View style={{ flexDirection: 'row' }}>
      <Text style={stylesL.th}>Paradas</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Lista Paradas", { valor: [folioViaje, idOperador] }, {navigation: navigation})}
        style={stylesL.thB}
        
      >
        <Text style={stylesL.textBoton}>Ver</Text>
      </TouchableOpacity>
    </View>

  </View>
);

function HomeScreen({ navigation }) {
  useEffect(() => {
    listTrips(navigation).then(userData => {
      setData(userData);
      setLoading(false);
    });

  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <View style={stylesL.container}>
      {loading !== false ? (
        <ActivityIndicator style={stylesL.container} size={120} color={"black"}></ActivityIndicator>
      ) : (
        <View style={stylesL.container}>
          {!data["Error"] ? (
            <ScrollView style={stylesL.content}>
              {data.map((dato, index) => (
                <ListTrips key={`trip-${index}`} navigation={navigation} {...dato} />
              ))}
            </ScrollView>
          ) : (
            <Text style={stylesL.mensaje}>"¡Oops! Parece que no existen viajes realizados."
            </Text>
          )}
        </View> 

      )}
    </View>
  );
}

const stylesL = StyleSheet.create({
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
    fontSize: 27,
    textAlign: "center",
    fontStyle: 'italic',
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
});

export default HomeScreen;