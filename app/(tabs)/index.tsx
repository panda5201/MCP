import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveImage = async () => {
  if (!image) {
    Alert.alert("Error", "Tidak ada gambar untuk disimpan");
    return;
  }

  try {
    // Meminta izin media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Gagal menyimpan karena tidak ada izin galeri.");
      return;
    }

    await MediaLibrary.saveToLibraryAsync(image);
    
    Alert.alert("Success", "Gambar berhasil disimpan ke Galeri!");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Gagal menyimpan gambar. Cek kembali izin aplikasi di pengaturan HP.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vinson Gautama - 00000092237</Text>
      
      <View style={styles.button}>
        <Button title="OPEN CAMERA" onPress={openCamera} />
      </View>
      
      <View style={styles.button}>
        <Button title="OPEN GALLERY" onPress={openGallery} />
      </View>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={[styles.button, { marginTop: 10 }]}>
            <Button title="SAVE IMAGE" color="green" onPress={saveImage} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: '#fff' 
  },
  text: { 
    marginBottom: 20, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  button: { 
    marginVertical: 5, 
    width: 200 
  },
  image: { 
    width: 300, 
    height: 300, 
    marginTop: 20, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
});