import {Observable} from 'rxjs';
import {GifJSON} from '../models/GifJSON';

export interface GifGateway {
  getRandomGif(): Observable<GifJSON | null>;
  search(text: string): Observable<GifJSON[]>;
}
