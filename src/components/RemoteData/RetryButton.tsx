import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {local} from '../../Localization/local';
import {Colors} from '../../theme/Colors';

export function RetryButton(props: {onPress: () => void; style?: ViewStyle}) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{local.retry}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Secondary,
    marginHorizontal: 100,
    paddingVertical: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    color: Colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
