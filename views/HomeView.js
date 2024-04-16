import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import ViajesView from "./viajesView";
import ListaViajes from "./ListaViajes";
// import GPS from "./GPS/GPS";


const Tab = createBottomTabNavigator();

function MyTabs(props) {
    const navigation = useNavigation();

    function Salir() {
        alert("🎉 Adios vuelve pronto");
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }, 2000);
    }

    const hide = props.routeName != "Viajes"

    return (
        <Tab.Navigator
            initialRouteName="Viajes"
            screenOptions={{
                tabBarActiveTintColor: "purple",
            }}
        >

            {/* <Tab.Screen
                name="GPS"
                component={GPS}
                options={{
                    tabBarLabel: "GPS",
                    tabBarIcon: ({ color, size }) => (
                        // <MaterialCommunityIcons name="crossshairs-gps" size={25} color={color} />
                        <MaterialCommunityIcons name="crosshairs-gps" size={25} color={color} />
                    ),
                    headerShown: false,
                }}
            /> */}

            <Tab.Screen
                name="Viajes"
                component={ViajesView}
                options={{
                    tabBarLabel: "Viajes",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="truck-fast-outline" size={25} color={color} />
                    ),
                    headerShown: false,
                }}
            />


            <Tab.Screen
                name="Lista Viajes"
                component={ListaViajes}
                options={{
                    tabBarLabel: "Lista Viajes",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-search-outline" size={25} color={color} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Salir"
                options={{
                    tabBarLabel: "Salir",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cellphone-remove" size={24} color={color} />
                    ),
                    headerShown: false,
                }}
                component={Salir}
            />
        </Tab.Navigator>
    );
}

const HomeView = () => {
    return (
        <MyTabs />
    );
}

export default HomeView;