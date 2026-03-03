import { ScrollView, View } from "react-native";
import {
    Avatar,
    Button,
    Card,
    FAB,
    Text
} from "react-native-paper";
import styles from "../../styles/AppStyles";
import users from "../data.json";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text variant="headlineMedium" style={styles.title}>
          User List
        </Text>

        {users.map((user, index) => (
          <Card key={index} style={styles.card} mode="elevated">
            <Card.Content style={styles.cardContent}>
              
              <Avatar.Image
                size={70}
                source={{ uri: user.photo_url }}
              />

              <View style={styles.textContainer}>
                <Text variant="titleMedium" style={styles.name}>
                  {user.name}
                </Text>
                <Text variant="bodyMedium">
                  {user.email}
                </Text>

                <Button 
                  mode="contained" 
                  style={{ marginTop: 8 }}
                >
                  View Profile
                </Button>
              </View>

            </Card.Content>
          </Card>
        ))}

      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("FAB pressed")}
      />
    </View>
  );
}