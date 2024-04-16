import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const stylesL = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9EF',
        paddingTop: Platform.OS === "android",
    },

    loaderContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        transform: [{ scale: 3 }], // Ajusta el tamaño según tus necesidades
    },

    img: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
    },

    imgOperador: {
        flex: 1,
        width: 400,
        height: 300,
        top: 150,
        marginHorizontal: 100,
    },

    imgOperadorP: {
        display: 'none',
    },

    title: {
        fontWeight: "600",
        letterSpacing: 0.5,
        fontSize: 40,
        textAlign: "center",
        fontStyle: 'italic',
    },
    // R0m1d4Sis

    description: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
        textAlign: "center",
        width: "70%",
    },

    subtitulo: {
        color: "#56636F",
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        marginTop: 10,
        fontStyle: 'italic',

    },

    input: {
        borderWidth: 2,
        borderColor: "#666160",
        padding: 1,
        borderRadius: 15,
        marginVertical: 1,
        width: "60%",
        textAlign: "center",
        backgroundColor: "white",
    },

    boton: {
        borderWidth: 1,
        borderColor: "black",
        alignSelf: "center",
        borderRadius: 15,
        paddingVertical: 5,
        width: "35%",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: '#9cc2e7'

    },

    textBoton: {
        fontSize: 19,
        color: "black",
        fontWeight: "bold",
        fontStyle: 'italic',
    },


    vista1: {
        flex: 1,
    },

    vista2: {
        flex: 1,
        // alignItems: "center",
    },

    inputs: {
        alignItems: "center",
    },

    alert:{
        borderWidth: 1,
        borderColor: "red",
        alignSelf: "center",
        borderRadius: 15,
        paddingVertical: 10,
        width: "65%",
        textAlign: "center",
        justifyContent: "center",
        marginTop: 80,
        fontSize: 18,
        color: "red",
    },

    
});

export const stylesP = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E9EF',
        paddingTop: Platform.OS === "android" && 30,
    },

    img: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row'
    },

    imgOperador: {
        display: 'none',
    },

    imgOperadorP: {
        width: 250,
        height: 250,
        top: 10,
    },

    title: {
        fontWeight: "600",
        letterSpacing: 0.5,
        fontSize: 26,
        textAlign: "center",
        fontStyle: 'italic',
    },

    description: {
        color: "#56636F",
        fontSize: 15,
        fontWeight: "normal",
        width: "100%",
        textAlign: "center",
        width: "80%",
    },

    subtitulo: {
        color: "#56636F",
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        marginTop: 10,
        fontStyle: 'italic',

    },

    input: {
        borderWidth: 3,
        borderColor: "#00000020",
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
        width: "80%",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
    },

    boton: {
        borderWidth: 1,
        borderColor: "black",
        alignSelf: "center",
        borderRadius: 15,
        paddingVertical: 10,
        width: "25%",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: '#9cc2e7'

    },

    textBoton: {
        fontSize: 19,
        color: "black",
        fontWeight: "bold",
        fontStyle: 'italic',
    },

    vista1: {
        display: "none",
        flex: 1,
    },

    vista2: {
        flex: 1,
        alignItems: "center",
    }
});


