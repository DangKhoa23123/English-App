import 'package:flutter/material.dart';
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
      ),
    );
  }
}
