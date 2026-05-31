// src/features/users/data/datasources/UserRemoteDatasource.ts

import { UserModel } from '../models/UserModel';

export interface UserRemoteDatasource {
  getUsers(): Promise<UserModel[]>;
}
