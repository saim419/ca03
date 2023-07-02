import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from './Button';

export default function Dictionary({ savedPhoto }) {
    const [description, setDescription] = useState('');
    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const handleUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.canceled) { // Update "cancelled" to "cancelled"
            const { assets } = pickerResult;
            if (assets.length > 0) {
                const { uri } = assets[0];
                setUploadedPhoto(uri); // Update the state directly with the uri
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
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
                onChangeText={text => setDescription(text)}
                multiline
            />

            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save button pressed')}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    // Existing styles...

    uploadButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
