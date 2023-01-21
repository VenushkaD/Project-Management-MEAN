import { User } from '../auth/user.model';
import { Task } from './task.model';

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  members: any[];
  dueDate: string;
  tasks: Task[];
  createdBy: User;
  completed: boolean;
}
