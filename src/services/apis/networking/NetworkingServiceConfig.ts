import Constants from 'expo-constants';

const BASE_URL = 'https://api.giphy.com';
const REQUEST_TIMEOUT_IN_MS = 30000;

export interface NetworkingServiceConfig {
  readonly baseUrl: string;
  readonly timeout: number;

  readonly apiKey?: string;
}

export class DevNetworkingServiceConfig implements NetworkingServiceConfig {
  readonly baseUrl = BASE_URL;
  readonly timeout = REQUEST_TIMEOUT_IN_MS;

  readonly apiKey = Constants.manifest.extra?.apiKey;
}
