import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { playerGetByGroup } from './playerGetByGroup';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';

async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storedPlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => 
      newPlayer.name === player.name
    );

    if(playerAlreadyExists.length > 0) {
      throw new AppError('Player already exists')
    }
  
    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw (error);
  }
}

export { playerAddByGroup }