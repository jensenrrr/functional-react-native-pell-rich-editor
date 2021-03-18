import React from "react";
import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { actions, messages } from "./const";
import { IContainer } from "./IContainer";
import { createHTML } from "./RichEditor/editor";

const actionFormatter = (
  type: any,
  action?: string,
  data?: any,
  options?: any
) => {
  return JSON.stringify({
    type,
    name: action,
    data: data,
    options: options,
  });
};

type SelectionChangeListener = (items: string[]) => void;

const Container: React.FC<IContainer> = ({
  focus,
  setFocus,
  placeholder,
  onChange,
  onPaste,
  onKeyDown,
  onKeyUp,
}) => {
  const html = createHTML({ color: "black" });
  const webView = React.useRef<WebView>(null);
  const [
    selectionChangeListeners,
    setSelectionChangeListeners,
  ] = React.useState<SelectionChangeListener[]>([]);

  const sendAction = (action: string) => {
    if (webView && webView.current) {
      console.log("action", action);
      webView.current.postMessage(action);
    }
  };

  const init = () => {
    if (placeholder) {
      sendAction(
        actionFormatter(actions.content, "setPlaceholder", placeholder)
      );
    }
  };

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
        break;
      }
      case messages.CONTENT_BLUR: {
        setFocus(false);
        break;
      }
      case messages.CONTENT_CHANGE: {
        onChange && onChange(message.data);
        break;
      }
      case messages.CONTENT_PASTED: {
        onPaste && onPaste(message.data);
        break;
      }
      case messages.CONTENT_KEYUP: {
        onKeyUp && onKeyUp(message.data);
        break;
      }
      case messages.CONTENT_KEYDOWN: {
        onKeyDown && onKeyDown(message.data);
        break;
      }
      case messages.OFFSET_HEIGHT:
        console.log("offset height unhandled");
        /*
        if (props.useContainer) setHeight(message.data);
        if (props.onHeightChange) props.onHeightChange(height);
        */
        break;
      default:
        console.log("default message");
        //onMessage && onMessage(message);
        break;
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
        onMessage={onMessage}
        source={{ html }}
        onLoad={init}
      />
    </View>
  );
};

export default Container;
