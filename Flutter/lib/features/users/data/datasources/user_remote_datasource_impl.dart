// lib/features/users/data/datasources/user_remote_datasource_impl.dart

import 'package:dio/dio.dart';

import '../models/user_model.dart';
import 'user_remote_datasource.dart';

class UserRemoteDataSourceImpl
    implements UserRemoteDataSource {

  final Dio dio;

  UserRemoteDataSourceImpl(this.dio);

  @override
  Future<List<UserModel>> getUsers() async {

    final stopwatch = Stopwatch()
      ..start();

    print(
      '========================',
    );

    print(
      'API REQUEST START',
    );

 

    final response = await dio.get(
      'https://jsonplaceholder.typicode.com/users',
    );

    stopwatch.stop();

    print(
      '========================',
    );

    print(
      'API REQUEST FINISHED',
    );

    print(
      'TIME: ${stopwatch.elapsedMilliseconds} ms',
    );

    print(
      '========================',
    );

final data = response.data as List;

final originalUsers = data.map(
  (e) => UserModel.fromJson(e),
).toList();

final users = <UserModel>[];

for (int i = 0; i < 1; i++) {

  for (final user in originalUsers) {

    users.add(
      UserModel(
        id: user.id + (i * 100),
        name: '${user.name} $i',
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
      ),
    );
  }
}

print(
  'TOTAL USERS GENERATED: ${users.length}',
);

return users;
  }
}