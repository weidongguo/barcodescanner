import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export default function BarcodeBoundingBoxView({data, style}) {
  if(!data) {
    return null;
  }

  const bounds = data.bounds ?? data.boundingBox;

  if(!bounds) {
    return null;
  }

  if(Platform.OS == "android") {
    // Experiment tells me that android has width and height flipped, so does x and y in orogin
    // So I'm flipping them back here.
    [bounds.origin.x, bounds.origin.y] = [bounds.origin.y, bounds.origin.x];
    [bounds.size.width, bounds.size.height] = [bounds.size.height, bounds.size.width];
  }

  const { origin, size } = bounds;
  const styles = StyleSheet.create({
    boxStyle: {
      borderWidth: 2,
      borderColor: "yellow",
      width: size.width,
      height: size.height,
    },
    container: {
      position: 'absolute',
      left: origin.x,
      top: origin.y, 
    },
    text: {
      color: "yellow",
      maxWidth: size.width, 
    }
  });

  return (
    <View style={styles.container}>
      <View style={[style, styles.boxStyle]}>
      </View>
      <Text style={styles.text}>{data?.data}</Text>
    </View> 
  )
}