// lib/features/users/ui/notifiers/user_notifier.dart

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/datasources/user_remote_datasource_impl.dart';
import '../../data/repositories/user_repository_impl.dart';
import '../../domain/entities/user.dart';

final userNotifierProvider =
    StateNotifierProvider<UserNotifier,
        AsyncValue<List<User>>>((ref) {

  final dio = Dio();

  final repository = UserRepositoryImpl(

    remoteDataSource:
        UserRemoteDataSourceImpl(dio),
  );

  return UserNotifier(repository);
});

class UserNotifier
    extends StateNotifier<AsyncValue<List<User>>> {

  final UserRepositoryImpl repository;

  UserNotifier(this.repository)
      : super(const AsyncLoading()) {

    loadUsers();
  }

  Future<void> loadUsers() async {

    try {

      print(
        '========================',
      );

      print(
        'LOAD USERS START',
      );

      state = const AsyncLoading();

      final users =
          await repository.getUsers();

      state = AsyncData(users);

      print(
        'LOAD USERS FINISHED',
      );

      print(
        '========================',
      );

    } catch (e, stack) {

      state = AsyncError(e, stack);
    }
  }

  void addUser(User user) {

    final currentUsers =
        state.value ?? [];

    state = AsyncData([
      ...currentUsers,
      user,
    ]);

    print(
      '========================',
    );

    print(
      'USER CREATED',
    );

    print(
      'USER: ${user.name}',
    );

    print(
      'TOTAL USERS: ${currentUsers.length + 1}',
    );

    print(
      '========================',
    );
  }

  void deleteUser(int id) {

    final currentUsers =
        state.value ?? [];

    state = AsyncData(

      currentUsers.where(
        (u) => u.id != id,
      ).toList(),
    );

    print(
      '========================',
    );

    print(
      'USER DELETED',
    );

    print(
      'ID: $id',
    );

    print(
      '========================',
    );
  }

  void updateUser(User updatedUser) {

    final currentUsers =
        state.value ?? [];

    state = AsyncData(

      currentUsers.map((user) {

        if (user.id == updatedUser.id) {

          return updatedUser;
        }

        return user;

      }).toList(),
    );

    print(
      '========================',
    );

    print(
      'USER UPDATED',
    );

    print(
      'USER: ${updatedUser.name}',
    );

    print(
      '========================',
    );
  }

  Future<void> refreshUsers() async {

    final stopwatch = Stopwatch()
      ..start();

    print(
      '========================',
    );

    print(
      'REFRESH STARTED',
    );

    await loadUsers();

    stopwatch.stop();

    print(
      'REFRESH FINISHED',
    );

    print(
      'TIME: ${stopwatch.elapsedMilliseconds} ms',
    );

    print(
      '========================',
    );
  }
}