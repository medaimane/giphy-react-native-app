import React from 'react';
import {Image, ImageStyle} from 'react-native';

export function GifImage(props: {url: string; style: ImageStyle}) {
  return (
    <Image
      fadeDuration={3000}
      resizeMode={'cover'}
      style={props.style}
      source={{uri: props.url}}
    />
  );
}
