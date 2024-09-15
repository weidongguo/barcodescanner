import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LastScanResultView = (() => {
  let lastScanResult = null

  return ({data, style}) => {
    const result = data ?? lastScanResult;

    lastScanResult = result;

    return (
      <View style={[styles.container, style]}>
        <Text style={[styles.text, styles.header]}>Last scanned result</Text>
        <Text style={styles.text}>{result}</Text>
      </View>
    );
  };
})();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'yellow',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default LastScanResultView;