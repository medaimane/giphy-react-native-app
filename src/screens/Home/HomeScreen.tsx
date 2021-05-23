import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GifsList} from '../../components/GifsList';
import {GifWithDetails} from '../../components/GifWithDetails';
import {RemoteData} from '../../components/RemoteData/RemoteData';
import {SearchBar} from '../../components/SearchBar';
import {dependencies} from '../../Dependencies/Dependencies';
import {usePresenterFactory} from '../../Presenter/usePresenter';
import {Colors} from '../../theme/Colors';
import {Fonts, FontSize} from '../../theme/Fonts';
import {HomePresenter} from './HomePresenter';

export function HomeScreen() {
  const {state, presenter} = usePresenterFactory(
    () => new HomePresenter(dependencies.gifGateway)
  );

  useEffect(() => {
    presenter.fetchRandomGif();
  }, [presenter]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <SearchBar
          text={state.searchText}
          isFocused={state.isSearchInputFocused}
          onChange={presenter.search}
          onFocus={presenter.onSearchFocus}
          onCancel={presenter.onSearchCancel}
        />
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{state.title}</Text>
          </View>
          {!state.isSearchInputFocused && (
            <RemoteData
              state={state.viewState}
              dataView={() => <GifWithDetails gif={state.gif} />}
              onRetry={presenter.fetchRandomGif}
            />
          )}
          {state.isSearchInputFocused && (
            <RemoteData
              state={state.viewState}
              dataView={() => <GifsList gifs={state.gifs} />}
              onRetry={presenter.fetchRandomGif}
            />
          )}
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
  },
  titleText: {
    ...Fonts.Regular(FontSize.Header3),
    color: Colors.Black,
  },
});
