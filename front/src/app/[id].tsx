import React, { useContext } from "react";
import { View, Text } from "../components/Themed";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ObjectsContextProvider, {
  ObjectsContext,
} from "../components/contexts/ObjectsContextProvider";

export default function ObjectFullScreen() {
  const { id } = useLocalSearchParams();
  const { objects } = useContext(ObjectsContext);
  const thisObject = objects.filter((item) => item.name == id)[0];

  const initialRegion = {
    latitude: thisObject.lat,
    longitude: thisObject.lon,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const defaultObjectImg =
    "https://holycrosspandithittaedu.com/uploads/products/default.jpg";

  return (
    <View style={styles.infoWrapper}>
      {/* <Text>this is fullscreen: {thisObject.name}</Text> */}
      <View style={[{ alignItems: "center", alignSelf: "center" }]}>
        <Image
          style={styles.image}
          source={{ uri: thisObject.img || defaultObjectImg }}
        />
        <Text style={styles.name}> {thisObject.name}</Text>
        <Text>{thisObject.address}</Text>
        {thisObject.openinghours.map((hour) => (
          <Text style={styles.hours}>{hour}</Text>
        ))}
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker
          coordinate={{ latitude: thisObject.lat, longitude: thisObject.lon }}
          title={thisObject.name}
          description={thisObject.address}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: "white",
    marginBottom: 10,
    width: "98%",
    flex: 1,
    aspectRatio: 3,
    alignSelf: "center",
    borderRadius: 5, // Zakrąglenie narożników
    shadowColor: "#001", // Kolor cienia
    shadowOffset: { width: 0, height: 1 }, // Przesunięcie cienia (poziomo, pionowo)
    shadowOpacity: 0.4, // Przezroczystość cienia
    shadowRadius: 2, // Promień cienia
    elevation: 5, // Podniesienie dla Androida
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoWrapper: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 500,
    height: 200,
    margin: 10,
  },
  map: {
    width: "95%",
    height: "50%",
    alignSelf: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  hours: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    alignSelf: "center",
  },
  address: {
    fontFamily: "coursive",
    fontStyle: "italic",
    fontSize: 14,
    alignSelf: "center",
  },
});
