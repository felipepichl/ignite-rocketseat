import AsyncStorage from "@react-native-async-storage/async-storage";

async function groupCreate(newGroup: string) {
  try {
    await AsyncStorage.setItem('', newGroup);
  } catch (error) {
    throw error;
  }
}

export { groupCreate }