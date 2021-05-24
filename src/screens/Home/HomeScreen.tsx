import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GifsList} from '../../components/Gifs/GifsList';
import {GifWithDetails} from '../../components/Gifs/GifWithDetails';
import {RemoteData} from '../../components/RemoteData/RemoteData';
import {SearchBar} from '../../components/SearchBar/SearchBar';
import {dependencies} from '../../Dependencies/Dependencies';
import {usePresenterFactory} from '../../Presenter/usePresenter';
import {NavigationRoutes} from '../../services/view/NavigationRoutes';
import {Timer, TimerImpl} from '../../services/view/Timer';
import {Colors} from '../../theme/Colors';
import {Fonts, FontSize} from '../../theme/Fonts';
import {GifPresentable} from '../GifPresentable';
import {HomePresenter} from './HomePresenter';

const RandomGifDisplayDelay = 30000;

export function HomeScreen() {
  const navigation = useNavigation();
  const timer = useRef<Timer>(new TimerImpl());

  const {state, presenter} = usePresenterFactory(
    () => new HomePresenter(dependencies.gifGateway)
  );

  useEffect(() => {
    timer.current.start(() => {
      if (!state.isSearchInputFocused) {
        presenter.fetchRandomGif();
      }
    }, RandomGifDisplayDelay);
  }, [timer, presenter]);

  const handleListPress = (gif: GifPresentable) => {
    navigation.navigate(NavigationRoutes.Details, {gif});
  };

  const handleRetry = () => {
    if (state.isSearchInputFocused) {
      presenter.search(state.searchText);
    } else {
      presenter.fetchRandomGif();
    }
  };

  const dataView = () => {
    if (state.isSearchInputFocused) {
      return <GifsList gifs={state.gifs} onPress={handleListPress} />;
    }

    return <GifWithDetails gif={state.gif} />;
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <SearchBar
          text={state.searchText}
          isFocused={state.isSearchInputFocused}
          onChange={presenter.search}
          onFocus={presenter.onSearchFocus}
          onCancel={presenter.onSearchCancel}
          onClear={presenter.onSearchClear}
        />
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{state.title}</Text>
          </View>
          <RemoteData
            state={state.viewState}
            dataView={dataView}
            onRetry={handleRetry}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  titleText: {
    ...Fonts.Regular(FontSize.Header3),
    color: Colors.Black,
  },
});
