import axios from 'axios';

const urlEsp = 'http://192.168.4.1/EspTrack';

//Datos Para El Login X
// const login = async credentials => {
//     let user = credentials["user"];
//     let pass = credentials["pass"];
//     const datos = user + "&pass=" + pass;
//     const url = urlEsp + "?login="+ datos;
//     const { data } = await axios.get(url);
//     return data
// }



const login = async credentials => {
    try {
        let user = credentials["user"];
        let pass = credentials["pass"];
        const datos = user + "&pass=" + pass;
        const url = urlEsp + "?login=" + datos;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


//Get Para Traer Los Viajes X
const listTrips = async credentials => {
    try {
        let id = credentials;
        const url = urlEsp + "?ListTrips=" + id;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


const sendData = async credentials => {

    try {
        const lat = credentials.coords.latitude;
        const lon = credentials.coords.longitude;
        const speed = credentials.coords.speed;
        const altitud = credentials.coords.altitude;
        const url = urlEsp + "?insertValue=" + lat + "&lon=" + lon + "&speed=" + speed + "&altitud=" + altitud;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }

}

//Get Para Traer Las Unidas X
const bringUnits = async () => {
    try {
        const url = urlEsp + "?Unidades=1";
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


//Get que trae los datos del diesel X
const Diesel = async (credentials) => {
    try {
        let idUnidad = credentials;
        const url = urlEsp + "?DieselValue=" + idUnidad;
        const { data } = await axios.get(url);
        console.warn(data);
        return data
    } catch (error) {
        console.warn("Ocurrio un error: " + error);
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


//Get Para Insertar Viaje X
const insertViaje = async (credentials, diesel) => {
    try {
        let idOperador = credentials.idOperador;
        let idUnidad = credentials.unidad.id;
        let Folio = credentials.folio;
        let Diesel = credentials.Diesel;
        let Odometro = credentials.odometro;
        let localizacion = credentials.localizacion;
        let DieselLitros = diesel;

        const datos = "&idOperador=" + idOperador + "&idUnidad=" + idUnidad + "&folio=" + Folio + "&diesel=" + Diesel + "&odometro=" + Odometro + "&localizacion=" + localizacion + "&dieselLitros=" + DieselLitros;
        const url = urlEsp + "?insertViaje=1" + datos;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }

}

//Traer folios X
const Folios = async (credentials) => {
    try {
        let id = credentials;
        const url = urlEsp + "?folios=" + id;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Tipos De Paradas X
const Paradas = async () => {
    try {
        const url = urlEsp + "?paradas=1";
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Get Para Insertar Las Paradas X
const insertParadas = async (credentials) => {
    try {
        let Folio = credentials.folio;
        let idOperador = credentials.idOperador;
        let Diesel = credentials.diesel;
        let lat = credentials.latitud;
        let lng = credentials.longitud;
        let localizacion = [lat, lng];
        let hora = credentials.hora.hora;
        let parada = credentials.parada.tipoParada;
        const datos = "&folio=" + Folio + "&idOperador=" + idOperador + "&diesel=" + Diesel + "&localizacion=" + localizacion + "&hora=" + hora + "&parada=" + parada;
        const url = urlEsp + "?insertParadas=1" + datos;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


//Traer Paradas X
const getParadas = async (credentials) => {
    try {
        let folio = credentials[0];
        let idOperador = credentials[1];
        const url = urlEsp + "?getParadas=" + folio + "&idOperador=" + idOperador;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Get Para Terminar El Viaje X
const TerminarViaje = async (credentials) => {
    try {
        let Folio = credentials.folio;
        let idOperador = credentials.idOperador;
        let localizacion = credentials.localizacion;
        let Diesel = credentials.diesel;
        const url = urlEsp + "?terminarViaje=" + Folio + "&idOperador=" + idOperador + "&localizacion=" + localizacion + "&diesel=" + Diesel;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un errors");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Get Para Traer Viajes Por Fecha X
const getViajesFecha = async (credentials) => {
    try {
        let idOperador = credentials[0].id
        let fecha = credentials[0].fecha
        const url = urlEsp + "?viajesFecha=" + idOperador + "&fecha=" + fecha;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un error");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Get para traer coordenadas X
const TraerCoordenadas = async (credentials) => {
    try {
        const url = urlEsp + "?coordenadas=" + credentials;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un error");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

//Get Para Contar si Existe Un Viaje Activo X
const ViajeActivo = async (credentials) => {

    try {
        let id = credentials;
        const url = urlEsp + "?ViajeActivo=" + id;
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error("Ocurrio un error");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}


const conteoFolio = async (credentials) => {
    try {
        const url = urlEsp + "?conteoFolio=" + credentials;
        const { data } = await axios.get(url); 
        return data
    } catch (error) {
        console.error("Ocurrio un error");
        return { success: "error" }; // Lanza el error para que pueda ser manejado por código externo
    }
}

export default {
    login,
    listTrips,
    sendData,
    bringUnits,
    Diesel,
    insertViaje,
    Folios,
    Paradas,
    insertParadas,
    getParadas,
    TerminarViaje,
    getViajesFecha,
    TraerCoordenadas,
    ViajeActivo,
    conteoFolio,
}