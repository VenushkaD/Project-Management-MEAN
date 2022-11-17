import { User } from '../../auth/user.model';
import { Task } from './task.model';

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public image: string,
    public members: {
      id: string;
      name: string;
      email: string;
      imageUrl: string;
    }[],
    public tasks: Task[]
  ) {}
}
