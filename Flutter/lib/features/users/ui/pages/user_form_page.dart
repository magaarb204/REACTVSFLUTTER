import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/user.dart';
import '../notifiers/user_notifier.dart';

class UserFormPage
    extends ConsumerStatefulWidget {

  final User? user;

  const UserFormPage({
    super.key,
    this.user,
  });

  @override
  ConsumerState<UserFormPage>
      createState() =>
          _UserFormPageState();
}

class _UserFormPageState
    extends ConsumerState<UserFormPage> {

  late final TextEditingController
      nameController;

  late final TextEditingController
      usernameController;

  late final TextEditingController
      emailController;

  late final TextEditingController
      phoneController;

  late final TextEditingController
      websiteController;

  @override
  void initState() {

    super.initState();

    nameController =
        TextEditingController(
      text: widget.user?.name ?? '',
    );

    usernameController =
        TextEditingController(
      text: widget.user?.username ?? '',
    );

    emailController =
        TextEditingController(
      text: widget.user?.email ?? '',
    );

    phoneController =
        TextEditingController(
      text: widget.user?.phone ?? '',
    );

    websiteController =
        TextEditingController(
      text: widget.user?.website ?? '',
    );
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(

        title: Text(

          widget.user == null
              ? 'Crear User'
              : 'Editar User',
        ),
      ),

      body: Padding(

        padding: const EdgeInsets.all(16),

        child: Column(

          children: [

            TextField(
              controller: nameController,
              decoration:
                  const InputDecoration(
                labelText: 'Name',
              ),
            ),

            TextField(
              controller:
                  usernameController,
              decoration:
                  const InputDecoration(
                labelText: 'Username',
              ),
            ),

            TextField(
              controller: emailController,
              decoration:
                  const InputDecoration(
                labelText: 'Email',
              ),
            ),

            TextField(
              controller: phoneController,
              decoration:
                  const InputDecoration(
                labelText: 'Phone',
              ),
            ),

            TextField(
              controller:
                  websiteController,
              decoration:
                  const InputDecoration(
                labelText: 'Website',
              ),
            ),

            const SizedBox(height: 24),

            ElevatedButton(

              onPressed: () {

                final notifier = ref.read(
                  userNotifierProvider
                      .notifier,
                );

                final user = User(

                  id: widget.user?.id ??
                      DateTime.now()
                          .millisecondsSinceEpoch,

                  name:
                      nameController.text,

                  username:
                      usernameController
                          .text,

                  email:
                      emailController.text,

                  phone:
                      phoneController.text,

                  website:
                      websiteController
                          .text,
                );

                if (widget.user == null) {

                  notifier.addUser(user);

                } else {

                  notifier.updateUser(
                    user,
                  );
                }

                Navigator.pop(context);
              },

              child: Text(

                widget.user == null
                    ? 'Crear'
                    : 'Actualizar',
              ),
            ),
          ],
        ),
      ),
    );
  }
}