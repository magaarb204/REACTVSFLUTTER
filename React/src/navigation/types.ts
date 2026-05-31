// src/navigation/types.ts

import { User } from '../features/users/domain/entities/User';

export type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  UserDetail: { user: User };
  UserForm: { user?: User };
};
