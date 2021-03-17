/*
import React from "react";
import { Platform, TextInput } from "react-native";
import {
  WebView,
  WebViewMessageEvent,
  WebViewSource,
} from "react-native-webview";

interface RichWebViewProps {
  onMessage: (event: WebViewMessageEvent) => void;
  viewHtml: string;
  webViewRef: React.RefObject<WebView<{}>>;
}

const RichWebView: React.FC<RichWebViewProps> = ({
  webViewRef,
  onMessage,
  viewHtml,
}) => {
  return (
    <>
      <WebView
        scrollEnabled={false}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        ref={webViewRef}
        onMessage={onMessage}
        originWhitelist={["*"]}
        dataDetectorTypes={"none"}
        domStorageEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        source={{ html: viewHtml }}
        onLoad={that.init}
      />
      {Platform.OS === "android" && (
        <TextInput ref={(ref) => (that._input = ref)} style={styles._input} />
      )}
    </>
  );
};
*/
