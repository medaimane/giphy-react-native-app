import {Dependencies} from '../../src/Dependencies/Dependencies';
import {GifServiceStub} from './GifServiceStub';

export class TestAssembly implements Dependencies {
  gifGateway: GifServiceStub;

  constructor() {
    this.gifGateway = new GifServiceStub();
  }
}
