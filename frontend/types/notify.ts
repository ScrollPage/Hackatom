export interface IMessageNotify {
  chat: {
    is_chat: boolean;
    chat_name: string;
  },
  sender: {
    sender_id: number;
    sender_company: string;
  }
}

export interface IAccessNotify {
  command: string;
}

export interface IJoinNotify extends IAccessNotify {
  role: string;
}