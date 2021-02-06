export interface IChatMember {
  id: number;
  name: string;
  company: string;
}

export interface IChat {
  id: number;
  members: IChatMember[];
  name: string;
  is_chat: boolean;
  command: number;
}