import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../../theme/Colors';
import {Fonts} from '../../theme/Fonts';
import {RetryButton} from './RetryButton';

export function ErrorView(props: {onRetry: () => void}) {
  const errorMessage =
    'Something went wrong, please check your internet connection and try again.';

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{errorMessage}</Text>
      </View>
      <RetryButton onPress={props.onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    ...Fonts.Regular(),
    textAlign: 'center',
  },
});
