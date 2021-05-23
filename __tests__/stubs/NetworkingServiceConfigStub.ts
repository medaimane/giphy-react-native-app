import {NetworkingServiceConfig} from '../../src/services/apis/networking/NetworkingServiceConfig';

export class NetworkingServiceConfigStub implements NetworkingServiceConfig {
  readonly baseUrl: string;
  readonly timeout?: number;

  constructor(baseUrl: string, timeout?: number) {
    this.timeout = timeout;
    this.baseUrl = baseUrl;
  }

  set baseURL(baseURL: string) {
    this.baseURL = baseURL;
  }

  get baseURL(): string {
    return this.baseURL;
  }

  readonly apiUrl?: string;
  getApiKey = jest.fn();
}
