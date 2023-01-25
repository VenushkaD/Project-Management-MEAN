import { Message } from './message.model';

export interface Messages {
  _id: string;
  project: string;
  messages: Message[];
}
