import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/datasources/user_remote_datasource_impl.dart';
import '../../data/repositories/user_repository_impl.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/user_repository.dart';

final userRepositoryProvider =
    Provider<UserRepository>((ref) {

  final dio = Dio();

  return UserRepositoryImpl(

    remoteDataSource:
        UserRemoteDataSourceImpl(dio),
  );
});

final usersProvider =
    FutureProvider<List<User>>((ref) async {

  print(
    'RIVERPOD EJECUTO PROVIDER',
  );

  return ref
      .read(userRepositoryProvider)
      .getUsers();
});