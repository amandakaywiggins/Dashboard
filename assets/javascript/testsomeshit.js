function weatherBackground() {
    if (weather.id === 200 || 230 || 231 || 300 || 301 || 310 || 313 || 321 || 500 || 520) {
        var lightRainImage = $("<img>")
        lightRainImage.attr("src" , "../images/weather/thunderstorm_with_light_rain.jpg");
        $("#weather-api").append(lightRainImage);
    } else if (weather.id === 210 || 302 || 311 || 501 || 522 || 531) {
        var rainImage = $("<img>")
        rainImage.attr("src", "../images/weather/thunderstorm_with_rain.jpg");
        $("#weather-api").append(rainImage);
    } else if (weather.id === 312 || 313 || 314 || 503 || 502) {
        var heavyRainImage = $("<img>");
        heavyRainImage.attr("src", "../images/weather/thunderstorm_with_heavy_rain.jpg");
        $("#weather-api").append(heavyRainImage);
    } else if (weather.id === 202 || 211 || 212 || 221 || 232 || 711) {
        var thunderstormImage = $("<img>");
        thunderstormImage.attr("src", "../images/weather/thunderstorm.jpg");
        $("#weather-api").append(thunderstormImage);
    } else if (weather.id === 504) {
        var extremeRainImage = $("<ing>");
        extremeRainImage.attr("src", "../images/weather/extreme_rain.jpg");
        $("#weather-api").append(extremeRainImage);
    } else if (weather.id === 600 || 615) {
        var lightSnowImage = $("<img>");
        lightSnowImage.attr("src", "../images/weather/light_snow.jpg");
        $("#weather-api").append(lightSnowImage);
    } else if (weather.id === 601 || 616 || 621) {
        var snowImage = $("<img>");
        snowImage.attr("src", "../images/weather/snow.jpg");
        $("#weather-api").append(snowImage);
    } else if (weather.id === 602, 622) {
        var heavySnowImage = $("<ing>");
        heavySnowImage.attr("src", "../images/weather/heavy_snow.jpg");
        $("#weather-api").append(heavySnowImage);
    } else if (weather.id === 611 || 612 || 511) {
        var sleetImage = $("<img>");
        sleetImage.attr("src", "../images/weather/sleet.jpg");
        $("#weather-api").append(sleetImage);
    } else if (weather.id === 701 || 741) {
        var fogImage = $("<img>");
        fogImage.attr("src", "../images/weather/fog.jpg");
        $("#weather-api").append(fogImage);
    } else if (weather.id === 711) {
        var smokeImage = $("<img>");
        smokeImage.attr("src", "../images/weather/smoke.jpg");
        $("#weather-api").append(smokeImage);
    } else if (weather.id === 721) {
        var hazeImage = $("<img>");
        hazeImage.attr("src", "../images/weather/haze.jpg");
        $("#weather-api").append(hazeImage);
    } else if (weather.id === 731 || 751 || 761) {
        var duststormImage = $("<img>");
        duststormImage.attr("src", "../images/weather/haze.jpg");
        $("#weather-api").append(duststormImage);
    } else if (weather.id === 762) {
        var volcanicAshImage = $("<img>");
        volcanicAshImage.attr("src", "../images/weather/volcanic_ash.jpg");
        $("#weather-api").append(volcanicAshImage);
    } else if (weather.id === 781) {
        var tornadoImage = $("<img>");
        tornadoImage.attr("src", "../images/weather/tornado.jpg");
        $("#weather-api").append(tornadoImage);
    } else if (weather.id === 800) {
        var clearImage = $("<img>");
        clearImage.attr("src", "../images/weather/clear.jpg");
        $("#weather-api").append(clearImage);
    } else if (weather.id === 801, 802) {
        var scatteredCloudsImage = $("<img>");
        scatteredCloudsImage.attr("src", "../images/weather/scattered_clouds.jpg");
        $("#weather-api").append(scatteredCloudsImage);
    } else if (weather.id === 803 || 804) {
        var overcastImage = $("<img>");
        overcastImage.attr("src", "../images/weather/scattered_clouds.jpg");
        $("#weather-api").append(overcastImage);
    } else {
        var earthImage = $("<img>");
        earthImage.attr("src", "../images/weather/earth.jpg");
        $("#weather-api").append(earthImage);
    }
};

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(queryURL);
  
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