import {GifGateway} from '../../src/services/apis/GiphyService/GifGateway';

export class GifServiceStub implements GifGateway {
  getRandomGif = jest.fn();
  search = jest.fn();
}
