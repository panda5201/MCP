import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPostComments, getPostDetail, getUserDetail } from "../services/api";

export default function PostDetail() {
  const { id, userId } = useLocalSearchParams<{ id: string; userId: string }>();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      Promise.all([
        getPostDetail(Number(id)),
        getUserDetail(Number(userId)),
        getPostComments(Number(id))
      ])
      .then(([postRes, userRes, commentRes]) => {
        setPost(postRes.data);
        setUser(userRes.data);
        setComments(commentRes.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>
      
      <View style={styles.userSection}>
        <Text style={styles.sectionTitle}>Post Created By:</Text>
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Comments ({comments.length}):</Text>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <Text style={styles.commentEmail}>{comment.email}</Text>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  body: { marginVertical: 15, fontSize: 16, lineHeight: 22, color: '#444' },
  userSection: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  commentSection: { marginTop: 25 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#333' },
  commentCard: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' },
  commentEmail: { fontWeight: 'bold', color: '#007AFF', marginBottom: 4 },
  commentBody: { color: '#555' }
});