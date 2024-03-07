import 'dart:convert';

import 'package:ev_simulator/model/news_model.dart';
import 'package:http/http.dart' as http;

class ApiServices {
  final apiKEY = "aadf90d688ae4b29b5ba3eaa7497a12c";

  Future<List<NewsModel>> getNews() async {
    List<NewsModel> newsList = [];
    final response = await http.get(
      Uri.parse(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=$apiKEY"),
    );
    if (response.statusCode == 200) {
      final result = jsonDecode(response.body)["articles"];
      for (var i in result) {
        newsList.add(NewsModel.fromJson(i));
      }
      print(newsList[0]);
      return newsList;
    } else {
      throw Exception("Failed to load news");
    }
  }
}
