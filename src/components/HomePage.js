import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Dictionary from './Dictionary';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const HomePage = ({ navigation }) => {
    const goToCameraApp = () => {
        navigation.navigate('CameraApp');
    };
    const goToMeMo = () => {
        navigation.navigate('Dictionary');
    };

    const [isFontsLoaded, setIsFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            // Remove the 'San Francisco' font from the Font.loadAsync() function
            // No need to load it if you want to remove it
            setIsFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!isFontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to MeMo</Text>
            <TouchableOpacity style={styles.button} onPress={goToCameraApp}>
                <Text style={styles.buttonText}>Go to Camera App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToMeMo}>
                <Text style={styles.buttonText}>Memories</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46579b',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default HomePage;
