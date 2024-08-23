type CoverImage = {
    url: string;
}

export type Image = {
    _key: string;
    url: string;
}

type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
}

type Slug = {
    _type: string;
    current: string;
}

type Dimensions = {
    area: number;
    units: string;
}

export type Room = {
    _id: string;
    description: string;
    dimensions: Dimensions;
    discount: number;
    isFeatured: boolean;
    name: string;
    price: number;
    images: Image[]
    coverImage: CoverImage;
    isBooked: boolean;
    numBeds: number;
    offeredAmenities: Amenity[];
    slug: Slug;
    specialNotes: string;
    type: string;
}