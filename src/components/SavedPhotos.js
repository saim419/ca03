import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';


const SavedPhotos = ({ savedPhotos }) => {
    if (!savedPhotos || savedPhotos.length === 0) {
        return null; // or display a placeholder message
    }

    return (
        <View style={styles.savedPhotosContainer}>
            {savedPhotos.map((photo) => (
                <TouchableOpacity key={photo.id} style={styles.savedPhotoContainer}>
                    <Image source={{ uri: photo.photoUri }} style={styles.savedPhoto} resizeMode="cover" />

                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    savedPhotosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    savedPhotoContainer: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    savedPhoto: {
        width: '100%',
        height: '100%',
    },
});

export default SavedPhotos;
