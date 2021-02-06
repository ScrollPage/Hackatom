export interface IAccessRequest {
  id: number;
  initiative: {
    id: number;
    name: string;
    company: string;
  }
}

export interface IJoinRequest extends IAccessRequest {
  role: string;
}