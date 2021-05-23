export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface Images {
  original: Original;
}

export interface GifJSON {
  id: string;
  slug: string;
  title: string;
  rating: string;
  images: Images;
}

export interface GifsJSON {
  data: GifJSON[];
}

export const NullImage: Original = {
  height: '',
  size: '',
  url: '',
  width: '',
};

export const NullGifJSON: GifJSON = {
  images: {
    original: NullImage,
  },
  rating: '',
  slug: '',
  title: '',
  id: '',
};
