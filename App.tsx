import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/views/HomeScreen";
import AboutScreen from "./app/views/AboutScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="About" component={AboutScreen} options={{title:"About Us"}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"GloboMantics"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
