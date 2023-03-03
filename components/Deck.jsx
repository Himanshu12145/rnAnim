import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 550;

const Deck = ({
  data,
  renderDeck,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards,
}) => {
  let ind = 0;
  const [index, setIndex] = useState(0);
  const pos = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log(gesture);
        pos.setValue({ x: gesture.dx, y: gesture.dy });
        // console.log(event);
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  function forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(pos, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeCompletion(direction));
  }
  function onSwipeCompletion(direction) {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    pos.setValue({ x: 0, y: 0 });
    setIndex((ind = ind + 1));
  }
  function resetPosition() {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }
  function getCardStyle() {
    const rotate = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...pos.getLayout(), transform: [{ rotate }] };
  }

  function renderCards() {
    if (index >= data.length) {
      return renderNoMoreCards();
    }
    // console.log(index, data.length);
    return data
      .map((item, i) => {
        if (i < index) {
          return null;
        }
        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle]}
              {...panResponder.panHandlers}
            >
              {renderDeck(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[styles.cardStyle, { top: 10 * (i - index) }]}
            key={item.id}
          >
            {renderDeck(item)}
          </Animated.View>
        );
      })
      .reverse();
  }
  return <View>{renderCards()}</View>;
};

export default Deck;

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
