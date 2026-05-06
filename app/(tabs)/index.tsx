import PlatformMap from "@/components/PlatformMap";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Region } from "react-native-maps"; // <-- type only, aman di web

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Coordinates | null>(null);

  const getLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied! Please allow location access.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const handleMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const region: Region | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  return (
    <View style={styles.container}>
      {!location ? (
        <View style={styles.center}>
          <Text style={styles.hint}>Tekan tombol untuk mendapatkan lokasi</Text>
          <Button title="Get Geo Location" onPress={getLocation} />
        </View>
      ) : (
        <>
          <PlatformMap
            region={region}
            location={location}
            onMapPress={handleMapPress}
            onMarkerDragEnd={handleMarkerDragEnd}
          />
          <View style={styles.info}>
            <Text style={styles.label}>📍 Koordinat Saat Ini</Text>
            <Text style={styles.coord}>
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coord}>
              Longitude: {location.longitude.toFixed(6)}
            </Text>
            <View style={styles.buttonRow}>
              <Button title="🔄 Refresh Location" onPress={getLocation} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 16 },
  hint: { fontSize: 14, color: "#666", marginBottom: 8, textAlign: "center", paddingHorizontal: 32 },
  info: { flex: 1, padding: 20, backgroundColor: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  label: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 8 },
  coord: { fontSize: 15, color: "#444", marginBottom: 4, fontFamily: "monospace" },
  buttonRow: { marginTop: 16 },
});