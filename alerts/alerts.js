import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LoginAlert = ({alertMessage}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.loginError}>{alertMessage}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" && 50,
    },

    loginError: {
        color: "red",
        fontSize: 17,
        borderWidth: 3, 
        borderColor: 'red',
        borderRadius: 15,
        padding: 10,
    },
});