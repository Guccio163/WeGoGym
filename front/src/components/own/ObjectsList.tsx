import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  ObjectsContext,
  SportObject,
} from "../contexts/ObjectsContextProvider";
import ObjectsListItem from "./ObjectsListItem";

export default function ObjectsList() {
  const { objects } = useContext(ObjectsContext);
  return (
    <FlatList
      data={objects}
      renderItem={({ item }) => <ObjectsListItem object={item} />}
      style={styles.list}
    >
      <Text>chuj</Text>
    </FlatList>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#FCFBF4",
    width: "100%"
  },
});
