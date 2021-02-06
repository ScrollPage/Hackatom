export interface IReview {
  id: number;
  timestamp: string;
  content: string;
  rate: number;
  initiative: {
    id: number;
    name: string;
    company: string;
  }
}