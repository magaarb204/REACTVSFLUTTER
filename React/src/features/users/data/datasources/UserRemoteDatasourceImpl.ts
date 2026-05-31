// src/features/users/data/datasources/UserRemoteDatasourceImpl.ts

import { UserModel, userModelFromJson } from '../models/UserModel';
import { UserRemoteDatasource } from './UserRemoteDatasource';

export class UserRemoteDatasourceImpl implements UserRemoteDatasource {
  async getUsers(): Promise<UserModel[]> {
    const stopwatch = Date.now();

    console.log('========================');
    console.log('API REQUEST START');

    // Artificial delay — mirrors Flutter's Future.delayed(2s)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/users',
    );

    const elapsed = Date.now() - stopwatch;

    console.log('========================');
    console.log('API REQUEST FINISHED');
    console.log(`TIME: ${elapsed} ms`);
    console.log('========================');

    const data = (await response.json()) as Record<string, unknown>[];

    return data.map((e) => userModelFromJson(e));
  }
}
