import 'package:flutter/material.dart';
import 'package:new_app/login%20and%20register/login/login.dart';

class RegisterScreenState extends StatefulWidget {
  const RegisterScreenState({super.key});

  @override
  State<RegisterScreenState> createState() => _RegisterScreenStateState();
}

class _RegisterScreenStateState extends State<RegisterScreenState> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(child: const Icon(Icons.email, size: 50)),
            const SizedBox(height: 20),
            TextButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return const LoginScreenState();
                    },
                  ),
                );
              },
              label: const Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}
