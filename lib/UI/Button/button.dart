import 'package:flutter/material.dart';
import 'package:new_app/color/color.dart';


class CustomTextField {
  static Widget build({
    required String hint,
    Color? fillColor,
    IconData? icon,
    TextEditingController? controller,
    bool obscure = false,
  }) {
    return TextField(
      controller: controller,
      obscureText: obscure,
      decoration: InputDecoration(
        hintText: hint,
        prefixIcon: icon != null ? Icon(icon) : null,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
        filled: true,
        fillColor: fillColor ?? ColorsApp.white,
      ),
    );
  }
}