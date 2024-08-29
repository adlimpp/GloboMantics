import {View, StyleSheet} from 'react-native';
import Hero from '../components/Hero';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Hero/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
