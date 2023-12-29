import {GifJSON} from '../services/apis/models/GifJSON';

export interface GifPresentable {
  id: string;
  title: string;
  slug: string;
  url: string;
}

export const NullGif: GifPresentable = {
  title: '',
  slug: '',
  url: '',
  id: '',
};

export function makeGifPresentable(gif: GifJSON): GifPresentable {
  return {
    title: gif.title,
    url: gif.images.original.url,
    slug: gif.slug,
    id: gif.id,
  };
}
