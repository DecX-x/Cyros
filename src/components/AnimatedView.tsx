import React from 'react';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight,
  Layout,
  EntryExitAnimationFunction,
  BaseAnimationBuilder
} from 'react-native-reanimated';
import { ViewProps } from 'react-native';

interface AnimatedViewProps extends ViewProps {
  entering?: BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;
  exiting?: BaseAnimationBuilder | typeof BaseAnimationBuilder | EntryExitAnimationFunction;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({ 
  children, 
  style, 
  entering = FadeIn.duration(300),
  exiting = FadeOut.duration(200),
  ...props 
}) => {
  return (
    <Animated.View 
      entering={entering}
      exiting={exiting}
      layout={Layout.springify()}
      style={style}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;