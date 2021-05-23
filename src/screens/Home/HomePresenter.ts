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
  constructor(private readonly gifGateway: GifGateway) {
    super();
  }

  getInitialOutput(): HomeOutput {
    return {
      title: '',

      isSearchInputFocused: false,
      searchText: '',

      viewState: RemoteDataState.Loading,

      gif: NullGif,

      gifs: [],
    };
  }

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
    });

    this.fetchRandomGif();
  };

  search = (text: string) => {
    this.update({searchText: text});
  };

  fetchRandomGif = () => {
    this.update({
      title: local.randomSelectedGif,
      viewState: RemoteDataState.Loading,
    });

    this.gifGateway
      .getRandomGif()
      .subscribe(this.handleSuccess, this.handleError);
  };

  private handleSuccess = (gif: GifJSON | null) => {
    if (!gif) {
      this.update({viewState: RemoteDataState.Empty});
    } else {
      this.update({
        viewState: RemoteDataState.Data,
        gif: makeGifPresentable(gif),
      });
    }
  };

  private handleError = () => {
    this.update({viewState: RemoteDataState.Error});
  };
}
