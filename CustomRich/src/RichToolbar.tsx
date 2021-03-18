import React, { useEffect } from "react";
import { View, Button } from "react-native";
import { actions } from "react-native-pell-rich-editor";
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
      setSelectedItems(items);
      /*
      this.setState({
        items,
        data: this.state.actions.map((action) => ({
          action,
          selected: items.includes(action),
        })),
      });*/
    }
  };

  useEffect(() => {
    setSelectionChangeListeners((listeners) => [
      ...listeners,
      (items) => toolbarSelectHandler(items),
    ]);
  }, []);

  return (
    <View style={{ backgroundColor: "#C7C7C7", height: 40 }}>
      <Button
        onPress={() => sendAction(actions.setBold, "result")}
        title="Bold"
      />
    </View>
  );
};

export default RichToolbar;
