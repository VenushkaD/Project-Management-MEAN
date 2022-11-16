import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const Login = createAction(
  'Login',
  props<{ user: User; token: string }>()
);

export const Logout = createAction('Logout');
