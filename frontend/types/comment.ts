export interface IComment {
  id: number;
  timestamp: string;
  content: string;
  initiative: {
    id: number;
    name: string;
    company: string;
  }
}