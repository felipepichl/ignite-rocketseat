import { useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
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
  const color = STATUS[status];
  
  const { height, width } = useWindowDimensions()

  return (
    <Animated.View style={styles.container} >
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