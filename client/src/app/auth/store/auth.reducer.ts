import { createReducer, on } from '@ngrx/store';
import { Login, Logout, Update } from './auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(Login, (state, { user, token }) => {
    return {
      ...state,
      user: { ...user, token },
    };
  }),
  on(Logout, (state) => {
    return {
      ...state,
      user: null,
      token: null,
    };
  }),
  on(Update, (state, { user }) => {
    return {
      ...state,
      user,
    };
  })
);
