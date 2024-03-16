import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { View, Text } from "../Themed";
import { SportObject } from "../contexts/ObjectsContextProvider";
import StarRating from "./StarRating";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";


interface Props {
  object: SportObject;
}

export default function ObjectsListItem({ object }: Props) {
  const defaultObjectImg =
    "https://holycrosspandithittaedu.com/uploads/products/default.jpg";

  const initialRegion = {
    latitude: 50.04856324934265,
    longitude: 19.96527798594424,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const getInitialRegion = (lat: number, lon: number) => {
    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  };

  //   const fetchRatings = async () => {
  //     // CHANGE LINK
  //     try {
  //       var data = await fetch("http://127.0.0.1:8000/all_data");
  //       console.log(data.status);
  //       var obj = await data.json();
  //       var objectsArr: SportObject[] = [];
  //       obj["gyms"].forEach((element: { [x: string]: any }) => {
  //         objectsArr.push({
  //           name: element["name"],
  //           img: element["photo"],
  //           address: element["address"],
  //           rate: element["opinion"],
  //           lat: parseFloat(element["latitude"]),
  //           lon: parseFloat(element["longitude"]),
  //           openinghours: [
  //             `monday: ${element["opening hours"]["monday"]}`,
  //             `tuesday: ${element["opening hours"]["tuesday"]}`,
  //             `wednesday: ${element["opening hours"]["wednesday"]}`,
  //             `thursday: ${element["opening hours"]["thursday"]}`,
  //             `friday: ${element["opening hours"]["friday"]}`,
  //             `saturday: ${element["opening hours"]["saturday"]}`,
  //             `sunday: ${element["opening hours"]["sunday"]}`,
  //           ],
  //         });
  //       });
  //       console.log(objectsArr);
  //       setObjects(objectsArr);
  //     } catch (error) {
  //       console.error("Błąd pobierania danych:", error);
  //     }
  //   };

  const navi = useRouter();
  return (
    <Pressable onPress={() => navi.push(`/${object.name}`)}>
      <View style={styles.itemWrapper}>
        <Image
          style={styles.image}
          source={{ uri: object.img || defaultObjectImg }}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{object.name}</Text>
          <Text>{object.address}</Text>
          {/* <Text>ocena: {object.rate}</Text> */}
          <StarRating rating={object.rate} />
          <FontAwesomeIcon icon={faMugSaucer} />

          {/* <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={getInitialRegion(object.lat, object.lon)}
          /> */}
        </View>
      </View>
    </Pressable>
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
    flex: 1,
    marginVertical: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  map: {
    width: "95%",
    height: "55%",
    alignSelf: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
