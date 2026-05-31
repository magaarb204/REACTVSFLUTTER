// src/features/users/ui/store/userStore.ts
// Equivalent to Flutter's UserNotifier (Riverpod StateNotifier)

import { create } from 'zustand';
import { User } from '../../domain/entities/User';
import { UserRemoteDatasourceImpl } from '../../data/datasources/UserRemoteDatasourceImpl';
import { UserRepositoryImpl } from '../../data/repositories/UserRepositoryImpl';

type AsyncState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'data'; users: User[] };

interface UserStore {
  state: AsyncState;
  loadUsers: () => Promise<void>;
  refreshUsers: () => Promise<void>;
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
  updateUser: (updatedUser: User) => void;
}

// Wired dependencies — mirrors Flutter's provider factory
const repository = new UserRepositoryImpl(new UserRemoteDatasourceImpl());

export const useUserStore = create<UserStore>((set, get) => ({
  state: { status: 'loading' },

  loadUsers: async () => {
    try {
      console.log('========================');
      console.log('LOAD USERS START');

      set({ state: { status: 'loading' } });

      const users = await repository.getUsers();

      set({ state: { status: 'data', users } });

      console.log('LOAD USERS FINISHED');
      console.log('========================');
    } catch (e) {
      set({ state: { status: 'error', error: String(e) } });
    }
  },

  refreshUsers: async () => {
    const stopwatch = Date.now();

    console.log('========================');
    console.log('REFRESH STARTED');

    await get().loadUsers();

    const elapsed = Date.now() - stopwatch;

    console.log('REFRESH FINISHED');
    console.log(`TIME: ${elapsed} ms`);
    console.log('========================');
  },

  addUser: (user: User) => {
    const current = get().state;
    const currentUsers = current.status === 'data' ? current.users : [];

    set({ state: { status: 'data', users: [...currentUsers, user] } });

    console.log('========================');
    console.log('USER CREATED');
    console.log(`USER: ${user.name}`);
    console.log(`TOTAL USERS: ${currentUsers.length + 1}`);
    console.log('========================');
  },

  deleteUser: (id: number) => {
    const current = get().state;
    const currentUsers = current.status === 'data' ? current.users : [];

    set({
      state: {
        status: 'data',
        users: currentUsers.filter((u) => u.id !== id),
      },
    });

    console.log('========================');
    console.log('USER DELETED');
    console.log(`ID: ${id}`);
    console.log('========================');
  },

  updateUser: (updatedUser: User) => {
    const current = get().state;
    const currentUsers = current.status === 'data' ? current.users : [];

    set({
      state: {
        status: 'data',
        users: currentUsers.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        ),
      },
    });

    console.log('========================');
    console.log('USER UPDATED');
    console.log(`USER: ${updatedUser.name}`);
    console.log('========================');
  },
}));
