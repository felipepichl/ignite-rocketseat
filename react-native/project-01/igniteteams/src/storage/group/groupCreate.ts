import AsyncStorage from "@react-native-async-storage/async-storage";

import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

async function groupCreate(newGroup: string) {
  try {

    const storedGroups = await groupsGetAll();

    const storage = JSON.stringify([... storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  
  } catch (error) {
    throw error;
  }
}

export { groupCreate }