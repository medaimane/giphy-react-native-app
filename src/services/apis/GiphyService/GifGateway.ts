import {Observable} from 'rxjs';
import {GifJSON} from '../models/GifJSON';

export interface GifGateway {
  getRandomGif(): Observable<GifJSON>;
  search(text: string): Observable<GifJSON[]>;
}
