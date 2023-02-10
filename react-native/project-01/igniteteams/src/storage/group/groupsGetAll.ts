import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

async function groupsGetAll() {
  const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
}