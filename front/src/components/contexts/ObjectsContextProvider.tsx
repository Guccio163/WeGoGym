import { View, Text, StyleSheet } from "react-native";
import React, {
  Children,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export type SportObject = {
  name: string;
  img: string;
  address: string;
  rate: number;
  lat: number;
  lon: number;
  openinghours: string[];
};

export default function ObjectsContextProvider({
  children,
}: PropsWithChildren) {
  const [objects, setObjects] = useState([
    {
      name: "xd1",
      img: "",
      address: "69",
      rate: 4.3,
      lat: 1,
      lon: 1,
      openinghours: [
        "monday: xd",
        "tuesday: xd",
        "wednesday: xd",
        "thursday: xd",
        "friday: xd",
        "saturday: xd",
        "sunday: xd",
      ],
    },
  ]);

  const fetchSportsObjects = async () => {
    // CHANGE LINK
    try {
      var data = await fetch("http://127.0.0.1:8000/all_data");
      console.log(data.status);
      var obj = await data.json();
      var objectsArr: SportObject[] = [];
      obj["gyms"].forEach((element: { [x: string]: any }) => {
        objectsArr.push({
          name: element["name"],
          img: element["photo"],
          address: element["address"],
          rate: element["opinion"],
          lat: parseFloat(element["latitude"]),
          lon: parseFloat(element["longitude"]),
          openinghours: [
            `monday: ${element["opening hours"]["monday"]}`,
            `tuesday: ${element["opening hours"]["tuesday"]}`,
            `wednesday: ${element["opening hours"]["wednesday"]}`,
            `thursday: ${element["opening hours"]["thursday"]}`,
            `friday: ${element["opening hours"]["friday"]}`,
            `saturday: ${element["opening hours"]["saturday"]}`,
            `sunday: ${element["opening hours"]["sunday"]}`,
          ],
        });
      });
      console.log(objectsArr);
      setObjects(objectsArr);
    } catch (error) {
      console.error("Błąd pobierania danych:", error);
    }
  };

  useEffect(() => {
    fetchSportsObjects();
  }, []);

  return (
    <ObjectsContext.Provider
      value={{
        objects: objects,
      }}
    >
      {children}
    </ObjectsContext.Provider>
  );
}
export const ObjectsContext = createContext({
  objects: [
    {
      name: "xd1",
      img: "",
      address: "69",
      rate: 4.3,
      lat: 0,
      lon: 0,
      openinghours: [
        "monday: xd",
        "tuesday: xd",
        "wednesday: xd",
        "thursday: xd",
        "friday: xd",
        "saturday: xd",
        "sunday: xd",
      ],
    },
    {
      name: "xd2",
      img: "",
      address: "69",
      rate: 4.3,
      lat: 1,
      lon: 1,
      openinghours: [
        "monday: xd",
        "tuesday: xd",
        "wednesday: xd",
        "thursday: xd",
        "friday: xd",
        "saturday: xd",
        "sunday: xd",
      ],
    },
  ],
});
