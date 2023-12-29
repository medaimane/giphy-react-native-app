import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/Colors';
import {Fonts} from '../../theme/Fonts';

const emptyMessage = 'No data available!';

export function EmptyView() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{emptyMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    ...Fonts.Regular(),
    textAlign: 'center',
    color: Colors.Secondary,
  },
});
