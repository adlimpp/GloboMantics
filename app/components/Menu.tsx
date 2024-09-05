import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';

const Menu = () => {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {flex: 2, backgroundColor: '#35605a'},
    bottomRow: {
      flex: 1,
    //   flexDirection: 'row',
      alignSelf: 'flex-end',
      justifyContent: 'center',
    },
    buttonStyles: {
      backgroundColor: '#35605a',
      width: '50%',
      height: '55%',
      alignItems: 'center',
    },
    bottomButtonStyles: {
      backgroundColor: '#356605a',
      width: '100%',
      height: '50%',
      paddingRight: 20,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 20,
    },
    border: {
      borderColor: '#ffffff',
      borderBottomWidth: 1,
    },
    buttonRow: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  });
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Videos')}>
          <Text style={styles.buttonText}>Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonRow, styles.border]}>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Blog')}>
          <Text style={styles.buttonText}>Blog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.bottomButtonStyles}
          onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;
