import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import Container from "./CustomRich/src/Container";

export default function App() {
  const [custom, setCustom] = useState(true);
  const [focus, setFocus] = useState(true);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable>
        <StatusBar style="auto" />
        <Text>{custom ? "Custom" : "Old"}</Text>
        <Button
          onPress={() => setCustom((c) => !c)}
          title={custom ? "Set to old" : "Set to custom"}
        />
      </Pressable>
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
          <Container
            focus={focus}
            setFocus={setFocus}
            placeholder={"custom testing..."}
          />
        ) : (
          <RichEditor
            autoCapitalize={"on"}
            editorStyle={{ backgroundColor: "white", color: "black" }}
            placeholder="testing"
          />
        )}
      </View>
    </KeyboardAvoidingView>
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
