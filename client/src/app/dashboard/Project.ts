export interface Project {
  id: string;
  title: string;
  description: string;
  image: File;
  dueDate: Date;
  members: { id: string; email: string }[];
  subTasks: { name: string }[];
  completed: boolean;
}
