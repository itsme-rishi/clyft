import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View>
    <View style={styles.header}>
      {/* Clyft Logo on the Left */}
      <Image source={require('../assets/loading.png')} style={styles.logo} />
      {/* Skip Button on the Right */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
        <Text style={styles.arrow}> ❯ </Text>
      </TouchableOpacity>      
    </View>
    <View style={styles.header}>
         <Text style={styles.tagline}>One App.{'\n'}All Materials.{'\n'}Every Expert!</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagline: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'white',
    paddingBottom:40,
    paddingHorizontal:30,
    fontFamily:'OpenSans_400Regular',
    // textAlign: 'center',
  },
  logo: {
    width: 160, // Adjusted size
    height: 160,
    resizeMode: 'contain',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#444', // Matching the button style
    borderRadius: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5, // Space between text and arrow
  },
});
