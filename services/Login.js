import axios from 'axios';
const url = 'https://tracing.romidamx.com/appOperador/apiApp.php';
const login = async credentials => {
    const { data } = await axios.post(url, credentials);
    return data
}

const listTrips = async credentials => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?ListTrips="+ credentials;
    const { data } = await axios.get(url);
    return data
}


const sendData = async credentials => {
    const lat = credentials.coords.latitude;
    const lon = credentials.coords.longitude;
    const speed = credentials.coords.speed;
    const altitud = credentials.coords.altitude;
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?insertValue=" + lat + "&lon=" + lon + "&speed=" + speed + "&altitud=" + altitud;
    const { data } = await axios.get(url);
    return data;
}

const bringUnits = async () => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?Unidades";
    const { data } = await axios.get(url);
    return data
}

const Diesel = async (credentials) => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?DieselValue=" + credentials;
    const { data } = await axios.get(url);
    return data
}

const insertViaje = async (credentials, diesel) => {
    console.log(diesel);
    let idOperador = credentials.idOperador;
    let idUnidad = credentials.unidad.id;
    let Folio = credentials.folio;
    let Diesel = credentials.Diesel;
    let Odometro = credentials.odometro;
    let localizacion = credentials.localizacion;
    let DieselLitros = diesel;

    const datos = "&idOperador=" + idOperador + "&idUnidad=" + idUnidad + "&folio=" + Folio + "&diesel=" + Diesel + "&odometro=" + Odometro + "&localizacion=" + localizacion + "&dieselLitros=" + DieselLitros;
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?insertViaje=1" + datos;
    const { data } = await axios.get(url);
    return data
    
}

//Traer folios
const Folios = async (credentials) => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?folios=" + credentials;
    const { data } = await axios.get(url);
    return data
}

//Tipos De Paradas
const Paradas = async () => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?paradas=1";
    const { data } = await axios.get(url);
    return data
}

const insertParadas = async (credentials) => {
    let Folio = credentials.folio;
    let idOperador = credentials.idOperador;
    let Diesel = credentials.diesel;
    let lat = credentials.latitud;
    let lng = credentials.longitud;
    let localizacion = [lat,lng];
    let hora = credentials.hora.hora;
    let parada = credentials.parada.tipoParada; 
    const datos = "&folio=" + Folio + "&idOperador=" + idOperador + "&diesel=" + Diesel + "&localizacion=" + localizacion + "&hora=" + hora + "&parada=" + parada;
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?insertParadas=1" + datos;
    const { data } = await axios.get(url);
    return data
}


//Traer Paradas
const getParadas = async (credentials) => {
    let folio = credentials[0];
    let idOperador = credentials[1];
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?getParadas=" + folio + "&idOperador=" + idOperador;
    const { data } = await axios.get(url); 
    return data
}

//Traer Paradas
const TerminarViaje = async (credentials) => {
    let Folio = credentials.folio;
    let idOperador = credentials.idOperador;
    let localizacion = credentials.localizacion;
    let Diesel = credentials.diesel;
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?terminarViaje=" + Folio + "&idOperador=" + idOperador + "&localizacion=" + localizacion + "&diesel=" + Diesel;
    const { data } = await axios.get(url);
    return data
}

//Traer Paradas
const getViajesFecha = async (credentials) => {
    let idOperador = credentials[0].id
    let fecha = credentials[0].fecha
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?viajesFecha=" + idOperador + "&fecha=" + fecha;
    const { data } = await axios.get(url);
    return data
}

const TraerCoordenadas = async (credentials) => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?coordenadas="+ credentials;
    const { data } = await axios.get(url);
    return data
}

const ViajeActivo = async (credentials) => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?ViajeActivo="+ credentials;
    const { data } = await axios.get(url);
    return data
}

const conteoFolio = async (credentials) => {
    const url = "https://tracing.romidamx.com/appOperador/apiOperador.php?conteoFolio="+ credentials;
    const { data } = await axios.get(url);
    return data
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