import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = (navigation: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleCancel = () => {
    Alert.alert('Registration Cancelled');
    navigation.navigate('Home');
  };

  const registerAccount = () => {
    if (!username) {
      Alert.alert('Please enter username');
    } else if (password !== passwordConfirm) {
      Alert.alert("Passwords don't match");
    } else {
      AsyncStorage.getItem('userName', (err, result) => {
        if (result !== null) {
          Alert.alert(`${username} already exist.`);
        } else {
          AsyncStorage.setItem(username, password, _err => {
            Alert.alert(`${username} account created`);
            navigation.navigate('Home');
          });
        }
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: '45%',
      paddingTop: '5%',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttons: {
      padding: 15,
      margin: 5,
      fontSize: 16,
      backgroundColor: '#000000',
      width: 150,
      height: 50,
      textAlign: 'center',
    },
    labels: {
      paddingBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputs: {
      width: '80%',
      marginTop: 12,
      borderWidth: 1,
      height: 45,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register Account</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        style={styles.inputs}
      />
      <Text style={styles.labels}>Input Username</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.inputs}
        secureTextEntry={true}
      />
      <Text style={styles.labels}>Input Password</Text>
      <TextInput
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
        style={styles.inputs}
        secureTextEntry={true}
      />
      <Text style={styles.labels}>Input Password Confirmation</Text>

      <TouchableHighlight
        onPress={registerAccount}
        underlayColor="#000000"
        style={styles.buttons}>
        Register
      </TouchableHighlight>
      <TouchableHighlight
        onPress={handleCancel}
        underlayColor="#000000"
        style={styles.buttons}>
        Cancel
      </TouchableHighlight>
    </View>
  );
};

export default RegisterScreen;
