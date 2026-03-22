import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomTextInput, NIMInput } from './input';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {name ? name : 'Your Name'} - {nim ? nim : 'Your NIM'}
      </Text>

      <CustomTextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <NIMInput
        value={nim}
        onChangeText={setNim}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});