import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './app/views/HomeScreen';
import AboutScreen from './app/views/AboutScreen';
import LoginScreen from './app/views/LoginScreen';
import RegisterScreen from './app/views/RegisterScreen';
import Header from './app/components/Header';
import BlogDetailScreen from './app/views/BlogDetailSecreen';
import BlogScreen from './app/views/BlogScreen';
import QuizScreen from './app/views/QuizScreen';
import QuizFinishScreen from './app/views/QuizFinishScreen';
import VideoScreen from './app/views/VideoScreen';
import VideoDetailScreen from './app/views/VideoDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetailScreen}
          options={{title: 'Watch Lessons'}}
        />
        <Stack.Screen
          name="Videos"
          component={VideoScreen}
          options={{title: 'Video Lessons'}}
        />
        <Stack.Screen
          name="QuizFinish"
          component={QuizFinishScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetailScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Blog"
          component={BlogScreen}
          options={{title: 'Blog'}}
        />
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
