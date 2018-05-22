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
                //creates a string with the elements pulled from the api, turns it into readable html/text
                s = s+`<div class="nyt-section">${r.section}
                <div class="nyt-title">${r.title}</div> 
                <div class="nyt-abstract">${r.abstract}</div>
                <div class="nyt-byline">${r.byline}</div>
                <div class="nyt-link"><a href='${r.short_url}'>Go To Article</a><p></div></div>`
            };
        $("#nyt-articles").html(s);
    });
};
    
buildStories();
    
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var map, infoWindow;
          
function initMap() {
    map = new google.maps.Map(document.getElementById("map-display"), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
    });
        
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
            
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
    
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
                    var weatherDisplay = $("<div>");
                    weatherDisplay.append($("<div>Wind Speed: " + wind + "</div><div> Humidity: " + humidity + "</div><div>Temperature: " + temp + "</div>"));
                    $("#weather-display").append(weatherDisplay);
                    // Log the data in the console as well
                    console.log("Wind Speed: " + response.wind.speed);
                    console.log("Humidity: " + response.main.humidity);
                    console.log("Temperature (F): " + response.main.temp);
                    var weatherCode = response.weather[0].id
                    console.log(weatherCode);
                    //console.log("Rain" +  response.list.rain);
                        if (weatherCode === 200 || 230 || 231 || 300 || 301 || 310 || 313 || 321 || 500 || 520) {
                            console.log(`weather code is ${weatherCode} so it should be raining`);
                            var lightRainImage = $("<img>")
                            lightRainImage.attr("src" , "assets/images/weather/light_rain.jpg");
                            $("#weather-api").append(lightRainImage);
                        } else if (weatherCode === 210 || 302 || 311 || 501 || 522 || 531) {
                            var rainImage = $("<img>")
                            rainImage.attr("src", "assets/images/weather/rain.jpg");
                            $("#weather-api").append(rainImage);
                        } else if (weatherCode === 312 || 313 || 314 || 503 || 502) {
                            var heavyRainImage = $("<img>");
                            heavyRainImage.attr("src", "assets/images/weather/heavy_rain.jpg");
                            $("#weather-api").append(heavyRainImage);
                        } else if (weatherCode === 202 || 211 || 212 || 221 || 232 || 711) {
                            var thunderstormImage = $("<img>");
                            thunderstormImage.attr("src", "assets/images/weather/thunderstorm.jpg");
                            $("#weather-api").append(thunderstormImage);
                        } else if (weatherCode === 504) {
                            var extremeRainImage = $("<ing>");
                            extremeRainImage.attr("src", "assets/images/weather/extreme_rain.jpg");
                            $("#weather-api").append(extremeRainImage);
                        } else if (weatherCode === 600 || 615) {
                            var lightSnowImage = $("<img>");
                            lightSnowImage.attr("src", "assets/images/weather/light_snow.jpg");
                            $("#weather-api").append(lightSnowImage);
                        } else if (weatherCode === 601 || 616 || 621) {
                            var snowImage = $("<img>");
                            snowImage.attr("src", "assets/images/weather/snow.jpg");
                            $("#weather-api").append(snowImage);
                        } else if (weatherCode === 602, 622) {
                            var heavySnowImage = $("<ing>");
                            heavySnowImage.attr("src", "assets/images/weather/heavy_snow.jpg");
                            $("#weather-api").append(heavySnowImage);
                        } else if (weatherCode === 611 || 612 || 511) {
                            var sleetImage = $("<img>");
                            sleetImage.attr("src", "assets/images/weather/sleet.jpg");
                            $("#weather-api").append(sleetImage);
                        } else if (weatherCode === 701 || 741) {
                            var fogImage = $("<img>");
                            fogImage.attr("src", "assets/images/weather/fog.jpg");
                            $("#weather-api").append(fogImage);
                        } else if (weatherCode === 711) {
                            var smokeImage = $("<img>");
                            smokeImage.attr("src", "assets/images/weather/smoke.jpg");
                            $("#weather-api").append(smokeImage);
                        } else if (weatherCode === 721) {
                            var hazeImage = $("<img>");
                            hazeImage.attr("src", "assets/images/weather/haze.jpg");
                            $("#weather-api").append(hazeImage);
                        } else if (weatherCode === 731 || 751 || 761) {
                            var duststormImage = $("<img>");
                            duststormImage.attr("src", "assets/images/weather/dust.jpg");
                            $("#weather-api").append(duststormImage);
                        } else if (weatherCode === 762) {
                            var volcanicAshImage = $("<img>");
                            volcanicAshImage.attr("src", "assets/images/weather/volcanic_ash.jpg");
                            $("#weather-api").append(volcanicAshImage);
                        } else if (weatherCode === 781) {
                            var tornadoImage = $("<img>");
                            tornadoImage.attr("src", "assets/images/weather/tornado.jpg");
                            $("#weather-api").append(tornadoImage);
                        } else if (weatherCode === 800) {
                            console.log("Hi!");
                            var clearImage = $("<img>");
                            clearImage.attr("src", "assets/images/weather/clear.jpg");
                            $("#weather-api").append(clearImage);
                        } else if (weatherCode === 801, 802) {
                            var scatteredCloudsImage = $("<img>");
                            scatteredCloudsImage.attr("src", "assets/images/weather/scattered_clouds.jpg");
                            $("#weather-api").append(scatteredCloudsImage);
                        } else if (weatherCode === 803 || 804) {
                            var overcastImage = $("<img>");
                            overcastImage.attr("src", "assets/images/weather/overcast.jpg");
                            $("#weather-api").append(overcastImage);
                        } else {
                            var earthImage = $("<img>");
                            earthImage.attr("src", "assets/images/weather/earth.jpg");
                            $("#weather-api").append(earthImage);
                        };
                });    
            });
        }
    );
};


//GIPHY API
function displayCuteAnimals() {
    database.ref().on("child_added" , function(childSnapshot) {
        console.log(childSnapshot.val());
        animal = childSnapshot.val().userFavAnimal;
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
