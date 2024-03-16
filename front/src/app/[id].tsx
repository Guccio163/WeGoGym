import React, { useContext } from "react";
import { View, Text } from "../components/Themed";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ObjectsContextProvider, { ObjectsContext } from "../components/contexts/ObjectsContextProvider";

export default function ObjectFullScreen() {
    const initialRegion = {
      latitude: 50.04856324934265,
      longitude: 19.96527798594424,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    const {id} = useLocalSearchParams();
    const {objects} = useContext(ObjectsContext);
    // zmienić odsiewanie obiektów
    const thisObject = objects.filter(
      (item) => item.name == id
    )[0];

  return (
      <View>
        <Text>
          this is fullscreen: {thisObject.name}
        </Text>
        <View></View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          showsUserLocation
          showsMyLocationButton
        />
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
  },
  infoWrapper: {
    backgroundColor: "grey",
    flex: 1,
    marginVertical: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  map: {
    width: "95%",
    height: "50%",
    alignSelf: "center",
  },
});