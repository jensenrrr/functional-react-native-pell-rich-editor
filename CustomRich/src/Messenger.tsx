import React, { useEffect } from "react";
import { View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { actions, messages } from "./const";
import {
  IMessenger,
  IMessengerAction,
  ISendAction,
  RichToolbarOption,
  SelectionChangeListener,
  SendAction,
} from "./IContainer";
import { createHTML } from "./editor";
import RichToolbar from "./RichToolbar";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "./Icons/RichOptions";

const intializeToolbarOptions = () => {
  const results: RichToolbarOption[] = [
    {
      icon: BoldIcon,
      action: { type: actions.setBold, name: "result" },
    },
    {
      icon: ItalicIcon,
      action: { type: actions.setItalic, name: "result" },
    },
    {
      icon: UnderlineIcon,
      action: { type: actions.setUnderline, name: "result" },
    },
  ];
  return results;
};

const Messenger: React.FC<IMessenger> = (messengerProps) => {
  const html = createHTML({ color: "black" });
  const webView = React.useRef<WebView>(null);
  const [height, setHeight] = React.useState(50);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const sendAction: ISendAction = (action) => {
    if (webView && webView.current) {
      webView.current.postMessage(JSON.stringify(action));
    }
  };

  const [toolbarOptions, setToolbarOptions] = React.useState<
    RichToolbarOption[]
  >(intializeToolbarOptions());

  const init = () => {
    if (messengerProps.placeholder) {
      sendAction({
        type: actions.content,
        name: "setPlaceholder",
        data: messengerProps.placeholder,
      });
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
        setSelectedOptions(message.data);
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
        messengerProps.onChange && messengerProps.onChange(message.data);
        break;
      }
      case messages.CONTENT_PASTED: {
        messengerProps.onPaste && messengerProps.onPaste(message.data);
        break;
      }
      case messages.CONTENT_KEYUP: {
        messengerProps.onKeyUp && messengerProps.onKeyUp(message.data);
        break;
      }
      case messages.CONTENT_KEYDOWN: {
        messengerProps.onKeyDown && messengerProps.onKeyDown(message.data);
        break;
      }
      case messages.OFFSET_HEIGHT:
        setHeight(Math.min(220, message.data));
        break;
      default:
        console.log("default message", message.data);
        break;
    }
  };

  const blurEditor = () => {
    sendAction({ type: actions.content, name: "blur" });
    messengerProps.setFocus(false);
  };
  const focusEditor = () => {
    sendAction({ type: actions.content, name: "focus" });
    messengerProps.setFocus(true);
  };

  useEffect(() => {
    if (messengerProps.focus) focusEditor();
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
        />
      </View>
      {messengerProps.focus ? (
        <RichToolbar
          options={toolbarOptions}
          selectedOptions={selectedOptions}
          sendAction={sendAction}
        />
      ) : null}
    </>
  );
};

export default Messenger;
