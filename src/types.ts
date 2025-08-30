export type RootStackParamList = {
  Home: undefined;
  PostDetails: { postId: number };
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
