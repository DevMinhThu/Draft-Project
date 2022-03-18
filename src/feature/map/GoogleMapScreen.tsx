import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMapScreen = () => {
    const latitude = 21.0176406;
    const longitude = 105.778807;
    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker coordinate={{ latitude, longitude }} />
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default GoogleMapScreen;
