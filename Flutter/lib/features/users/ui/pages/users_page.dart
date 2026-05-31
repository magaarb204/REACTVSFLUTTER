// lib/features/users/ui/pages/users_page.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/user.dart';
import '../notifiers/user_notifier.dart';

import 'user_detail_page.dart';
import 'user_form_page.dart';

class UsersPage extends ConsumerWidget {

  const UsersPage({super.key});

  @override
  Widget build(
    BuildContext context,
    WidgetRef ref,
  ) {

    final buildStopwatch =
        Stopwatch()..start();

    print(
      'UsersPage rebuild',
    );

    final usersState =
        ref.watch(userNotifierProvider);

    return Scaffold(

      appBar: AppBar(

        title: const Text(
          'Users',
        ),

        actions: [

          IconButton(

            onPressed: () {

              ref
                  .read(
                    userNotifierProvider
                        .notifier,
                  )
                  .refreshUsers();
            },

            icon: const Icon(
              Icons.refresh,
            ),
          ),
        ],
      ),

      floatingActionButton:
          FloatingActionButton(

        onPressed: () {

          Navigator.push(

            context,

            MaterialPageRoute(

              builder: (_) =>
                  const UserFormPage(),
            ),
          );
        },

        child: const Icon(Icons.add),
      ),

      body: usersState.when(

        data: (users) {

          buildStopwatch.stop();

          print(
            '========================',
          );

          print(
            'USERS PAGE RENDERED',
          );

          print(
            'TIME: ${buildStopwatch.elapsedMilliseconds} ms',
          );

          print(
            'USERS COUNT: ${users.length}',
          );

          print(
            '========================',
          );

          return ListView.builder(

            itemCount: users.length,

            itemBuilder: (context, index) {

              final user = users[index];

              return ListTile(

                title: Text(user.name),

                subtitle:
                    Text(user.email),

                onTap: () {

                  Navigator.push(

                    context,

                    MaterialPageRoute(

                      builder: (_) =>
                          UserDetailPage(
                        user: user,
                      ),
                    ),
                  );
                },

                trailing: Row(

                  mainAxisSize:
                      MainAxisSize.min,

                  children: [

                    IconButton(

                      onPressed: () {

                        Navigator.push(

                          context,

                          MaterialPageRoute(

                            builder: (_) =>
                                UserFormPage(
                              user: user,
                            ),
                          ),
                        );
                      },

                      icon: const Icon(
                        Icons.edit,
                      ),
                    ),

                    IconButton(

                      onPressed: () {

                        ref
                            .read(
                              userNotifierProvider
                                  .notifier,
                            )
                            .deleteUser(
                              user.id,
                            );
                      },

                      icon: const Icon(
                        Icons.delete,
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        },

        loading: () => const Center(
          child:
              CircularProgressIndicator(),
        ),

        error: (e, _) => Center(
          child: Text(
            e.toString(),
          ),
        ),
      ),
    );
  }
}