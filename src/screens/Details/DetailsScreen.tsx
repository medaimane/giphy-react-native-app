import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {GifWithDetails} from '../../components/Gifs/GifWithDetails';
import {EmptyView} from '../../components/RemoteData/EmptyView';
import {NavigationParamsProps} from '../../services/view/NavigationParamsProps';
import {NavigationRoutes} from '../../services/view/NavigationRoutes';
import {Colors} from '../../theme/Colors';
import {GifPresentable} from '../GifPresentable';

export function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<NavigationParamsProps<NavigationRoutes.Details>>();

  const [gif, setGif] = useState<GifPresentable | null>(null);

  const options = {
    title: gif?.title ?? NavigationRoutes.Details,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      color: Colors.Secondary,
    },
    headerTintColor: Colors.Gray,
    headerStyle: {
      backgroundColor: Colors.White,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerLeftContainerStyle: {
      paddingLeft: 12,
    },
  };

  useEffect(() => {
    setGif(route.params.gif);
  }, [route.params]);

  useLayoutEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  return (
    <View style={styles.container}>
      {gif ? <GifWithDetails gif={gif} /> : <EmptyView />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
