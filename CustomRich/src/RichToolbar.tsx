import React, { useEffect } from "react";
import { View, Button, FlatList, Pressable } from "react-native";
import { actions } from "./const";
import RichOptions from "./Icons/RichOptions";
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
