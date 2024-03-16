import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {
  rating: number;
}

interface StarProps {
  filled: boolean;
  half: boolean;
}

const StarRating = ({ rating }: Props) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating - filledStars >= 0.5 ? 1 : 0;

  const renderStar = (index:number) => {
    if (index < filledStars) {
      return <Star filled={true} half={false}/>;
    } else if (index === filledStars && halfStar === 1) {
      return <Star  filled={false} half={true} />;
    } else {
      return <Star filled={false} half={false}/>;
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => renderStar(index))}
    </View>
  );
};

const Star = ({ filled, half }:StarProps) => {
  return (
    <View style={styles.star}>
      {/* {filled && <View style={styles.filledStar} />}
      {half && <View style={styles.halfStar} />} */}
      <Text style={[styles.filledStar, { opacity: filled ? 1 : half ? 0.4 : 0 }]}>★</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    margin: 2,
  },
  filledStar: {
    width: 20,
    height: 20,
    // backgroundColor: "gold",
    color: "gold",
    borderRadius: 10,
  },
  halfStar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 10,
    height: 20,
    color: "gold",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "hidden",
  },
});

export default StarRating;
