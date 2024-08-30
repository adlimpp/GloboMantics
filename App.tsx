import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './app/views/HomeScreen';
import AboutScreen from './app/views/AboutScreen';
import LoginScreen from './app/views/LoginScreen';
import RegisterScreen from './app/views/RegisterScreen';
import Header from './app/components/Header';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{title: 'About Us'}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: () => <Header />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
