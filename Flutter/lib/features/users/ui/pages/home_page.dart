import 'package:flutter/material.dart';

import 'users_page.dart';

class HomePage extends StatelessWidget {

  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text(
          'Flutter Demo',
        ),
      ),

      body: Center(

        child: ElevatedButton(

          onPressed: () {

            Navigator.push(

              context,

              MaterialPageRoute(

                builder: (_) =>
                    const UsersPage(),
              ),
            );
          },

          child: const Text(
            'Ir a Users',
          ),
        ),
      ),
    );
  }
}