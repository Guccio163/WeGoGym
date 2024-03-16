import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import GetLocation from "react-native-get-location";

export default function Categories() {
  const [books, setBooks] = useState<string>("");

  // useEffect(() => {
  //   // var xd = fetch("http://127.0.0.1:8000/polls");
  //   fetch("http://127.0.0.1:8000/addpoll", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // inne nagłówki, jeśli są potrzebne
  //     },
  //     body: JSON.stringify({
  //       key: "value", // dane do przesłania
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data); // otrzymane dane z serwera
  //     })
  //     .catch((error) => {
  //       console.error("Błąd:", error);
  //     });
  //   // console.log(xd);
  //   // setBooks(xd)
  // }, []);

  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  return (
    <View>
      <Button title="xd" onPress={getLocation}/>
    </View>
  );
}
