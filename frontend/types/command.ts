import { IOption } from "./option";

export interface ICommand {
  name: string;
  is_initiator: boolean;
  rate?: string;
  num_members: number;
  joined: boolean;
  is_sent_join: boolean;
  is_sent_access: boolean;
  can_downolad: boolean;
  chat_id: number;
  membership_id: number;
  initiator: {
    id: number;
    name: string;
    company: string;
  }
  info: {
    id: number;
    categories: IOption[];
    requirenments: IOption[];
    title: string;
    idea?: string;
    end_time?: string;
    description: string;
  }
}