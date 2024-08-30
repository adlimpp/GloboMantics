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
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleCancel = () => {
    Alert.alert('Login Cancelled');
    navigation.navigate('Home');
  };
  const handleNavigateRegister = () => {
    navigation.navigate('Register');
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
    container: {
      flex: 1,
      paddingBottom: '45%',
      paddingTop: '5%',
      alignItems: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    inputs: {
      width: '80%',
      marginTop: 15,
      borderWidth: 1,
      height: 45,
      fontSize: 16,
    },
    labels: {
      paddingBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttons: {
      padding: 15,
      margin: 5,
      fontSize: 16,
      backgroundColor: '#DDDDDD',
      width: 150,
      height: 50,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.inputs}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.labels}>Enter Username</Text>
      <TextInput
        style={styles.inputs}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Text style={styles.labels}>Enter Password</Text>
      <TouchableHighlight onPress={handleLogin} underlayColor="#000000">
        <Text style={styles.buttons}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={handleCancel} underlayColor="#000000">
        <Text style={styles.buttons}>Cancel</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleNavigateRegister}
        underlayColor="#000000">
        <Text style={styles.buttons}>Create Account</Text>
      </TouchableHighlight>
    </View>
  );
};

export default LoginScreen;
