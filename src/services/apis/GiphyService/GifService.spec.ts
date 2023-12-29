import {Observable, of, throwError} from 'rxjs';
import {NetworkingServiceStub} from '../../../../__tests__/stubs/NetworkingServiceStub';
import {GifService} from './GifService';
import {gifStub} from '../../../../__tests__/stubs/gifStub';

describe('GifService', () => {
  let networkingService: NetworkingServiceStub;

  let sut: GifService;

  beforeEach(() => {
    networkingService = new NetworkingServiceStub();

    sut = new GifService(networkingService);

    networkingService.getJSON.mockReturnValue(of({data: [gifStub]}));
  });

  describe('search', () => {
    it('sends GET request to the correct endpoint', () => {
      testUseOfEndpoint(
        () => sut.search('Cat'),
        [`v1/gifs/search`, `&q=Cat&limit=20`],

        {data: [gifStub]},
        [gifStub],

      );
    });

    it('throws error when networking service is failed', () => {
      testFailure(() => sut.search('Cat'));
    });
  });

  describe('getRandomGif', () => {
    it('sends GET request to the correct endpoint', () => {
      testUseOfEndpoint(
        () => sut.getRandomGif(),
        ['v1/gifs/random'],
        {data: gifStub},
        gifStub
      );
    });

    it('throws error when networking service is failed', () => {
      testFailure(() => sut.getRandomGif());
    });
  });

  function testUseOfEndpoint<T>(
    testFunction: () => Observable<T>,
    endpointWithParams: [string] | [string, string],
    mockResponse: any,
    expectedResponse: any,
  ) {
    const next = jest.fn();
    networkingService.getJSON.mockReturnValue(of(mockResponse));

    testFunction().subscribe(next);

    expect(networkingService.getJSON).toBeCalledWith(...endpointWithParams);
    expect(next).toBeCalledWith(expectedResponse);
  }

  function testFailure<T>(testFunction: () => Observable<T>) {
    const next = jest.fn();
    const error = jest.fn();
    const apiError = {
      status: 404,
      errorMessages: [],
    };
    networkingService.getJSON.mockReturnValue(throwError(apiError));

    testFunction().subscribe(next, error);

    expect(next).not.toBeCalled();
    expect(error).toBeCalledWith(apiError);
  }
});
