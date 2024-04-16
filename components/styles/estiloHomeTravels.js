import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const stylesL = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android" && 50,
    },

    

    body: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        // marginTop: 50,
    },

    bodyA: {
        flex: 1,
        alignItems: "center",
    },

    bodyB: {
        flex: 1,
        alignItems: "center",
    },

    title: {
        marginTop: 20,
        fontWeight: "600",
        letterSpacing: 0.5,
        fontSize: 45,
        textAlign: "center",
        // fontFamily: 'AnticDidone'
    },

    imgMenu: {
        flex: 1,
        width: 400,
        height: 300,
    },

    imgMenuP: {
        display: "none",
    },

    tituloTermino: {
        fontSize: 25,
        marginVertical: 15,
    },

    subtituloTermino: {
        fontSize: 18,
        marginVertical: 15,
    },

    boton: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    boton2: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    boton3: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    textBoton: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
        // fontFamily: 'Calistoga',
    },

});

export const stylesP = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === "android",
    },
      
    body: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: 50,
    },

    bodyA: {
        flex: 1,
        alignItems: "center",
        display: "none"
    },

    bodyB: {
        flex: 1,
        alignItems: "center",
    },

    title: {
        marginTop: 40,
        fontWeight: "600",
        letterSpacing: 0.5,
        fontSize: 45,
        textAlign: "center",
        // fontFamily: 'AnticDidone'
    },

    imgMenu: {
        display: "none",
    },

    imgMenuP: {
        flex: 1,
        width: 370,
        height: 300,
    },

    boton: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    boton2: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    boton3: {
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "transparent",
        padding: 10,
        marginTop: 30,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
    },

    textBoton: {
        fontSize: 20,
        textAlign: "center",
        color: "black",
        // fontFamily: 'Calistoga',
    },
});