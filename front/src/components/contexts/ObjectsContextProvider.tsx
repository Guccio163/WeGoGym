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
};

export default function ObjectsContextProvider({
  children,
}: PropsWithChildren) {
  const [objects, setObjects] = useState([
    { name: "xd1", img: "", address: "69", rate: 4.3 },
  ]);

  const fetchSportsObjects = async () => {
    // CHANGE LINK
    try {
      var data = await fetch("https://jsonplaceholder.typicode.com/users");
      console.log(data.status);
      var obj = await data.json();
      var objectsArr: SportObject[] = [];
      obj.forEach((element: { [x: string]: any }) => {
        objectsArr.push({
          name: element["name"],
          img: "",
          address: element["address"]["geo"]["lat"],
          rate: 4.3,
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
    },
    { name: "xd2", img: "", address: "69", rate: 4.3 },
  ],
});
