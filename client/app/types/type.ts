export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
}
