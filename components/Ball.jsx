import { StyleSheet, View, Animated } from "react-native";
import React from "react";

const Ball = () => {
  const pos = new Animated.ValueXY(0, 0);
  Animated.spring(pos, {
    toValue: { x: 200, y: 500 },
    useNativeDriver: false,
  }).start();
  // console.log(pos.getTranslateTransform());
  return (
    <Animated.View style={pos.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
});
