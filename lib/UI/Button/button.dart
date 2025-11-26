import 'package:flutter/material.dart';
import 'package:new_app/color/color.dart';


class CustomButton {
  static Widget build({
    IconData? icon,
    VoidCallback? onPressed,
    Widget? label,
    String? name,
  }) {
    return TextButton.icon(
      onPressed: onPressed,
      icon: icon != null ? Icon(icon) : null,
      label: label ?? Text(name ?? 'Button'),
    );
  }
}