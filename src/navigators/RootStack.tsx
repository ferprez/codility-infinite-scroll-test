import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { FlatListTest } from "../screens/FlatListTest";
import { Routes } from "./Routes";

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.FlatListTest}
        component={FlatListTest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
