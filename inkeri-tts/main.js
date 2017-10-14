window.owmAPIkey = "65b3dc1574aadec85e6638331e30b380"; // dluciv@gmail.com

window.weather = "";

$(document).ready(function() {
  var lat, lon, api_url;

  var getweather = function(req, where) {
    $.ajax({
      url: api_url,
      method: 'GET',
      success: function(data) {

        var tempr = Math.round(data.main.temp);
        var wind = Math.round(data.wind.speed);
        var vis = data.visibility;
        var hum = Math.round(data.main.humidity);
        var prs = Math.round(0.750062 * data.main.pressure);

        window.weather =
          "Температура " + where + " в градусах — " + tempr + ". Ветер в метрах в секунду — " + wind +
          ". Влажность в процентах — " + hum + ". Давление в миллиметрах ртутного столба — " + prs + ". ";

        console.log(window.weather);
      }
    });
  }

  if (false && "geolocation" in navigator) { // to slow on mobiles...

    navigator.geolocation.getCurrentPosition(gotLocation);

    var gotLocation = function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
        lat + '&lon=' +
        lon + '&units=metric&appid=' + window.owmAPIkey;
      // http://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=b1b15e88fa79722

      getweather(api_url, "за бортом");
    }
  } else {
    // alert('Your browser doesnt support geolocation. Sorry.');
      // var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=60.439803&lon=30.097812&units=metric&appid=' + window.owmAPIkey;
      var api_url = 'http://api.openweathermap.org/data/2.5/weather?id=498817&units=metric&appid=' + window.owmAPIkey;

      getweather(api_url, "в И́нгрии");
  }

});

function speaksmth(text) {
  var synth = window.speechSynthesis;
  // var voices = synth.getVoices();

  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.rate = 1.2;
  utterThis.pitch = 1.5;
  utterThis.lang = 'ru-RU';
  // utterThis.voice = voices[0];

  synth.speak(utterThis);
};

function tell_status() {
  var zp = 800 + Math.round(Math.random()*50);
  window.speaksmth("Привет! Говорит И́нкери Норпа Лехтокурпа. " + window.weather + "Ситуация с тюленями спокойная. Ситуация с ва́льдшнепами спокойная. Вероятность зомби-атаки — " + zp + " на миллион. Это меньше статистической погрешности. Спасибо, всего доброго!");
};
