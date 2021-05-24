import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {GifsList} from '../../components/GifsList';
import {GifWithDetails} from '../../components/GifWithDetails';
import {RemoteData} from '../../components/RemoteData/RemoteData';
import {SearchBar} from '../../components/SearchBar/SearchBar';
import {dependencies} from '../../Dependencies/Dependencies';
import {usePresenterFactory} from '../../Presenter/usePresenter';
import {NavigationRoutes} from '../../services/view/NavigationRoutes';
import {Colors} from '../../theme/Colors';
import {Fonts, FontSize} from '../../theme/Fonts';
import {GifPresentable} from '../GifPresentable';
import {HomePresenter} from './HomePresenter';

export function HomeScreen() {
  const navigation = useNavigation();

  const {state, presenter} = usePresenterFactory(
    () => new HomePresenter(dependencies.gifGateway)
  );

  useEffect(() => {
    if (!state.isSearchInputFocused) {
      presenter.fetchRandomGif();
    }
  }, [presenter]);

  const handleListPress = (gif: GifPresentable) => {
    navigation.navigate(NavigationRoutes.Details, {gif});
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
          {/* Refactor to one RemoteData componet */}
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
              dataView={() => (
                <GifsList gifs={state.gifs} onPress={handleListPress} />
              )}
              onRetry={() => presenter.search(state.searchText)}
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
    paddingBottom: 12,
  },
  titleText: {
    ...Fonts.Regular(FontSize.Header3),
    color: Colors.Black,
  },
});
