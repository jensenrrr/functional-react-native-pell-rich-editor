import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import Container from "./CustomRich/src/Container";

/*
 */

export default function App() {
  const [custom, setCustom] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{custom ? "Custom" : "Old"}</Text>
      <Button
        onPress={() => setCustom((c) => !c)}
        title={custom ? "Set to old" : "Set to custom"}
      />
      <View
        style={{
          marginTop: 40,
          width: "100%",
          height: 200,
          backgroundColor: "gray",
        }}
      >
        <View style={{ height: 75 }} />
        {custom ? (
          <Container />
        ) : (
          <RichEditor
            editorStyle={{ backgroundColor: "white", color: "black" }}
            placeholder="testing"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
