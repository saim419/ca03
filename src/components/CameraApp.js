import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';
import Button from './Button';
// Import the Button component correctly

export default function CameraApp() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const saveMedia = async (media) => {
        if (media) {
            try {
                await MediaLibrary.createAssetAsync(media);
                alert('Media saved!');
                setImage(null);
            } catch (e) {
                console.log(e);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to Camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                {!image && (
                    <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef} />
                )}
                {image && <Image source={{ uri: image }} style={styles.camera} />}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}
                >
                    <Entypo name="retweet" size={28} color="#f1f1f1" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setFlash(
                            flash === Camera.Constants.FlashMode.off
                                ? Camera.Constants.FlashMode.on
                                : Camera.Constants.FlashMode.off
                        );
                    }}
                >
                    <Entypo name="flash" size={28} color="#f1f1f1" />
                </TouchableOpacity>
            </View>

            {image ? (
                <View style={styles.bottomButtonsContainer}>
                    <Button title="Retake" onPress={() => setImage(null)} />
                    <Button title="Save" onPress={() => saveMedia(image)} />
                </View>
            ) : (
                <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                    <View style={styles.captureInnerButton} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
    },
    cameraContainer: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        top: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
    },
    bottomButtonsContainer: {
        position: 'absolute',
        bottom: 40,
        left: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    captureButton: {
        position: 'absolute',
        bottom: 80,
        width: 100,
        height: 100,
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Align button in the bottom center
    },
    captureInnerButton: {
        width: 70, // Increase the size of the inner button
        height: 70, // Increase the size of the inner button
        borderRadius: 35, // Make it slightly bigger
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#fff',
    },
});


