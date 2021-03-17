import React, { useEffect, useRef, useState } from "react";
import {
  WebView,
  WebViewMessageEvent,
  WebViewProps,
} from "react-native-webview";
import { actions, messages } from "../const";
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { createHTML } from "./editor";
import { ImageSourcePropType } from "react-native";
import { RichEditorProps } from "./RichEditorProps";

const PlatformIOS = Platform.OS === "ios";

const RichEditor: React.FC<RichEditorProps> = (props) => {
  const [keyOpen, setKeyOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  //consider default here (for editting a message)
  const [html, setHtml] = useState(createHTML({}));
  //need meme (disable state) probably
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [isInit, setIsInit] = useState(false);
  const [selectionChangeListeners, setSelectionChangeListeners] = useState<
    any[]
  >([]);
  const [focusListeners, setFocusListeners] = useState<any[]>([]);
  const webViewBridge = useRef<WebView>(null);

  const onMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    switch (message.type) {
      case messages.CONTENT_HTML_RESPONSE:
        console.log("Content html response", message);
        /*
                    if (this.contentResolve) {
                        this.contentResolve(message.data);
                        this.contentResolve = undefined;
                        this.contentReject = undefined;
                        if (this.pendingContentHtml) {
                            clearTimeout(this.pendingContentHtml);
                            this.pendingContentHtml = undefined;
                        }
                    }
                    */
        break;
      case messages.LOG:
        console.log("FROM EDIT:", ...message.data);
        break;
      case messages.SELECTION_CHANGE: {
        const items = message.data;
        selectionChangeListeners.map((listener) => {
          listener(items);
        });
        break;
      }
      case messages.CONTENT_FOCUSED: {
        setFocus(true);
        focusListeners.map((da) => da()); // Subsequent versions will be deleted
        props.onFocus && props.onFocus();
        break;
      }
      case messages.CONTENT_BLUR: {
        setFocus(false);
        props.onBlur && props.onBlur();
        break;
      }
      case messages.CONTENT_CHANGE: {
        props.onChange && props.onChange(message.data);
        break;
      }
      case messages.CONTENT_PASTED: {
        props.onPaste && props.onPaste(message.data);
        break;
      }
      case messages.CONTENT_KEYUP: {
        props.onKeyUp && props.onKeyUp(message.data);
        break;
      }
      case messages.CONTENT_KEYDOWN: {
        props.onKeyDown && props.onKeyDown(message.data);
        break;
      }
      case messages.OFFSET_HEIGHT:
        if (props.useContainer) setHeight(message.data);
        if (props.onHeightChange) props.onHeightChange(height);
        break;
      default:
        props.onMessage && props.onMessage(message);
        break;
    }
  };

  const sendAction = (
    type: string,
    action?: string,
    data?: any,
    options?: any
  ) => {
    if (webViewBridge && webViewBridge.current) {
      webViewBridge.current.postMessage(
        JSON.stringify({ type, name: action, data, options })
      );
    }
  };

  const registerToolbar = () => console.log("registerToolbar");
  const onKeyboardWillShow = () => setKeyOpen(true);
  const onKeyboardWillHide = () => setKeyOpen(false);
  const init = () => {
    if (props.initialContentHTML)
      sendAction(actions.content, "setHtml", props.initialContentHTML);
    if (props.placeholder) {
      console.log("set placeholder");
      sendAction(actions.content, "setPlaceholder", props.placeholder);
    }
    if (props.initialFocus && !props.disabled) {
      console.log("show android keyboard not implemented"); //showAndroidKeyboard();
      sendAction(actions.content, "focus");
    }

    sendAction(actions.init);
  };
  const setRef = () => console.log("setRef");

  useEffect(() => {
    let keyboardEventListeners = [
      Keyboard.addListener("keyboardWillShow", onKeyboardWillShow),
      Keyboard.addListener("keyboardWillHide", onKeyboardWillHide),
    ];
    return function cleanup() {
      keyboardEventListeners.forEach((listener) => listener.remove());
    };
  }, []);

  return (
    <View>
      <WebView
        scrollEnabled={false}
        hideKeyboardAccessoryView={true}
        keyboardDisplayRequiresUserAction={false}
        {...props}
        ref={webViewBridge}
        onMessage={onMessage}
        originWhitelist={["*"]}
        dataDetectorTypes={"none"}
        domStorageEnabled={false}
        bounces={false}
        javaScriptEnabled={true}
        source={{ html: html }}
        onLoad={init}
      />
    </View>
  );
};

export default RichEditor;
