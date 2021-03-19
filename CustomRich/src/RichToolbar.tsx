import React from "react";
import { Pressable, FlatList } from "react-native";
import { IRichToolbar, RichToolbarOption } from "./IContainer";

const RichToolbar: React.FC<IRichToolbar> = ({
  sendAction,
  options,
  selectedOptions,
}) => {
  const renderOption = (item: RichToolbarOption) => {
    let selected = selectedOptions.includes(item.action.type);
    return (
      <Pressable
        style={[{ padding: 10 }, selected ? { backgroundColor: "blue" } : {}]}
        onPress={() => sendAction(item.action)}
      >
        {item.icon(selected)}
      </Pressable>
    );
  };

  return (
    <FlatList
      horizontal
      keyboardShouldPersistTaps={"always"}
      keyExtractor={(item: any, index: number) =>
        item.action.type + index.toString()
      }
      data={options}
      alwaysBounceHorizontal={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => renderOption(item)}
      style={{
        backgroundColor: "#C7C7C7",
      }}
    />
  );
};

export default RichToolbar;
