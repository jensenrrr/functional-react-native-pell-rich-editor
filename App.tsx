import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import Container from "./CustomRich/src/Container";

export default function App() {
  const [custom, setCustom] = useState(true);
  const [focus, setFocus] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Pressable
        style={{
          height: 200,
          width: 200,
          marginBottom: 100,
          backgroundColor: "#FFF0FD",
        }}
        onPress={() => {
          setFocus(false);
        }}
      >
        <StatusBar style="auto" />
        <Text>{custom ? "Custom" : "Old"}</Text>
        <Button
          onPress={(e) => {
            e.preventDefault();
            setCustom((c) => !c);
          }}
          title={custom ? "Set to old" : "Set to custom"}
        />
      </Pressable>
      <View
        style={{
          backgroundColor: "#C7C7C7",
          paddingBottom: focus ? 0 : 40,
          width: "100%",
        }}
      >
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
    backgroundColor: "#DADADA",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
