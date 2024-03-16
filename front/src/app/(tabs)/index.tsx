import { StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import GetBooks from "@/src/components/own/GetBooks";
import { useContext } from "react";
import { ObjectsContext, SportObject } from "@/src/components/contexts/ObjectsContextProvider";
import ObjectsList from "@/src/components/own/ObjectsList";

export default function TabOneScreen() {
  const { objects } = useContext(ObjectsContext);
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Filtry
        </Text>
      </View>
      <ObjectsList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
