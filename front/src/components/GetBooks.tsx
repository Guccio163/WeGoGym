import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function getBooks() {
  const [books, setBooks] = useState<string>("");

  useEffect(() => {
    // var xd = fetch("http://127.0.0.1:8000/polls");
    fetch("http://127.0.0.1:8000/addpoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // inne nagłówki, jeśli są potrzebne
      },
      body: JSON.stringify({
        key: "value", // dane do przesłania
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // otrzymane dane z serwera
      })
      .catch((error) => {
        console.error("Błąd:", error);
      });
    // console.log(xd);
    // setBooks(xd)
  }, []);

  const addPoll = () => {
    var xd = fetch("http://127.0.0.1:8000/addpoll");
  };

  return (
    <View>
      <Text>getBooks</Text>
      {books}
    </View>
  );
}
