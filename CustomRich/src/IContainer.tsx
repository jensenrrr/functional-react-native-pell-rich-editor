import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type SendAction = (
  type: any,
  action?: string | undefined,
  data?: any,
  options?: any
) => void;

export type SelectionChangeListener = (items: string[]) => void;

export interface IRichToolbar {
  options: RichToolbarOption[];
  sendAction: SendAction;
  setSelectionChangeListeners: React.Dispatch<
    React.SetStateAction<SelectionChangeListener[]>
  >;
}
export interface RichToolbarOption {
  icon: () => JSX.Element;
  action: SendAction;
}
export interface IContainer {
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * Used for placement of editor
   */
  contentInset?: { top: number; bottom: number };

  /**
   * Wrap the editor webview inside a container.
   * Default is true
   */
  useContainer?: boolean;

  /**
   * useContainer is false by inline view of initial height
   */
  initialHeight?: number | string;
  /**
   * Wrap the editor content placeholder
   * Default is empty string
   */
  placeholder?: string;
  /**
   * Styling for container or for Webview depending on useContainer prop
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Initial content to be rendered inside WebView
   */
  initialContentHTML?: string;

  /**
   * Boolean value to Initial content request focus. The default value is false.
   */
  initialFocus?: boolean;

  /**
   * Boolean value to disable editor. The default value is false.
   */
  disabled?: boolean;

  /**
   * String value to set text auto capitalization.
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
   */
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";

  /**
   * Boolean value to enable paste as plain text. The default value is false.
   */
  pasteAsPlainText?: boolean;

  /**
   * HTML element used to insert when the user presses enter. The default value is div.
   */
  defaultParagraphSeparator?: string;

  /**
   * Callback called after the editor has been initialized
   */
  editorInitializedCallback?: () => void;

  /**
   * Callback after editor data modification
   */
  onChange?: (text: string) => void;

  /**
   * Callback when the user pastes some content
   * @param {string} data pastes values
   */
  onPaste?: (data: string) => void;

  /**
   * Callback when the user keyup some content
   */
  onKeyUp?: ({ keyCode, key }: { keyCode: number; key: string }) => void;

  /**
   * Callback when the user keydown some content
   */
  onKeyDown?: ({ keyCode, key }: { keyCode: number; key: string }) => void;

  /**
   * Callback when the editor focus some content
   */
  onFocus?: () => void;

  /**
   * Callback when the editor blur some content
   */
  onBlur?: () => void;

  /**
   * Callback after height change
   */
  onHeightChange?: (height: number) => void;

  onMessage?: (message: { type: string; id: string; data?: any }) => void;

  /**
   * When first gaining focus, the cursor moves to the end of the text
   * Default is true
   */
  firstFocusEnd?: boolean;

  /**
   * Styling for container or for Rich Editor more dark or light settings
   */
  editorStyle?: {
    backgroundColor?: string; // editor background color
    color?: string; // editor text color
    placeholderColor?: string; // editor placeholder text color
    contentCSSText?: string; // editor content css text
    cssText?: string; // editor global css text
  };
}
