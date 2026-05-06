import { Dimensions, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, UrlTile } from "react-native-maps";

const { height } = Dimensions.get("window");

type Props = {
  region: any;
  location: { latitude: number; longitude: number };
  onMapPress: (e: MapPressEvent) => void;
  onMarkerDragEnd: (e: any) => void;
};

export default function PlatformMap({
  region,
  location,
  onMapPress,
  onMarkerDragEnd,
}: Props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      region={region}
      onPress={onMapPress}
    >
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
      />
      <Marker
        coordinate={location}
        title="My Location"
        draggable
        onDragEnd={onMarkerDragEnd}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: height * 0.6,
    width: "100%",
  },
});