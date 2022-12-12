export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
    slug: {
      current: string;
    };
  };
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Author {
  _id: string;
  name: string;
  bio: Array;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
