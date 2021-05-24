import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GifPresentable} from '../../screens/GifPresentable';
import {Colors} from '../../theme/Colors';
import {GifImage} from './GifImage';

interface Props {
  onPress: (gif: GifPresentable) => void;

  gifs: GifPresentable[];
}

export function GifsList(props: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={props.gifs}
      horizontal={false}
      numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => props.onPress(item)}>
          <GifImage style={styles.image} url={item.url} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
  },
  image: {
    height: 110,
    width: 110,
    margin: 5,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: Colors.GrayBackground,
  },
});
