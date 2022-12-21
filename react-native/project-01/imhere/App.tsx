import { Text, View } from 'react-native'

export default function App() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: "#131016",
      padding: 24,
    }}>
      <Text style={{
        color: "#fdfcfe",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 48
      }}>
        Event name
      </Text>
      <Text style={{
        color: "#6b6b6b",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 48
      }}>
        Friday, november 24th 2022
      </Text>
    </View>
  )
}