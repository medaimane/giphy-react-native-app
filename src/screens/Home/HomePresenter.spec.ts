import {of, throwError} from 'rxjs';
import {local} from '../../Localization/local';
import {RemoteDataState} from '../../Presenter/RemoteDataState';
import {HomeOutput, HomePresenter} from './HomePresenter';
import {TestAssembly} from '../../../__tests__/stubs/TestAssembly';
import {gifStub} from '../../../__tests__/stubs/gifStub';

describe('HomePresenter', () => {
  let sut: HomePresenter;
  let dependencies: TestAssembly;

  const updateHandlerSpy = jest.fn();

  beforeEach(() => {
    dependencies = new TestAssembly();

    sut = new HomePresenter(dependencies.gifGateway);
    sut.setUpdateHandler(updateHandlerSpy);

    dependencies.gifGateway.getRandomGif.mockReturnValue(of(void 0));
    dependencies.gifGateway.search.mockReturnValue(of(void 0));
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
    it('outputs a specific title, isSearchInputFocused as false and gifs as empty array', () => {
      sut.onSearchCancel();

      expectUpdate({
        isSearchInputFocused: false,
        title: local.randomSelectedGif,
        gifs: [],
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

  describe('onSearchClear', () => {
    it('outputs a specific title, isSearchInputFocused as true and gifs equal to an empty array', () => {
      sut.onSearchClear();

      expectUpdate({
        title: local.searchResults,
        isSearchInputFocused: true,
        gifs: [],
      });
    });
  });

  describe('search', () => {
    describe('when text input is empty', () => {
      it('outputs viewState as Data, gifs as empty array and searchText equal to text input', () => {
        sut.search('');

        expectUpdate({
          gifs: [],
          viewState: RemoteDataState.Data,
          searchText: '',
        });
      });

      it('does not call gateway', () => {
        sut.search('');

        expect(dependencies.gifGateway.search).not.toBeCalled();
      });
    });

    describe('when text input is not empty', () => {
      it('outputs viewState as Loading, gifs as empty array and searchText equal to text input', () => {
        sut.search('Cat');

        expectUpdate({
          gifs: [],
          viewState: RemoteDataState.Loading,
          searchText: 'Cat',
        });
      });

      it('calls gateway with search text as param', () => {
        sut.search('Cat');

        expect(dependencies.gifGateway.search).toBeCalledWith('Cat');
      });

      it('has debounce on search', () => {
        sut.search('C');
        sut.search('Ca');
        sut.search('Cat');

        expectUpdate({searchText: 'Cat'});
        expect(dependencies.gifGateway.search).toBeCalledTimes(1);
        expect(dependencies.gifGateway.search).toBeCalledWith('Cat');
      });

      describe('when search success', () => {
        it('outputs viewState as Data and presentables gifs', () => {
          dependencies.gifGateway.search.mockReturnValue(of([gifStub]));

          sut.search('Cat');

          expectUpdate({
            viewState: RemoteDataState.Data,
            gifs: [
              {
                id: 'some id',
                rating: 'some rating',
                slug: 'some slug',
                title: 'some title',
                url: 'some url',
              },
            ],
          });
        });

        it('outputs viewState as Empty if an empty array of gifs is received', () => {
          dependencies.gifGateway.search.mockReturnValue(of([]));

          sut.search('Cat');

          expectUpdate({
            viewState: RemoteDataState.Empty,
            gifs: [],
          });
        });
      });

      describe('when search failure', () => {
        it('outputs viewState as Error', () => {
          dependencies.gifGateway.search.mockReturnValue(of([gifStub]));

          sut.search('Cat');

          expectUpdate({
            viewState: RemoteDataState.Error,
          });
        });
      });
    });
  });

  function expectUpdate(output: Partial<HomeOutput>) {
    expect(updateHandlerSpy).toBeCalledWith(expect.objectContaining(output));
  }
});
