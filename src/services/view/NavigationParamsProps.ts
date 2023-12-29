import {RouteProp} from '@react-navigation/native';
import {GifPresentable} from '../../screens/GifPresentable';
import {NavigationRoutes} from './NavigationRoutes';

export type RootStackParamList = {
  [NavigationRoutes.Home]: undefined;
  [NavigationRoutes.Details]: {gif: GifPresentable};
};

export type NavigationParamsProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
