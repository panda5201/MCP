import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  card: {
    borderRadius: 16,
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
  button: {
    marginTop: 10,
    borderRadius: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default styles;