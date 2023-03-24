import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withSequence,
  withTiming, 
  useAnimatedStyle
} from 'react-native-reanimated';
import { Canvas, Rect, BlurMask } from '@shopify/react-native-skia';

import { styles } from './styles'
import { THEME } from '../../styles/theme';

const STATUS = [
  'transparent',
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
]

type Props = {
  status: number;
}

function OverlayFeedback({ status }: Props) {
  const opacity = useSharedValue(0);

  const color = STATUS[status];
  
  const { height, width } = useWindowDimensions()

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0)
    );
  }, [status])

  return (
    <Animated.View style={[styles.container, styleAnimated]} >
      <Canvas style={styles.canvas}>
        <Rect 
          x={0}
          y={0}
          height={height}
          width={width}
          color={color}
        >
          <BlurMask blur={50} style="inner"/>
        </Rect>
      </Canvas>  
    </Animated.View>
  )
}

export { OverlayFeedback }