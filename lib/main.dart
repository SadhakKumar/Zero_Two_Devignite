import 'dart:async';

import 'package:ev_simulator/data/coords.dart';
import 'package:ev_simulator/firebase_options.dart';
import 'package:ev_simulator/styles.dart';
import 'package:ev_simulator/text.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: Home());
  }
}

class Home extends StatefulWidget {
  Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Timer? timer;

  int i = 0;

  double battteryPercentage = 100;
  List<double> currCord = [19.050412, 72.894294];
  double newBattery = 0;

  final modes = ['normal', 'echo'];
  String dropdownvalue = 'normal';

  void startRide() async {
    print("button clicked");
    Timer.periodic(Duration(seconds: 4), (Timer t) async {
      i++;
      setState(() {
        currCord = Coords.data[i];
      });
      if (i % 2 == 0) {
        setState(() {
          battteryPercentage--;
        });
      }
      if (i % 10 == 0) {
        await FirebaseFirestore.instance.collection("ev").doc('at450x').set({
          "battery": battteryPercentage,
          'lat': currCord[0],
          'lon': currCord[1],
          "mode": dropdownvalue
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgLight,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: Text('CarVerse',
            style: AppTextStyles.heading1.copyWith(
              color: Colors.white,
              fontSize: 30,
              fontWeight: FontWeight.bold,
              letterSpacing: 3,
              fontFamily: 'Poppins',
            )),
        centerTitle: true,
        actions: [
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.notifications_outlined,
                size: 20,
                color: Colors.white,
              ))
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 40),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Row(
              children: [
                Text("Model - ",
                    style: TextStyle(fontSize: 20, color: Colors.white)),
                Text(" ather 450x",
                    style: TextStyle(fontSize: 20, color: Colors.white)),
              ],
            ),
            const SizedBox(
              height: 12,
            ),
            const Row(
              children: [
                Text("Your Vechicle Token - ",
                    style: TextStyle(fontSize: 20, color: Colors.white)),
                Text("AT450x",
                    style: TextStyle(fontSize: 20, color: Colors.white)),
              ],
            ),
            const SizedBox(
              height: 12,
            ),
            Row(
              children: [
                const Text("Battery Status - ",
                    style: TextStyle(fontSize: 20, color: Colors.white)),
                Text("${battteryPercentage} %",
                    style: const TextStyle(fontSize: 20, color: Colors.white)),
              ],
            ),
            const SizedBox(
              height: 12,
            ),
            Row(
              children: [
                Text("Current Location - \n${currCord[0]} , ${currCord[1]}",
                    style: const TextStyle(fontSize: 20, color: Colors.white)),
              ],
            ),
            const SizedBox(
              height: 20,
            ),
            DropdownButton(
              value: dropdownvalue,
              style: TextStyle(color: Colors.grey, fontSize: 20),
              icon: const Icon(Icons.keyboard_arrow_down),
              items: modes.map((String items) {
                return DropdownMenuItem(
                  value: items,
                  child: Text(items),
                );
              }).toList(),
              onChanged: (String? newValue) {
                setState(() {
                  dropdownvalue = newValue!;
                });
              },
            ),
            const SizedBox(height: 40),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8)),
                    foregroundColor: Colors.black,
                    backgroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 100, vertical: 16),
                    textStyle: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.black)),
                onPressed: () {
                  startRide();
                },
                child: const Text('Start Ride'),
              ),
            ),
            const SizedBox(
              height: 40,
            ),
            const Divider(),
            const SizedBox(
              height: 40,
            ),
            TextFormField(
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                  focusedBorder: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.white),
                      borderRadius: BorderRadius.circular(12)),
                  border: OutlineInputBorder(
                      borderSide: const BorderSide(color: Colors.white),
                      borderRadius: BorderRadius.circular(12))),
              keyboardType: TextInputType.number,
              onChanged: (value) {
                setState(() {
                  newBattery = double.parse(value);
                });
              },
            ),
            const SizedBox(
              height: 20,
            ),
            Center(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8)),
                    foregroundColor: Colors.black,
                    backgroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 80, vertical: 16),
                    textStyle: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.black)),
                onPressed: () {
                  setState(() {
                    battteryPercentage = newBattery;
                  });
                },
                child: const Text('Reset Battery'),
              ),
            ),
          ]),
        ),
      ),
    );
  }
}
