import { User } from '../auth/user.model';

export interface Message {
  user: User;
  text: string;
  createdAt: string;
  _id: string;
  projectId: string;
}
