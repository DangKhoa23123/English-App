import 'package:flutter/material.dart';
import 'package:new_app/color/color.dart';

class GraPrimaryBlack {
  static const LinearGradient purpleToBlack = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [
      ColorsApp.purple,
      ColorsApp.black,
    ],
    // stops: [
    //   0.3,
    //   1.0,
    // ],
  );
}
