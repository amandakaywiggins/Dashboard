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
var userZip = "";
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
                var zip = res[1].address_components[7].long_name;
                console.log(zip);
                var APIKey = "0cdaef666666e73cec0a1f220c106a82";
                var queryURL;
                var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=" + APIKey;
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
                    //console.log("Rain" +  response.list.rain);
                    function weatherBackground() {
                        if (response.weather[0].id === 200 || 230 || 231 || 300 || 301 || 310 || 313 || 321 || 500 || 520) {
                            var lightRainImage = $("<img>")
                            lightRainImage.attr("src" , "assets/images/weather/light_rain.jpg");
                            $("#weather-api").append(lightRainImage);
                        } else if (response.weather[0].id === 210 || 302 || 311 || 501 || 522 || 531) {
                            var rainImage = $("<img>")
                            rainImage.attr("src", "assets/images/weather/rain.jpg");
                            $("#weather-api").append(rainImage);
                        } else if (response.weather[0].id === 312 || 313 || 314 || 503 || 502) {
                            var heavyRainImage = $("<img>");
                            heavyRainImage.attr("src", "assets/images/weather/heavy_rain.jpg");
                            $("#weather-api").append(heavyRainImage);
                        } else if (response.weather[0].id === 202 || 211 || 212 || 221 || 232 || 711) {
                            var thunderstormImage = $("<img>");
                            thunderstormImage.attr("src", "assets/images/weather/thunderstorm.jpg");
                            $("#weather-api").append(thunderstormImage);
                        } else if (response.weather[0].id === 504) {
                            var extremeRainImage = $("<ing>");
                            extremeRainImage.attr("src", "assets/images/weather/extreme_rain.jpg");
                            $("#weather-api").append(extremeRainImage);
                        } else if (response.weather[0].id === 600 || 615) {
                            var lightSnowImage = $("<img>");
                            lightSnowImage.attr("src", "assets/images/weather/light_snow.jpg");
                            $("#weather-api").append(lightSnowImage);
                        } else if (response.weather[0].id === 601 || 616 || 621) {
                            var snowImage = $("<img>");
                            snowImage.attr("src", "assets/images/weather/snow.jpg");
                            $("#weather-api").append(snowImage);
                        } else if (response.weather[0].id === 602, 622) {
                            var heavySnowImage = $("<ing>");
                            heavySnowImage.attr("src", "assets/images/weather/heavy_snow.jpg");
                            $("#weather-api").append(heavySnowImage);
                        } else if (response.weather[0].id === 611 || 612 || 511) {
                            var sleetImage = $("<img>");
                            sleetImage.attr("src", "assets/images/weather/sleet.jpg");
                            $("#weather-api").append(sleetImage);
                        } else if (response.weather[0].id === 701 || 741) {
                            var fogImage = $("<img>");
                            fogImage.attr("src", "assets/images/weather/fog.jpg");
                            $("#weather-api").append(fogImage);
                        } else if (response.weather[0].id === 711) {
                            var smokeImage = $("<img>");
                            smokeImage.attr("src", "assets/images/weather/smoke.jpg");
                            $("#weather-api").append(smokeImage);
                        } else if (response.weather[0].id === 721) {
                            var hazeImage = $("<img>");
                            hazeImage.attr("src", "assets/images/weather/haze.jpg");
                            $("#weather-api").append(hazeImage);
                        } else if (response.weather[0].id === 731 || 751 || 761) {
                            var duststormImage = $("<img>");
                            duststormImage.attr("src", "assets/images/weather/dust.jpg");
                            $("#weather-api").append(duststormImage);
                        } else if (response.weather[0].id === 762) {
                            var volcanicAshImage = $("<img>");
                            volcanicAshImage.attr("src", "assets/images/weather/volcanic_ash.jpg");
                            $("#weather-api").append(volcanicAshImage);
                        } else if (response.weather[0].id === 781) {
                            var tornadoImage = $("<img>");
                            tornadoImage.attr("src", "assets/images/weather/tornado.jpg");
                            $("#weather-api").append(tornadoImage);
                        } else if (response.weather[0].id === 800) {
                            var clearImage = $("<img>");
                            clearImage.attr("src", "assets/images/weather/clear.jpg");
                            $("#weather-api").append(clearImage);
                        } else if (response.weather[0].id === 801, 802) {
                            var scatteredCloudsImage = $("<img>");
                            scatteredCloudsImage.attr("src", "assets/images/weather/scattered_clouds.jpg");
                            $("#weather-api").append(scatteredCloudsImage);
                        } else if (response.weather[0].id === 803 || 804) {
                            var overcastImage = $("<img>");
                            overcastImage.attr("src", "assets/images/weather/overcast.jpg");
                            $("#weather-api").append(overcastImage);
                        } else {
                            var earthImage = $("<img>");
                            earthImage.attr("src", "assets/images/weather/earth.jpg");
                            $("#weather-api").append(earthImage);
                        };
                    };
                weatherBackground();
                });    
            });
        }
    );
};

