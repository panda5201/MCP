import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPosts } from "../../services/api";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    getPosts()
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((err) => console.log("Error fetch posts:", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MNCP News Feed</Text>
        <Button 
          title="Add New Post" 
          onPress={() => router.push("/addPost")} 
        />
      </View>

      <ScrollView style={{ width: '100%' }}>
        {posts.map((post) => (
          <Pressable
            key={post.id}
            style={styles.postCard}
            onPress={() => router.push({
              pathname: "/postDetail",
              params: { id: post.id, userId: post.userId }
            })}
          >
            <Text style={styles.postNumber}>Post Number: {post.id}</Text>
            <Text style={styles.postTitle}>Title: {post.title}</Text>
            <Text style={styles.postBody} numberOfLines={2}>Body: {post.body}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  postCard: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  postNumber: { fontWeight: 'bold', color: '#888' },
  postTitle: { fontWeight: 'bold', fontSize: 16, marginVertical: 4 },
  postBody: { color: '#666' }
});