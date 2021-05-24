import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GifPresentable} from '../../screens/GifPresentable';
import {Colors} from '../../theme/Colors';
import {Fonts, FontSize} from '../../theme/Fonts';
import {GifImage} from './GifImage';

export function GifWithDetails(props: {gif: GifPresentable}) {
  const {rating, title, url, slug} = props.gif;

  return (
    <View style={styles.container}>
      <GifImage style={styles.image} url={url} />

      <View style={styles.details}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.url}>{slug}</Text>
        </View>

        <View style={styles.rating}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  image: {
    width: 350,
    height: 300,
    borderWidth: 4,
    borderRadius: 16,
    borderColor: Colors.Light,
    alignSelf: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    marginRight: 16,
  },
  text: {
    ...Fonts.Bold(FontSize.Header3),
    color: Colors.Secondary,
  },
  url: {
    ...Fonts.Light(FontSize.Normal),
    color: Colors.Secondary,
  },

  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.Light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    ...Fonts.Bold(FontSize.Title),
    color: Colors.Primary,
  },
});
