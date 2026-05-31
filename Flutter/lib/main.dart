import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'features/users/ui/pages/home_page.dart';

final appStartStopwatch =
    Stopwatch()..start();

void main() {

  WidgetsFlutterBinding.ensureInitialized();

  runApp(

    const ProviderScope(

      child: MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {

  const MyApp({super.key});

  @override
  State<MyApp> createState() =>
      _MyAppState();
}

class _MyAppState
    extends State<MyApp> {

  bool measured = false;

  @override
  Widget build(BuildContext context) {

    if (!measured) {

      measured = true;

      WidgetsBinding.instance
          .addPostFrameCallback((_) {

        appStartStopwatch.stop();

        print(
          '========================',
        );

        print(
          'APP COLD START TIME',
        );

        print(
          'TIME: ${appStartStopwatch.elapsedMicroseconds} µs',
        );

        print(
          '========================',
        );
      });
    }

    return MaterialApp(

      debugShowCheckedModeBanner:
          false,

      title:
          'Flutter Comparison Demo',

      theme: ThemeData(

        useMaterial3: true,
      ),

      home: const HomePage(),
    );
  }
}