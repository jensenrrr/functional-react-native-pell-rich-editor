import React, { useEffect } from "react";
import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { actions, messages } from "./const";
import {
  IContainer,
  RichToolbarOption,
  SelectionChangeListener,
  SendAction,
} from "./IContainer";
import { createHTML } from "./editor";
import RichToolbar from "./RichToolbar";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "./Icons/RichOptions";

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

const intializeToolbarOptions = (sendAction: SendAction) => {
  const results: RichToolbarOption[] = [];
  results.push({
    icon: BoldIcon,
    action: () => sendAction(actions.setBold, "result"),
  });
  results.push({
    icon: ItalicIcon,
    action: () => sendAction(actions.setItalic, "result"),
  });
  results.push({
    icon: UnderlineIcon,
    action: () => sendAction(actions.setUnderline, "result"),
  });
  return results;
};

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
  const [height, setHeight] = React.useState(50);

  const sendAction: SendAction = (type, action, data, options) => {
    if (webView && webView.current) {
      webView.current.postMessage(actionFormatter(type, action, data, options));
    }
  };
  const [toolbarOptions, setToolbarOptions] = React.useState<
    RichToolbarOption[]
  >(intializeToolbarOptions(sendAction));

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
        console.log(message.data);
        setHeight(Math.min(220, message.data));
        break;
      default:
        console.log("default message", message.data);
        break;
    }
  };

  const blurEditor = () => {
    sendAction(actions.content, "blur");
    setFocus(false);
  };
  const focusEditor = () => {
    sendAction(actions.content, "focus");
    setFocus(true);
  };

  useEffect(() => {
    if (focus) focusEditor();
    else blurEditor();
  }, [focus]);

  return (
    <>
      <View style={{ height: height }}>
        <WebView
          ref={webView}
          scrollEnabled={height > 80}
          showsVerticalScrollIndicator={height > 80}
          bounces={true}
          hideKeyboardAccessoryView={true}
          keyboardDisplayRequiresUserAction={false}
          originWhitelist={["*"]}
          dataDetectorTypes={"none"}
          domStorageEnabled={false}
          onMessage={onMessage}
          source={{ html }}
          onLoad={init}
          //android -> overscroll mode?
        />
      </View>
      {focus ? (
        <RichToolbar
          options={toolbarOptions}
          setSelectionChangeListeners={setSelectionChangeListeners}
          sendAction={sendAction}
        />
      ) : null}
    </>
  );
};

export default Container;
