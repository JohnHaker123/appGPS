import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const HomeView = () => {
    const navigation = useNavigation();

    return (
        <View
        style={{
            flex: 1,
            paddingHorizontal: 15, 
            paddingTop: Platform.OS === "android", 
          }}
        >
            <Text
                StyleSheet={{ 
                    fontSize: 30,
                    textAling: "center",
                    marginTop: "20%"
                 }}
            >Home View</Text>

            <TouchableOpacity
            onPress={() => navigation.navigate("Stack")}
                style={{
                    backgroundColor: "purple",
                    padding: 10,
                    marginTop: "20%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        textAlign: "center",
                        color: "white",
                    }}
                >Go To Stack View</Text>
            </TouchableOpacity>

        </View>
    );
}

export default HomeView;