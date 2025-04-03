import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';


export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to Clyft!</ThemedText>
      <ThemedText type="title">!!!!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});