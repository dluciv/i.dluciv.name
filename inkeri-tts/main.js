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
          var location = data.name;
          var desc = data.weather.description;

          window.weather = "Температура за бортом: " + tempr + " градусов. ";

          console.log(data);
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
  window.speaksmth("Привет! Говорит И́нкери Норпа Лехтокурпа. " + window.weather + "Ситуация с тюленями спокойная. Ситуация с ва́льдшнепами спокойная. Вероятность зомби-атаки — 815 на миллион. Это меньше статистической погрешности. Спасибо, всего доброго!");
};
