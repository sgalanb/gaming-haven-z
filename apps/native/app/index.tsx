import { Text, View } from "react-native";
import { getGames } from "@repo/utils/src/index";

export default function Index() {
  const text = getGames();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. {text}</Text>
    </View>
  );
}
