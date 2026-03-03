import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default styles;