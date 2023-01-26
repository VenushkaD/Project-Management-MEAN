import { User } from '../auth/user.model';

export interface Task {
  _id: string;
  name: string;
  description: string;
  assignedMembers: User[];
  documentUrls: string[];
  progress: number;
  dueDate: string;
  checkList: [
    {
      name: string;
      checked: boolean;
    }
  ];
  cover: string;
}
