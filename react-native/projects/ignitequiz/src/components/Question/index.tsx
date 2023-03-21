import { View, Text } from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';

import { Option } from '../Option';
import { styles } from './styles';

type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
}

export function Question({ question, alternativeSelected, setAlternativeSelected }: Props) {

  const enteringKeyframe = new Keyframe({
    0: {},
    70: {},
    100: {}
  })

  return (
    <Animated.View 
      style={styles.container}
      entering={enteringKeyframe}  
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            checked={alternativeSelected === index}
            onPress={() => setAlternativeSelected && setAlternativeSelected(index)}
          />
        ))
      }
    </Animated.View>
  );
}