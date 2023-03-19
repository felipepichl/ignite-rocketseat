import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";

async function groupCreate(newGroup: string) {
  try {

    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if(groupAlreadyExists) {
      throw new AppError('Group already exists')
    }

    const storage = JSON.stringify([... storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  
  } catch (error) {
    throw error;
  }
}

export { groupCreate }