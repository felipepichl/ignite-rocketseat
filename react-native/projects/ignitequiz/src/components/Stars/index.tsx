import { View } from "react-native";

import TrophySvg from '../../assets/trophy.svg'

import { styles } from './styles';

function Stars() {
  return (
    <View style={styles.container}>

      <TrophySvg />
    </View>
  );
}

export { Stars }