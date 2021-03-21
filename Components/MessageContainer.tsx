import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  Platform,
  Pressable,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import HTML from "react-native-render-html";
import Messenger from "../CustomRich/src/Messenger";

const MessageContainer = () => {
  const [focus, setFocus] = useState(false);
  const [messageContent, setMessageContent] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const contentWidth = useWindowDimensions().width;

  const sendMessage = (props: any) =>
    setSentMessages((sentMessages) => [...sentMessages, props.message]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Pressable
        style={{
          flexGrow: 1,
          backgroundColor: "#FFF0FD",
        }}
        onPress={() => setFocus(false)}
      >
        <View style={{ marginTop: 200 }}>
          <Text style={{ textAlign: "center" }}>Messages</Text>
          {sentMessages.map((message) => (
            <HTML source={{ html: message }} contentWidth={contentWidth}></HTML>
          ))}
        </View>
      </Pressable>
      <View
        style={{
          backgroundColor: "#C7C7C7",
          paddingBottom: focus ? 0 : 40,
          width: "100%",
        }}
      >
        <Messenger
          focus={focus}
          onChange={(msg: string) => setMessageContent(msg)}
          sendMessage={sendMessage}
          messageContent={messageContent}
          setFocus={setFocus}
          placeholder={"custom testing..."}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADADA",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
});

export default MessageContainer;
