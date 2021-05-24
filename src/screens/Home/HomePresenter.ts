import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Presenter} from '../../Presenter/Presenter';
import {RemoteDataState} from '../../Presenter/RemoteDataState';
import {local} from '../../Localization/local';
import {GifPresentable, makeGifPresentable, NullGif} from '../GifPresentable';
import {GifGateway} from '../../services/apis/GiphyService/GifGateway';
import {GifJSON} from '../../services/apis/models/GifJSON';

export interface HomeOutput {
  searchText: string;
  isSearchInputFocused: boolean;

  title: string;

  viewState: RemoteDataState;

  gif: GifPresentable;

  gifs: GifPresentable[];
}

export class HomePresenter extends Presenter<HomeOutput> {
  private readonly searchSubject = new Subject<string>();

  constructor(private readonly gifGateway: GifGateway) {
    super();

    this.searchSubject.pipe(debounceTime(1000)).subscribe((text) => {
      this.gifGateway
        .search(text)
        .subscribe(this.handleSearchSuccess, this.handleSearchError);
    });
  }

  getInitialOutput(): HomeOutput {
    return {
      title: local.randomSelectedGif,
      isSearchInputFocused: false,
      searchText: '',
      viewState: RemoteDataState.Loading,
      gif: NullGif,
      gifs: [],
    };
  }

  onSearchClear = () => {
    this.update({gifs: []});
  };

  onSearchFocus = () => {
    this.update({
      title: local.searchResults,
      isSearchInputFocused: true,
    });
  };

  onSearchCancel = () => {
    this.update({
      title: local.randomSelectedGif,
      isSearchInputFocused: false,
      gifs: [],
    });
  };

  search = (text: string) => {
    const isInputEmpty = text.length === 0;
    const viewState = isInputEmpty
      ? RemoteDataState.Data
      : RemoteDataState.Loading;

    this.update({
      gifs: [],
      viewState,
      searchText: text,
    });

    if (!isInputEmpty) {
      this.searchSubject.next(text);
    }
  };

  fetchRandomGif = () => {
    this.update({viewState: RemoteDataState.Loading});

    this.gifGateway
      .getRandomGif()
      .subscribe(this.handleSuccess, this.handleError);
  };

  private handleSuccess = (gif: GifJSON) => {
    this.update({
      viewState: RemoteDataState.Data,
      gif: makeGifPresentable(gif),
    });
  };

  private handleError = () => {
    this.update({viewState: RemoteDataState.Error});
  };

  private handleSearchSuccess = (gifs: GifJSON[]) => {
    const isEmpty = gifs.length === 0;

    this.update({
      viewState: isEmpty ? RemoteDataState.Empty : RemoteDataState.Data,
      gifs: gifs.map(makeGifPresentable),
    });
  };

  private handleSearchError = () => {
    this.update({viewState: RemoteDataState.Error});
  };
}
