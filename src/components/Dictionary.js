import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import SavedPhotos from './SavedPhotos';

const Dictionary = ({ savedPhoto }) => {
    const [description, setDescription] = useState('');
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const [savedPhotos, setSavedPhotos] = useState([]);

    useEffect(() => {
        // Load saved photos from AsyncStorage
        loadSavedPhotos();
    }, []);

    const loadSavedPhotos = async () => {
        try {
            const photos = await AsyncStorage.getItem('savedPhotos');
            if (photos) {
                setSavedPhotos(JSON.parse(photos));
            }
        } catch (error) {
            console.log('Error loading saved photos:', error);
        }
    };

    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled) {
            const { uri } = pickerResult;
            setUploadedPhoto(uri);
        }
    };

    const handleSave = async () => {
        if (uploadedPhoto) {
            const photo = {
                id: new Date().getTime().toString(),
                photoUri: uploadedPhoto,
                description: description,
            };

            try {
                const updatedPhotos = [...savedPhotos, photo];
                await AsyncStorage.setItem('savedPhotos', JSON.stringify(updatedPhotos));
                setSavedPhotos(updatedPhotos);
                console.log('Photo saved successfully');
                // Clear the uploaded photo and description after saving
                setUploadedPhoto(null);
                setDescription('');
            } catch (error) {
                console.log('Error saving photo:', error);
            }
        } else {
            alert('Please select a photo to save.');
        }
    };

    SplashScreen.preventAutoHideAsync();

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    {uploadedPhoto ? (
                        <Image source={{ uri: uploadedPhoto }} style={styles.photo} resizeMode="cover" />
                    ) : (
                        <Image source={{ uri: savedPhoto }} style={styles.photo} resizeMode="cover" />
                    )}
                </View>

                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Add a description..."
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                />

                <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <SavedPhotos savedPhotos={savedPhotos} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF8585',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        aspectRatio: 4 / 3,
        borderRadius: 20,
        overflow: 'hidden',
    },
    descriptionInput: {
        width: '80%',
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    uploadButton: {
        backgroundColor: '#FF8585',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: '#FF8585',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    photo: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
});

export default Dictionary;
