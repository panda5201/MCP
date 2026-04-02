import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  FAB,
  Searchbar,
  Text,
} from "react-native-paper";
import styles from "../../styles/AppStyles";
import users from "../data.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const animations = useRef(
    users.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const anims = animations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 200, 
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    );

    Animated.stagger(150, anims).start();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="User List" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Searchbar
          placeholder="Search user..."
          onChangeText={setSearch}
          value={search}
          style={{ marginBottom: 20 }}
        />

        {filteredUsers.map((user, index) => {
          const translateY = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0], 
          });

          return (
            <Animated.View
              key={index}
              style={{
                opacity: animations[index],
                transform: [{ translateY }],
              }}
            >
              <Card
                style={styles.card}
                mode="elevated"
                onPress={() => console.log(user.name)}
              >
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
                      style={styles.button}
                      contentStyle={{ paddingVertical: 6 }}
                      onPress={() => router.push(`/profile?name=${user.name}&email=${user.email}&photo=${user.photo_url}`)}
                    >
                      View Profile
                    </Button>
                  </View>
                </Card.Content>
              </Card>

              <Divider style={{ marginVertical: 10 }} />
            </Animated.View>
          );
        })}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("FAB pressed")}
      />
    </View>
  );
}