import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { postData } from "../services/api";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!title || !body) {
      Alert.alert("Error", "Semua kolom harus diisi");
      return;
    }

    const payload = { title, body, userId: 1 };
    
    postData(payload)
      .then((res) => {
        if (res.status === 201) {
          Alert.alert("Sukses", "Post berhasil ditambahkan!");
          console.log("Response Data:", res.data);
          router.back(); 
        }
      })
      .catch((err) => Alert.alert("Error", "Gagal mengirim data"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Create New Post</Text>
      <TextInput 
        placeholder="Judul Post" 
        value={title} 
        onChangeText={setTitle} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Isi Post" 
        value={body} 
        onChangeText={setBody} 
        multiline 
        numberOfLines={4}
        style={[styles.input, { height: 100 }]} 
      />
      <View style={{ gap: 10 }}>
        <Button title="Submit Post" onPress={handleSubmit} />
        <Button title="Cancel" color="red" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  label: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, borderColor: '#ccc' }
});