import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme/Colors';

export function LoadingView() {
  return (
    <ActivityIndicator
      color={Colors.Primary}
      style={styles.loading}
      animating={true}
      size={'large'}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});
