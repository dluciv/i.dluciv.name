window.owmAPIkey = "65b3dc1574aadec85e6638331e30b380"; // dluciv@gmail.com

window.weather = "";

$(document).ready(function() {
  var lat, lon, api_url;

  if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(gotLocation);

    function gotLocation(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
        lat + '&lon=' +
        lon + '&units=metric&appid=' + window.owmAPIkey;
      // http://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=b1b15e88fa79722

      $.ajax({
        url: api_url,
        method: 'GET',
        success: function(data) {

          var tempr = data.main.temp;
          var wind = data.wind.speed;
          var vis = data.visibility;
          var hum = data.main.humidity;
          var prs = Math.round(0.750062 * data.main.pressure);

          window.weather =
            "Температура за бортом в градусах — " + tempr + ". Ветер в метрах в секунду — " + wind + ". Видимость в метрах — " +
            vis + ". Влажность в процентах — " + hum + ". Давление в миллиметрах ртутного столба — " + prs + ". ";

          console.log(window.weather);
        }
      });
    }
  } else {
    alert('Your browser doesnt support geolocation. Sorry.');
  }

});

function speaksmth(text) {
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();

  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.rate = 1.2;
  utterThis.pitch = 1.5;
  utterThis.voice = voices[0];

  synth.speak(utterThis);
};

function tell_status() {
  var zp = 800 + Math.round(Math.random()*50);
  window.speaksmth("Привет! Говорит И́нкери Норпа Лехтокурпа. " + window.weather + "Ситуация с тюленями спокойная. Ситуация с ва́льдшнепами спокойная. Вероятность зомби-атаки — " + zp + " на миллион. Это меньше статистической погрешности. Спасибо, всего доброго!");
};
