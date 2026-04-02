import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function Profile() {
  const { name, email, photo } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Avatar.Image size={100} source={{ uri: photo as string }} />
      <Text variant="titleLarge">{name}</Text>
      <Text>{email}</Text>
    </View>
  );
}