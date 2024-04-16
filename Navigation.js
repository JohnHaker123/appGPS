import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginApp";


const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Login" 
        >
            <Stack.Screen  
                name="Login"
                component={LoginView}
                options={{
                    headerShown: false,
                }}
            />   

            <Stack.Screen  
                name="Home"
                component={HomeView} 
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );

}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}