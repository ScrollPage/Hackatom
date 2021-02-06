import { IComment } from "./comment";

export interface IPost {
  id: number;
  title?: string;
  picture?: string;
  num_likes: number;
  is_liked: boolean;
  post_time: string;
  num_comments: number;
  initiative: {
    id: number;
    name: string;
    company: string;
  }
  last_comment?: IComment;
}