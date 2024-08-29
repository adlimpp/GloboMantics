import React, {useState} from 'react';
import {
  TextInput,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (navigation: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleCancel = () => {
    Alert.alert('Login Cancelled');
    navigation.navigate('Home');
  };
  const handleNavigateRegister = () => {
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    if (!username) {
      Alert.alert('Please enter your usernmae');
    } else if (!password) {
      Alert.alert('Please insert your password');
    } else {
      AsyncStorage.getItem('userLoggedIn', (_err, result) => {
        if (result !== 'none') {
          Alert.alert('Someone already logged in');
          navigation.navigate('Home');
        } else {
          AsyncStorage.getItem(username, (_err, result) => {
            if (result !== null) {
              if (result !== password) {
                Alert.alert('Password incorrect');
              } else {
                AsyncStorage.setItem('userLoggedIn', username, () => {
                  Alert.alert(`${username} Logged In`);
                  navigation.navigate('Home');
                });
              }
            } else {
              Alert.alert(`No account for ${username}`);
            }
          });
        }
      });
    }
  };
  const styles = StyleSheet.create({
    container: {},
  });

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
