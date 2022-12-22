import { Text, View, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Event name
      </Text>
      <Text style={styles.eventDate}>
        Friday, november 24th 2022
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131016",
    padding: 24,
  },
  eventName: {
    color: "#fdfcfe",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48
  },
  eventDate: {
    color: "#6b6b6b",
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 48
  }
})