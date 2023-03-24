import { StyleSheet, useWindowDimensions } from 'react-native';

const { height, width } = useWindowDimensions();

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute'
  },

  canvas: {
    flex: 1
  },
});