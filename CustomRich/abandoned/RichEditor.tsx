/*
import React, { useRef, useState } from "react";
import { WebView, WebViewProps } from "react-native-webview";
import { actions, messages } from "../src/const";
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { createHTML } from "../src/RichEditor/editor";
import { ImageSourcePropType } from "react-native";
import { RichEditorProps } from "../src/RichEditor/RichEditorProps";

const PlatformIOS = Platform.OS === "ios";

const RichTextEditor: React.FC<RichEditorProps> = (props) => {
  const [html, setHtml] = useState(createHTML({}));
  const [disabledView, setDisabledView] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const onLoad = () => {
    let that = this;
    const {
      initialFocus,
      initialContentHTML,
      placeholder,
      editorInitializedCallback,
      disabled,
    } = props;
    //initialContentHTML && that.setContentHTML(initialContentHTML);
    //placeholder && that.setPlaceholder(placeholder);
    setDisabledView(disabled ? disabled : false);
    if (editorInitializedCallback) editorInitializedCallback();

    // initial request focus
    initialFocus && !disabled && that.focusContentEditor();
    // no visible ?
    that.sendAction(actions.init);
    that.setState({ isInit: true });
  };
  return <View></View>;
};
*/
