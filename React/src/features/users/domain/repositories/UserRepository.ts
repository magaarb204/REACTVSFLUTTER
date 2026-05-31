// src/features/users/domain/repositories/UserRepository.ts

import { User } from '../entities/User';

export interface UserRepository {
  getUsers(): Promise<User[]>;
}
