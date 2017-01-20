/**
 * Created by kuoa on 1/20/17.
 */

var skycons = new Skycons({"color": "white"});



// you can add a canvas by it's ID...
skycons.add("weather-icon", Skycons.PARTLY_CLOUDY_NIGHT);

// ...or by the canvas DOM element itself.
//skycons.add(document.getElementById("icon2"), Skycons.RAIN);

// if you're using the Forecast API, you can also supply
// strings: "partly-cloudy-day" or "rain".

// start animation!
skycons.play();

// you can also halt animation with skycons.pause()

// want to change the icon? no problem:
//skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

// want to remove one altogether? no problem:
//skycons.remove("icon2");