var config = {
    apiKey: "AIzaSyCoskBfAja3rGiTEvs6dQLu1hwhg3uNss8",
    authDomain: "supercooldash-96c39.firebaseapp.com",
    databaseURL: "https://supercooldash-96c39.firebaseio.com",
    projectId: "supercooldash-96c39",
    storageBucket: "supercooldash-96c39.appspot.com",
    messagingSenderId: "723123196340"
};

firebase.initializeApp(config);

var database = firebase.database();

var userName = "";
var userFavAnimal = "";
var userBirthday = "";

$("#submit").on("click", function(event){
    event.preventDefault();
    userName = $("#name-input").val().trim();
    userFavAnimal = $("#fav-animal-input").val().trim();
    userBirthday = $("#birthday-input").val().trim();
    
    database.ref().push({
        userName: userName,
        userFavAnimal: userFavAnimal,
        userBirthday: userBirthday
    });

    window.location.href ="dashboard.html";
});

function buildStories() {
    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    
    url += '?' + $.param({
        'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
    });
    
    //ajax call
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function(response){
        var results = response.results;
        console.log(results);
        var s = '';
        results.length = 5;
            for(r of results) {
                console.log(r.title)
                //TODO section div should not encompass everything
                //creates a string with the elements pulled from the api, turns it into readable html/text
                s = s +`<div class="nyt-section">${r.section}
                <div class="nyt-title">${r.title}</div> 
                <div class="nyt-abstract">${r.abstract}</div>
                <div class="nyt-byline">${r.byline}</div>
                <div class="nyt-link"><a href='${r.short_url}'>Go To Article</a><p></div></div>`
            };
        $("#nyt-articles").html(s);
    });
};
    
buildStories();


var map, infoWindow;
function initMap() {
    });   
    
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
      
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + pos.lat + "&lon=" + pos.lng,
                method: 'GET',
                headers: {
                    "user-key": "2457ece772ffe351c5664115a2e148c7" 
                }
            }).then(function(response){
                console.log(response)
                var places = response.nearby_restaurants.slice(0,5);
                console.log(places);
                var placesHTML = '';
                for (p of places){
                    placesHTML = placesHTML + `<p>${p.restaurant.name}
                    <br>
                    ${p.restaurant.location.address}
                    <br>
                    <a href="${p.restaurant.menu_url}">Menu</a></p>`
                }
                
                $("#food").html(placesHTML)
                console.log(p.restaurant.menu_url)
            })

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    };
};


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};

// console.log(pos.lat);
// console.log(pos.lng);


//weatherAPI

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var point = new google.maps.LatLng(lat, long);
        new google.maps.Geocoder().geocode(
            {'latLng': point},

            function (res, status) {


                var APIKey = "0cdaef666666e73cec0a1f220c106a82";
                var queryURL;
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + APIKey;
                console.log(queryURL);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {

                    console.log(response);
                    // Transfer content to HTML
                    var wind = response.wind.speed;
                    var humidity = response.main.humidity;
                    var temp = response.main.temp;
                    var weatherDisplay = $("<div id='weather-info'>");
                    weatherDisplay.append($("<div>Wind Speed: " + wind + "</div><div> Humidity: " + humidity + "</div><div>Temperature: " + temp + "</div>"));
                    $("#weather-display").append(weatherDisplay);
                    // Log the data in the console as well
                    console.log("Wind Speed: " + response.wind.speed);
                    console.log("Humidity: " + response.main.humidity);
                    console.log("Temperature (F): " + response.main.temp);
                    var weatherCode = response.weather[0].id
                    console.log(weatherCode);
                        if (weatherCode === 200 || weatherCode === 230 || weatherCode === 231 || weatherCode === 300 || weatherCode === 301
                             || weatherCode === 310 || weatherCode === 313 || weatherCode === 321 || weatherCode === 500 
                             || weatherCode === 520) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/light_rain.jpg)"); 
                        } else if (weatherCode === 210 || weatherCode === 302 || weatherCode === 311 || weatherCode === 501 
                            || weatherCode === 522 || weatherCode === 531) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/rain.jpg)");                             
                        } else if (weatherCode === 312 || weatherCode === 313 || weatherCode === 314 || weatherCode === 503 
                            || weatherCode === 502) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/heavy_rain.jpg)");                             
                        } else if (weatherCode === 202 || weatherCode === 211 || weatherCode === 212 || weatherCode === 221 
                            || weatherCode === 232 || weatherCode === 711) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/thunderstorm.jpg)"); 
                        } else if (weatherCode === 504) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/extreme_rain.jpg)");                             
                        } else if (weatherCode === 600 || weatherCode === 615) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/light_snow.jpg)");                             
                        } else if (weatherCode === 601 || weatherCode === 616 || weatherCode === 621) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/snow.jpg)");                             
                        } else if (weatherCode === 602 || weatherCode === 622) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/heavy_snow.jpg)");                             
                        } else if (weatherCode === 611 || weatherCode === 612 || weatherCode === 511) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/sleet.jpg)");                             
                        } else if (weatherCode === 701 || weatherCode === 741) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/fog.jpg)");                             
                        } else if (weatherCode === 711) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/smoke.jpg)");                             
                        } else if (weatherCode === 721) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/haze.jpg)");                             
                        } else if (weatherCode === 731 || weatherCode === 751 || weatherCode === 761) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/dust.jpg)");                             
                        } else if (weatherCode === 762) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/volcanic_ash.jpg)");                             
                        } else if (weatherCode === 781) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/tornado.jpg)");                             
                        } else if (weatherCode === 800) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/clear.jpg)");  
                        } else if (weatherCode === 801 || weatherCode === 802) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/scattered_clouds.jpg)");                             
                        } else if (weatherCode === 803 || weatherCode === 804) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/overcast.jpg)");                             
                        } else {
                            $("#weather-api").css("background-image", "url(assets/images/weather/earth.jpg)");                             
                        };
                });    
            });
        }
    );
};
=======
        var APIKey = "0cdaef666666e73cec0a1f220c106a82";
