import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { createHTML } from "./RichEditor/editor";

const Container = () => {
  const html = createHTML({ color: "black" });
  const webView = React.useRef<WebView>(null);

  const x = '{"type":"content","name":"setPlaceholder","data":"testingCustom"}';

  const init = () => {
    if (webView && webView.current) {
      webView.current.postMessage(x);
    }
  };

  return (
    <View style={{ height: 50 }}>
      <WebView
        ref={webView}
        scrollEnabled={false}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={["*"]}
        dataDetectorTypes={"none"}
        domStorageEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        source={{ html }}
        onLoad={init}
      />
    </View>
  );
};

export default Container;
