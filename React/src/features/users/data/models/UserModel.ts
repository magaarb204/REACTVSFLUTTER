// src/features/users/data/models/UserModel.ts

import { User } from '../../domain/entities/User';

export interface UserModel extends User {}

export function userModelFromJson(json: Record<string, unknown>): UserModel {
  return {
    id: json['id'] as number,
    name: json['name'] as string,
    username: json['username'] as string,
    email: json['email'] as string,
    phone: json['phone'] as string,
    website: json['website'] as string,
  };
}

export function userModelToJson(user: UserModel): Record<string, unknown> {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
  };
}
