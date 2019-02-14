# Dashboard
[View the website here](https://amandakaywiggins.github.io/Dashboard/)

*It appears some changes to the NY Times API have broken that particular code*

## Why do we need a dashboard?
With so much information out today, and so many ways to access it, it can be easy to feel bombarded and overwhelmed. A dashboard allows you to receive only the information you need without the ads, pop-ups, and unnecessary information. We’ve created a place where you can see your weather, news, local restaurants, and even a daily cute gif of the day all in one spot that has been personalized by you!

## Goal
Create a personalized dashboard for users that displays information catered due their locality & taste

## APIs
NY Times API
Zomato API
OWDB API
GIPHY API
Google Maps API

## Challenges
Getting the APIs to work with one another

## Goals for Development
Getting a secure server to store 
User’s private login information
Using more APIs with more advanced authorization requirements
Live updates

### Key Code
As the UI and front-end developer for this project, I wanted to create a fun, personalized experience for users that would still be clean and functional. 

I created a few customizable options, such as choosing a color scheme for your dashboard. I also used the weather forecast to change the background on the weather div to mirror the current conditions using similar code. In future projects, I hope to be able to provide further customization like font, font-size, and arrangment of divs on the dashboard.


`function backgroundColor() {
    database.ref().orderByChild("userName").equalTo(localUser).on("child_added", function(childSnapshot) {
        color = childSnapshot.val().userColor;
        console.log(color);

        if (color === "Red") {
            $("#dash-page").css("background-color", "#ff9191");
            $("#header").css({background: "linear-gradient(to bottom right, #fff463, #ff9191)"});
        } else if (color === "Orange") {
            $("#dash-page").css("background-color", "#ffcb91"); 
            $("#header").css({background: "linear-gradient(to bottom right, #bd91ff, #ffcb91)"});            
        } else if (color === "Yellow") {
            $("#dash-page").css("background-color", "#ffffdb");
            $("#header").css({background: "linear-gradient(to bottom right, #ff9191, #ffffdb)"});            
        } else if (color === "Green") {
            $("#dash-page").css("background-color", "#91ffa8");
            $("#header").css({background: "linear-gradient(to bottom right, #bd91ff, #91ffa8)"});            
        } else if (color === "Blue") {
            $("#dash-page").css("background-color", "#91beff");        
            $("#header").css({background: "linear-gradient(to bottom right, #ff9191, #91beff)"});            
        } else if (color === "Purple") {
            $("#dash-page").css("background-color", "#bd91ff");        
            $("#header").css({background: "linear-gradient(to bottom right, #91beff, #bd91ff)"});            
        } else if (color === "Gray") {
            $("#dash-page").css("background-color", "#aaaaaa");        
            $("#header").css({background: "linear-gradient(to bottom right, #91beff, #aaaaaa)"});            
        } else if (color === "White") {
            $("#dash-page").css("background-color", "#ffffff");        
            $("#header").css({background: "linear-gradient(to bottom right, #ff9191, #ffffff)"});            
        };
    })`

