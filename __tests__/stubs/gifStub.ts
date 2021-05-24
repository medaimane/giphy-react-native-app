import {GifJSON, NullImage} from "../../src/services/apis/models/GifJSON";

export const gifStub: GifJSON = {
    id: 'some id',
    title: 'some title',
    slug: 'some slug',
    rating: 'some rating',
    images: {
        original: {
            ...NullImage,
            url: 'some url',
        },
    },
};