// var zipcode;
        var queryURL;

        var ref = database.ref("/");

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    zipcode = snapshot.val().userZip;
    console.log(zipcode);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
  
      console.log(response);
  
      // Transfer content to HTML
      var wind = response.wind.speed;
      var humidity = response.main.humidity;
      var temp = response.main.temp;
  
      var weatherDisplay = $("<div>");
      weatherDisplay.append($("<div>Wind Speed: " + wind + "</div><div> Humidity: " + humidity + "</div><div>Temperature: " + temp + "</div>"));
      $("#weather-display").append(weatherDisplay);
  
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
      console.log("Rain" +  response.list.rain);
            });
        });
    });
});
}


        

// if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var lat = position.coords.latitude;
//         var long = position.coords.longitude;
//         // console.log(lat);
//         // console.log(long);
//         var point = new google.maps.LatLng(lat, long);
//         new google.maps.Geocoder().geocode(
//             {'latLng': point},
//             function (res, status) {
//                 var zip = res[1].address_components[7].long_name;
//                 console.log(zip);

    // function zomato(){
    //     var zomatoAPIKey = 'MjCaw_obNyTOzhBmIQIJfk8_C1IDIetVbdJ2HdOxq4gc8U06SY3JrGSbOwcYgshgpLH5hkmmuiQgADOy3XaIygZBX5PoE6cz8US194mZr9no2pcOoHUX5mda_U0AW3Yx'
    //     var queryURL = 'https://developers.zomato.com/api/v2.1/search?lat=' + lat + "&lon=" + long + "?user-key=" + zomatoAPIKey;

    //     $.ajax({
    //      url: queryURL,
    //      method: 'GET',
    //     }).then(function(response){
    //         var results = response.results;
    //         console.log(results);


    // var animals = [''];


  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
        // GIPHY
    $(document).on("click", ".animal-button", function() {
      $("#animals").empty();
      $(".animal-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=kK4jceB5idHjhlnJX1yqyZLP6uGvN1of&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class=\"animal-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
  
            animalDiv.append(p);
            animalDiv.append(animalImage);
  
            $("#animals").append(animalDiv);
          }
        });
    });
  
    $(document).on("click", ".animal-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      var newAnimal = $("input").eq(0).val();
  
      if (newAnimal.length > 2) {
        animals.push(newAnimal);
      }
  
      populateButtons(animals, "animal-button", "#animal-buttons");
  
    });
  
    populateButtons(animals, "animal-button", "#animal-buttons");
  

>>>>>>> lea


//GIPHY API
function displayCuteAnimals() {
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        animal = childSnapshot.val().userFavAnimal;
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=1";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                animalDiv.addClass("image-style");
                var animalImage = $("<img>");
                var imageURL = results[i].images.fixed_height.url
                var stillImageURL = results[i].images.fixed_height_still.url;
                animalImage.attr("src", stillImageURL);
                animalImage.attr("data-still" , stillImageURL);
                animalImage.attr("data-animate" , imageURL);
                animalImage.attr("data-state" , "still");
                animalImage.addClass("animateThatBitch");
                animalDiv.append(animalImage);
                $("#cute-animals").append(animalDiv);
            }
        });
    });
};

displayCuteAnimals();

$(document).on("click" , "img.animateThatBitch" , function() {
    console.log(this)
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src" , $(this).attr("data-animate"));
        $(this).attr("data-state" , "animate");
    } else {
        $(this).attr("src" , $(this).attr("data-still"));
        $(this).attr("data-state" , "still");
    }
}); 
