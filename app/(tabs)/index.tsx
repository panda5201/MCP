import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const profiles = [
  {
    id: 1,
    name: 'Vinson Gautama',
    info: '00000092237',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Teman 1',
    info: '00000000001',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'John Smith',
    info: 'johnsmith@example.com',
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Jane Doe',
    info: 'janedoe@example.com',
    image: 'https://i.pravatar.cc/150?img=4',
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {profiles.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>{item.info}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: 'gray',
  },
});
