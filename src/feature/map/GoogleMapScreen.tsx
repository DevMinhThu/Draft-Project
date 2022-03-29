import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMapScreen = () => {
    const latitude = 21.0176406;
    const longitude = 105.778807;
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
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
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMapScreen;
