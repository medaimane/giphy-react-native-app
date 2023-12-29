import {ajax} from 'rxjs/ajax';
import {NetworkingServiceImpl} from '../services/apis/networking/NetworkingServiceImpl';
import {DevNetworkingServiceConfig} from '../services/apis/networking/NetworkingServiceConfig';
import {GifGateway} from '../services/apis/GiphyService/GifGateway';
import {GifService} from '../services/apis/GiphyService/GifService';

export interface Dependencies {
  gifGateway: GifGateway;
}

const networkingService = new NetworkingServiceImpl(
  ajax,
  new DevNetworkingServiceConfig()
);

export const dependencies: Dependencies = {
  gifGateway: new GifService(networkingService),
};
