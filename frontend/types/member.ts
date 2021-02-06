export interface IRole {
  role: string;
  initiative: {
    id: number;
    name: string;
    company: string;
  },
  command: {
    id: number;
    name: string;
  }
}