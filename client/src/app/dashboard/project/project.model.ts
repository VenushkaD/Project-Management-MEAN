import { User } from '../../auth/user.model';
import { Task } from './task.model';

export class Project {
  constructor(
    public _id: number,
    public title: string,
    public description: string,
    public imageUrl: string,
    public dueDate: Date,
    public members: {
      id: string;
      name: string;
      email: string;
      imageUrl: string;
    }[],
    public tasks: Task[],
    public completed: boolean = false,
    public createdBy: User
  ) {}
}
