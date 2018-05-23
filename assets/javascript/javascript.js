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
                    var weatherDisplay = $("<div id='weather-info'>");
                    weatherDisplay.append($("<div>Wind Speed: " + wind + "</div><div> Humidity: " + humidity + "</div><div>Temperature: " + temp + "</div>"));
                    $("#weather-display").append(weatherDisplay);
                    // Log the data in the console as well
                    console.log("Wind Speed: " + response.wind.speed);
                    console.log("Humidity: " + response.main.humidity);
                    console.log("Temperature (F): " + response.main.temp);
                    var weatherCode = response.weather[0].id
                    console.log(weatherCode);
                        if (weatherCode === 200 || 230 || 231 || 300 || 301 || 310 || 313 || 321 || 500 || 520) {
                            console.log(weatherCode);
                            $("#weather-api").css("background-image", "url(assets/images/weather/light_rain.jpg)"); 
                        } else if (weatherCode === 210 || 302 || 311 || 501 || 522 || 531) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/rain.jpg)");                             
                        } else if (weatherCode === 312 || 313 || 314 || 503 || 502) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/heavy_rain.jpg)");                             
                        } else if (weatherCode === 202 || 211 || 212 || 221 || 232 || 711) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/thunderstorm.jpg)"); 
                        } else if (weatherCode === 504) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/extreme_rain.jpg)");                             
                        } else if (weatherCode === 600 || 615) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/light_snow.jpg)");                             
                        } else if (weatherCode === 601 || 616 || 621) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/snow.jpg)");                             
                        } else if (weatherCode === 602, 622) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/heavy_snow.jpg)");                             
                        } else if (weatherCode === 611 || 612 || 511) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/sleet.jpg)");                             
                        } else if (weatherCode === 701 || 741) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/fog.jpg)");                             
                        } else if (weatherCode === 711) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/smoke.jpg)");                             
                        } else if (weatherCode === 721) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/haze.jpg)");                             
                        } else if (weatherCode === 731 || 751 || 761) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/dust.jpg)");                             
                        } else if (weatherCode === 762) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/volcanic_ash.jpg)");                             
                        } else if (weatherCode === 781) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/tornado.jpg)");                             
                        } else if (weatherCode === 800) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/clear.jpg)");  
                        } else if (weatherCode === 801, 802) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/scattered_clouds.jpg)");                             
                        } else if (weatherCode === 803 || 804) {
                            $("#weather-api").css("background-image", "url(assets/images/weather/overcast.jpg)");                             
                        } else {
                            $("#weather-api").css("background-image", "url(assets/images/weather/earth.jpg)");                             
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
