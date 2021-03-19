import React, { useEffect } from "react";
import { View, Button, FlatList, Pressable } from "react-native";
import { actions } from "./const";
import RichOptions from "./Icons/RichOptions";
import { IRichToolbar } from "./IContainer";

const RichToolbar: React.FC<IRichToolbar> = ({
  sendAction,
  setSelectionChangeListeners,
  options,
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

    return setSelectionChangeListeners([]);
  }, []);

  const renderOption = (item: any) => {
    return (
      <Pressable style={{ padding: 10 }} onPress={() => item.action()}>
        {item.icon()}
      </Pressable>
    );
  };

  return (
    <FlatList
      horizontal
      keyboardShouldPersistTaps={"always"}
      keyExtractor={(item: any, index: number) => index.toString()}
      data={options}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => renderOption(item)}
      style={{
        backgroundColor: "#C7C7C7",
      }}
      //contentContainerStyle={flatContainerStyle}
    />
  );
};

/*
        <Button
          onPress={() => sendAction(actions.setBold, "result")}
          title="Bold"
        />
        <Button
          onPress={() => sendAction(actions.setItalic, "result")}
          title="Italic"
        />
*/
export default RichToolbar;
