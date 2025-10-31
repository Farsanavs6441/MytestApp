import React from 'react';
import { Image, ImageSourcePropType, Platform } from 'react-native';

type Props = {
  set?: 'Ionicons' | 'Feather' | 'MaterialCommunityIcons' | 'MaterialIcons';
  name?: string;
  size?: number;
  color?: string;
  fallbackSource: ImageSourcePropType;
};

export default function ArrowIcon({
  set = 'Ionicons',
  name = 'arrow-forward',
  size = 20,
  color = '#fff',
  fallbackSource,
}: Props) {
  try {
    let IconComponent: any = null;
    switch (set) {
      case 'Feather':
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        IconComponent = require('react-native-vector-icons/Feather').default;
        if (!name) name = 'arrow-right';
        break;
      case 'MaterialCommunityIcons':
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        IconComponent = require('react-native-vector-icons/MaterialCommunityIcons').default;
        if (!name) name = 'arrow-right';
        break;
         case 'MaterialIcons':
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        IconComponent = require('react-native-vector-icons/MaterialIcons').default;
        if (!name) name = Platform.OS === 'ios' ? 'ArrowForwardIos' : 'arrow-forward';
        break;
      case 'Ionicons':
      default:
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        IconComponent = require('react-native-vector-icons/Ionicons').default;
        if (!name) name = 'arrow-forward';
        break;
        
    }

    if (IconComponent) {
      return <IconComponent name={name} size={size} color={color} />;
    }
  } catch (_e) {
    // fall back to image when vector icons package isn't installed/linked
  }

  return <Image source={fallbackSource} style={{ width: size, height: size }} resizeMode="contain" />;
}


