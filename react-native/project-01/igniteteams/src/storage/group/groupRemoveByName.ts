import AsyncStorage from "@react-native-async-storage/async-storage";


import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from './groupsGetAll'

async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groups = storedGroups.filter(group => group !== groupDeleted);
    
  } catch (error) {
    throw error;
  }
}

export { groupRemoveByName }