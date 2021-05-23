import {of, throwError} from 'rxjs';
import {local} from '../../Localization/local';
import {RemoteDataState} from '../../Presenter/RemoteDataState';
import {HomeOutput, HomePresenter} from './HomePresenter';
import {GifJSON, NullImage} from '../../services/apis/models/GifJSON';
import {TestAssembly} from '../../../__tests__/stubs/TestAssembly';

describe('HomePresenter', () => {
  let sut: HomePresenter;
  let dependencies: TestAssembly;

  const updateHandlerSpy = jest.fn();

  beforeEach(() => {
    dependencies = new TestAssembly();

    sut = new HomePresenter(dependencies.gifGateway);
    sut.setUpdateHandler(updateHandlerSpy);

    dependencies.gifGateway.getRandomGif.mockReturnValue(of(void 0));
  });

  it('outputs initial state', () => {
    expect<HomeOutput>(sut.getInitialOutput()).toEqual({
      title: '',

      searchText: '',
      isSearchInputFocused: false,

      viewState: RemoteDataState.Loading,

      gif: {
        title: '',
        url: '',
        slug: '',
        rating: '',
        id: '',
      },

      gifs: [],
    });
  });

  describe('fetchRandomGif', () => {
    it('outputs a specific title and viewState as Loading', () => {
      sut.fetchRandomGif();

      expectUpdate({
        title: local.randomSelectedGif,
        viewState: RemoteDataState.Loading,
      });
    });

    it('calls getRandomGif from gateway', () => {
      sut.fetchRandomGif();

      expect(dependencies.gifGateway.getRandomGif).toBeCalled();
    });

    describe('when success', () => {
      it('outputs viewState as Data when result is not null', () => {
        dependencies.gifGateway.getRandomGif.mockReturnValue(of(gifStub));

        sut.fetchRandomGif();

        expectUpdate({
          viewState: RemoteDataState.Data,
          gif: {
            id: 'some id',
            rating: 'some rating',
            slug: 'some slug',
            title: 'some title',
            url: 'some url',
          },
        });
      });

      it('outputs viewState as Emty when result is null', () => {
        dependencies.gifGateway.getRandomGif.mockReturnValue(of(null));

        sut.fetchRandomGif();

        expectUpdate({viewState: RemoteDataState.Empty});
      });
    });

    describe('when failure', () => {
      it('outputs viewState as Error', () => {
        dependencies.gifGateway.getRandomGif.mockReturnValue(
          throwError(new Error('any error'))
        );

        sut.fetchRandomGif();

        expectUpdate({viewState: RemoteDataState.Error});
      });
    });
  });

  describe('onSearchCancel', () => {
    it('outputs a specific title and isSearchInputFocused as false', () => {
      sut.onSearchCancel();

      expectUpdate({
        isSearchInputFocused: false,
        title: local.randomSelectedGif,
      });
    });
  });

  describe('onSearchFocus', () => {
    it('outputs a specific title and isSearchInputFocused as true', () => {
      sut.onSearchFocus();

      expectUpdate({
        isSearchInputFocused: true,
        title: local.searchResults,
      });
    });
  });

  function expectUpdate(output: Partial<HomeOutput>) {
    expect(updateHandlerSpy).toBeCalledWith(expect.objectContaining(output));
  }
});

const gifStub: GifJSON = {
  id: 'some id',
  title: 'some title',
  slug: 'some slug',
  rating: 'some rating',
  images: {
    original: {
      ...NullImage,
      url: 'some url',
    },
  },
};
