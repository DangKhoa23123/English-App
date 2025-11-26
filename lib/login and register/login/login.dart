import 'package:flutter/material.dart';
import 'package:new_app/UI/TextField/textField.dart';
import 'package:new_app/color/color.dart';
import 'package:new_app/gradient/gradient.dart';

class LoginScreenState extends StatefulWidget {
  const LoginScreenState({super.key});

  @override
  State<LoginScreenState> createState() => _LoginScreenStateState();
}

class _LoginScreenStateState extends State<LoginScreenState> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: GraPrimaryBlack.purpleToBlack,
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CustomTextField.build(
                hint: "Enter your Email",
                icon: Icons.email,
              ),
              const SizedBox(height: 16),
              CustomTextField.build(
                hint: "Enter your Password",
                icon: Icons.lock,
                obscure: true,
              ),
              const SizedBox(height: 16),
              TextButton(onPressed: () {}, child: const Text('Login')),
              TextButton(
                onPressed: () {},
                child: const Text('Forgot password?'),
              ),
              TextButton.icon(
                onPressed: () {},
                // icon: const Icon(Icons.login),
                label: const Text('Login with Google'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
