import 'package:flutter/material.dart';

import '../../domain/entities/user.dart';

class UserDetailPage
    extends StatelessWidget {

  final User user;

  const UserDetailPage({
    super.key,
    required this.user,
  });

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: Text(user.name),
      ),

      body: Padding(

        padding: const EdgeInsets.all(16),

        child: Column(

          crossAxisAlignment:
              CrossAxisAlignment.start,

          children: [

            Text(
              'Username: ${user.username}',
            ),

            const SizedBox(height: 12),

            Text(
              'Email: ${user.email}',
            ),

            const SizedBox(height: 12),

            Text(
              'Phone: ${user.phone}',
            ),

            const SizedBox(height: 12),

            Text(
              'Website: ${user.website}',
            ),
          ],
        ),
      ),
    );
  }
}