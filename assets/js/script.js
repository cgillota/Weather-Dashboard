//This is more so for me
const APIKey = "656e6c8ef75718035fce76f2d435d117";
const form = document.querySelector(".card-deck");
var city; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey; 
fetch(queryURL) 
//

$(function () {
    $("#search-button").on("click", function(){
        var city = $("#city").val();
    }) 
})

var getItems = function () {
    var storedCities = JSON.parse(localStorage.getItem("search-history"));
}
 var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid" + "656e6c8ef75718035fce76f2d435d117";
 fetch(queryURL)
 .then(function (response){ 
    return response.json();
 })