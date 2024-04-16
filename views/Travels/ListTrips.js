import React from "react";
import { View, Text } from 'react-native';


function ListTrips(props) {
    const trips = props.tripData;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {trips.map(trip => (
          <Text>{trip.name}</Text>
        ))} 
      
      </View>
    );
  }
export default ListTrips;