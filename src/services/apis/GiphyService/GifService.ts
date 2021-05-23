import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GifJSON, GifsJSON} from '../models/GifJSON';
import {NetworkingService} from '../networking/NetworkingService';
import {GifGateway} from './GifGateway';

export class GifService implements GifGateway {
  constructor(private readonly networkingService: NetworkingService) {}

  getRandomGif(): Observable<GifJSON | null> {
    return this.networkingService
      .getJSON<GifsJSON>(`v1/gifs/trending`, '&limit=1')
      .pipe(map<GifsJSON, GifJSON>((json) => json.data[0] ?? null));
  }

  search(text: string): Observable<GifJSON[]> {
    return this.networkingService
      .getJSON<GifsJSON>('v1/gifs/search', `&q=${text}`)
      .pipe(map<GifsJSON, GifJSON[]>((json) => json.data));
  }
}
