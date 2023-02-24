import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {

}

function ExerciseCard({...rest}: Props) {
  return (
    <TouchableOpacity {...rest}>
      
    </TouchableOpacity>
  );
}

export { ExerciseCard }