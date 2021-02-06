export interface ITask {
  id: number;
  initiative: {
    id: number;
    name: string;
    company: string;
  }
  begin_time: string;
  end_time: string;
  name: string;
  description: string;
  percentage: number;
}