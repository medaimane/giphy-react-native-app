import {Observable} from 'rxjs';
import {GifJSON, GifsJSON} from '../models/GifJSON';

export interface GifGateway {
  getRandomGif(): Observable<GifJSON | null>;
  search(text: string): Observable<GifJSON[]>;
}
