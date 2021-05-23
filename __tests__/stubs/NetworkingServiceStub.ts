import {NetworkingService} from "../../src/services/apis/NetworkingService";

export class NetworkingServiceStub implements NetworkingService {
    getJSON = jest.fn();
}
