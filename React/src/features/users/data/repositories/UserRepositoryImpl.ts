// src/features/users/data/repositories/UserRepositoryImpl.ts

import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserRemoteDatasource } from '../datasources/UserRemoteDatasource';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly remoteDataSource: UserRemoteDatasource) {}

  async getUsers(): Promise<User[]> {
    return this.remoteDataSource.getUsers();
  }
}
