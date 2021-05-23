import {GifJSON} from '../services/apis/models/GifJSON';

export interface GifPresentable {
  id: string;
  title: string;
  slug: string;
  url: string;
  rating: string;
}

export const NullGif: GifPresentable = {
  rating: '',
  title: '',
  slug: '',
  url: '',
  id: '',
};

export function makeGifPresentable(gif: GifJSON): GifPresentable {
  return {
    rating: gif.rating,
    title: gif.title,
    url: gif.images.original.url,
    slug: gif.slug,
    id: gif.id,
  };
}
