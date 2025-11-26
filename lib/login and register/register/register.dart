import 'package:flutter/material.dart';
import 'package:new_app/UI/Button/button.dart';
import 'package:new_app/login%20and%20register/login/login.dart';
import 'package:new_app/gradient/gradient.dart';
import 'package:new_app/UI/TextField/textField.dart';


class RegisterScreenState extends StatefulWidget {
  const RegisterScreenState({super.key});

  @override
  State<RegisterScreenState> createState() => _RegisterScreenStateState();
}

class _RegisterScreenStateState extends State<RegisterScreenState> {
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
              CustomTextField.build(
                hint: "Enter your Confirm Password",
                icon: Icons.lock,
                obscure: true,
              ),
              const SizedBox(height: 16),
              CustomButton.build(
                name: 'login',
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
              ),
            ],
          ),
        ),
      ),
    );
  }
}
