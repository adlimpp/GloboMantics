import {StyleSheet, Text, ScrollView, Image} from 'react-native';

const whatGlobo = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;
const aboutGlobo = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`;

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.pics}
        source={require('../assets/image/about.jpg')}
      />
      <Text style={styles.aboutTitle}>Who Are We?</Text>
      <Text style={styles.aboutText}>{aboutGlobo}</Text>
      <Image
        style={styles.pics}
        source={require('../assets/image/about2.jpg')}
      />
      <Text style={styles.aboutTitle}>Who We Do?</Text>
      <Text style={styles.aboutText}>{whatGlobo}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20
  },
  pics: {
    height:300
  },
  aboutTitle: {
    paddingTop:10,
    textAlign:"center"
  },
  aboutText: {
    paddingBottom: 20,
    paddingLeft:10,
    paddingRight:10
  },
});

export default AboutScreen;
