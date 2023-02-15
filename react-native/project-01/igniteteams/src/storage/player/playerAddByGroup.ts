import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';

async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storedPlayers = await playersGetAll();

    const playerAlreadyExists = storedPlayers.includes(newPlayer);

    if(playerAlreadyExists) {
      throw new AppError('Player already exists')
    }
  
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, 
      [...storedPlayers, newPlayer],
    );
  } catch (error) {
    throw (error);
  }
}

export { playerAddByGroup }