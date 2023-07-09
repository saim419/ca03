import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                This app is about taking pictures and accessing the camera and its library
                to create a memories app that people can see and save in their everyday lives.
                It's a creative way to bring more light to people's lives.
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});
export default AboutPage;
