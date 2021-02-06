export interface IMessage {
  id: number;
  initiative: {
    id: number;
    company: string;
  }
  content: string;
  timestamp: string;
  url: string;
}