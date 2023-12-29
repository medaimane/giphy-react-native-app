import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {RemoteDataState} from '../../Presenter/RemoteDataState';
import {EmptyView} from './EmptyView';
import {ErrorView} from './ErrorView';
import {LoadingView} from './LoadingView';

type ComponentFactory = () => ReactNode;

interface Props {
  state: RemoteDataState;

  dataView: ComponentFactory;

  onRetry?: () => void;
  errorView?: ComponentFactory;

  style?: ViewStyle;
}

export function RemoteData(props: Props) {
  const content = () => {
    switch (props.state) {
      case RemoteDataState.Loading: {
        return <LoadingView />;
      }
      case RemoteDataState.Empty: {
        return <EmptyView />;
      }
      case RemoteDataState.Data: {
        return props.dataView();
      }
      case RemoteDataState.Error: {
        return <ErrorView onRetry={props.onRetry!} />;
      }
    }
  };

  return <View style={[styles.container, props.style]}>{content()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
