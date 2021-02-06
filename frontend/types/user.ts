import { IOption } from "./option";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  company: string;
  is_superuser: boolean;
  phone_number: string;
  has_chat: boolean;
  chat_id?: number;
  num_reviews: number;
  first_login: boolean;
  info: {
    categories: IOption[];
    requirenments: IOption[];
    title: string;
    description: string;
  }
  rate?: string;
}