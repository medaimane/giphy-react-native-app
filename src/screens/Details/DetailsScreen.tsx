import React from 'react';
import {View} from 'react-native';
import {GifWithDetails} from '../../components/GifWithDetails';
import {GifPresentable} from '../GifPresentable';

export function DetailsScreen(props: {gif: GifPresentable}) {
  return (
    <View>
      <GifWithDetails gif={props.gif} />
    </View>
  );
}
