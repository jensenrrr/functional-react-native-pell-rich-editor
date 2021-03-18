import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { actions } from "./const";
import { SelectionChangeListener } from "./IContainer";

interface IRichToolbar {
  sendAction: (
    type: any,
    action?: string | undefined,
    data?: any,
    options?: any
  ) => void;
  setSelectionChangeListeners: React.Dispatch<
    React.SetStateAction<SelectionChangeListener[]>
  >;
}

const RichToolbar: React.FC<IRichToolbar> = ({
  sendAction,
  setSelectionChangeListeners,
}) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const toolbarSelectHandler = (items: string[]) => {
    if (items !== selectedItems) {
      //is something not handled here? the pell editor has more logic
      setSelectedItems(items);
    }
  };

  useEffect(() => {
    setSelectionChangeListeners((listeners) => [
      ...listeners,
      (items) => toolbarSelectHandler(items),
    ]);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#C7C7C7",
        height: 40,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Button
          onPress={() => sendAction(actions.setBold, "result")}
          title="Bold"
        />
        <Button
          onPress={() => sendAction(actions.setItalic, "result")}
          title="Italic"
        />
      </View>
    </View>
  );
};

export default RichToolbar;
