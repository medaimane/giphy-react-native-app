import {NetworkingService} from '../../src/services/apis/networking/NetworkingService';

export class NetworkingServiceStub implements NetworkingService {
  getJSON = jest.fn();
}
