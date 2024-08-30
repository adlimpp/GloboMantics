import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';

const Header = () => {
  const styles = StyleSheet.create({
    headStyle: {backgroundColor: '#356051', flexDirection: 'row'},
    title: {},
    imageStyle: {alignSelf: 'flex-start', height: 100, width: 200, flex: 1},
    headText: {
      textAlign: 'right',
      textAlignVertical: 'center',
      color: '#ffffff',
      flex: 1,
      paddingRight: 15,
    },
  });
  useEffect(() => {
    AsyncStorage.getItem('userLoggedIn', (err, result: any) => {
      if (result === 'none') {
        console.log('NONE');
      } else if (result === null) {
        AsyncStorage.setItem('userLoggedIn', 'none', () => {
          console.log('SET USER TO NONE');
        });
      } else {
        setIsLoggedIn(true);
        setLoggedUser(result);
      }
    });
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');
  const navigation = useNavigation();
  const toggleUser = () => {
    if (isLoggedIn) {
      AsyncStorage.setItem('userLoggedIn', 'none', () => {
        setIsLoggedIn(false);
        setLoggedUser('');
        Alert.alert('User Logged Out');
      });
    } else {
      navigation.navigate('Login');
    }
  };

  let display = isLoggedIn ? loggedUser : 'Tap to Login';
  return (
    <View style={styles.headStyle}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/image/logo.jpg')}
      />
      <Text style={styles.headText} onPress={toggleUser}>
        {display}
      </Text>
    </View>
  );
};

export default Header;
