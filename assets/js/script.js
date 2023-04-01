var APIKey = "656e6c8ef75718035fce76f2d435d117";
var city; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; 
fetch(queryURL)