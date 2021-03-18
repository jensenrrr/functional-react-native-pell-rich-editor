import React, { useEffect } from "react";
import { Button, View } from "react-native";
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
  const [internalFocus, setInternalFocus] = React.useState(false);
  const [
    selectionChangeListeners,
    setSelectionChangeListeners,
  ] = React.useState<SelectionChangeListener[]>([]);
  const [height, setHeight] = React.useState(50);

  const sendAction = (
    type: any,
    action?: string,
    data?: any,
    options?: any
  ) => {
    if (webView && webView.current) {
      webView.current.postMessage(actionFormatter(type, action, data, options));
    }
  };

  const init = () => {
    if (placeholder) {
      sendAction(actions.content, "setPlaceholder", placeholder);
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
        focusEditor();
        break;
      }
      case messages.CONTENT_BLUR: {
        blurEditor();
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
        setHeight(message.data);
        /*
        if (props.useContainer) setHeight(message.data);
        if (props.onHeightChange) props.onHeightChange(height);
        */
        break;
      default:
        console.log("default message", message.data);
        //onMessage && onMessage(message);
        break;
    }
  };

  const blurEditor = () => {
    sendAction(actions.content, "blur");
    setInternalFocus(false);
  };
  const focusEditor = () => {
    sendAction(actions.content, "focus");
    setFocus(true);
    setInternalFocus(true);
  };

  useEffect(() => {
    if (focus !== internalFocus) {
      if (focus) focusEditor();
      else blurEditor();
    }
  }, [focus, internalFocus]);

  return (
    <>
      <View style={{ height: height }}>
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
      {focus ? (
        <View style={{ backgroundColor: "#C7C7C7", height: 40 }}>
          <Button
            onPress={() => sendAction(actions.setBold, "result")}
            title="Bold"
          />
        </View>
      ) : null}
    </>
  );
};

export default Container;
