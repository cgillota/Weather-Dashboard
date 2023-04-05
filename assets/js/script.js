const APIKey = "464d5e100b46c5b2a40ba0354705853d";
 
 //search history array
 var mainCard = $(".search-history");
 var searchHistory = [];
 
 
 var getItems = function () {
   var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
   if (storedCities !== null) {
     searchHistory = storedCities;
     for(var i=0;i<searchHistory.length;i++) {
         if(i==8){
             break;
         }
       //  creates button
       cityListButton = $("<a>").attr({
         class: "list-group-item list-group-item-action",
         href: "#",
         "data-btn-num": i
       });
         // appends history as a button below the search field
         cityListButton.text(searchHistory[i]);
         $(".search-history").append(cityListButton);      
     }
   }
 };
 
   function getData(city) {
     var isError=false;
         mainCard.empty();
     $("#today").empty();
     if(!city){
         return;
     }
   var weatherQueryApiUrl =
     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
   fetch(weatherQueryApiUrl)
     .then(function (response) {
         return response.json();
     })
     .then(function (response) {
        console.log(response);
         if(response.cod !== 200){
             alert("City Not Found!");
             $("#city").val("");
             isError=true;
             getLocation();
             return;
         }
         if(!isError){
             saveNewCity(city);
         }
          
       var date = dayjs().format('dddd, MMMM D YYYY')
       var wIcon = response.weather[0].icon;
       var iconUrl = "http://openweathermap.org/img/w/" + wIcon + ".png";
       var cityName = $("<h3>").html(city + date);
       mainCard.prepend(cityName);
       mainCard.append($("<img>").attr("src", iconUrl));
       var temp = Math.ceil(response.main.temp);
       mainCard.append($("<p>").html("Temperature: " + temp + " &#8457"));
       var feelsLikeTemp = Math.ceil(response.main.feels_like);
       mainCard.append($("<p>").html("Feels Like: " + feelsLikeTemp));
       var humidity = response.main.humidity + "&#37;";
       mainCard.append($("<p>").html("Humidity: " + humidity));
       var windSpeed = response.wind.speed;
       mainCard.append($("<p>").html("Wind Speed: " + windSpeed + " MPH"));
         
       let latitude = response.coord.lat;
       let longitude = response.coord.lon;
       let count = 5;
       var fullWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
       return fetch(fullWeatherUrl)
         .then(function (fullResponse) {
           return fullResponse.json();
         })
         .then(function (fullResponse) {
            console.log("Full Response : ", fullResponse)

           /* Get 5 Day Forecast From Weather API */
           for (var i = 1; i < 6; i++) {
             var newCard = $("<div>").attr(
               "class",
               "col fiveDay bg-primary text-white rounded-lg p-2"
             );
             $("#forecast").append(newCard);
             var myDate = new Date(
             
             ).toLocaleDateString("en-US");
             /* Display Date */
             newCard.append($("<h4>").html(myDate));
         
             var iconURL =
             newCard.append($("<img>").attr("src", iconURL));
            newCard.append($("<p>").html("Temp: " + temp + " &#8457"));
            newCard.append($("<p>").html("Humidity: " + humidity));
           }
         });
     });
 }
 /* Search Button Listener */
 $("#search-button").on("click",function(){
     var city=$("#city").val(); 
     getData(city);
     $("#city").val("");
 });
 
 /* Save City Name to LocalStorage */
 var saveNewCity = function(city){
     var inArray = searchHistory.includes(city);
     if(!inArray && city !==""){
         searchHistory.push(city);
         localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
         var cityListButton = $("<a>").attr(
             {
                 class:"list-group-item list-group-item-action",
                 href: "#",
                 "data-btn-num": searchHistory.length
             }
         );
         cityListButton.text(city);
         $(".search-history").append(cityListButton);
 
     }
 };
 
 /* History List Buttons */
 $(".search-history").on("click",function(e){
     var callCity = e.target.innerHTML;
     $("#city").val(callCity);
     getData(callCity);
 
 });
 
 getItems();
 
 function getLocation() {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
     } else { 
       console.log("Geolocation is not supported by this browser.");
     }
   }
   
 function showPosition(position) {
     fetch("https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91")
         .then(function(response){
             return response.json();
         })
         .then(function(response){
             getData(response.city);
             $("#city").val(response.city);
             saveNewCity(response.city);
         });
 }
 