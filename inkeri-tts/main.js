window.owmAPIkey = "65b3dc1574aadec85e6638331e30b380"; // dluciv@gmail.com

window.weather = "";

var _units = {
  "градус" : ["градуса", "градусов"],
  "метр" : ["метра", "метров"],
  "миллиметр" : ["миллиметра", "миллиметров"],
  "процент": ["процента", "процентов"],
};

for(var u in _units)
  if(_units.hasOwnProperty(u))
     _units[u].unshift(u);


function declinateUnit(value, unit){
  var a = _units[unit];
  var lastdigit = value % 10;
  var lasttwodigits = value % 100;
  if(lasttwodigits >= 10 && lasttwodigits <= 20)
    lastdigit = 5;

  switch(lastdigit){
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return a[2];
    case 1:
      return a[0];
    case 2:
    case 3:
    case 4:
      return a[1];
  }
}

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
          "Температура " + where +
          " — "          + tempr + ' ' + declinateUnit(tempr, "градус"   ) + '. ' +
          "Ветер — "     + wind  + ' ' + declinateUnit(wind,  "метр"     ) + ' в секунду. ' +
          "Влажность — " + hum   + "%. " +
          "Давление — "  + prs   + ' ' + declinateUnit(prs,   "миллиметр") + ' ртутного столба. ';

        console.log(window.weather);
      }
    });
  }

  if (false && "geolocation" in navigator) { // to slow on mobiles...

    navigator.geolocation.getCurrentPosition(gotLocation);

    var gotLocation = function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
        lat + '&lon=' +
        lon + '&units=metric&appid=' + window.owmAPIkey;
      // http://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=b1b15e88fa79722

      getweather(api_url, "за бортом");
    }
  } else {
    // alert('Your browser doesnt support geolocation. Sorry.');
      // var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=60.439803&lon=30.097812&units=metric&appid=' + window.owmAPIkey;
      api_url = 'http://api.openweathermap.org/data/2.5/weather?id=498817&units=metric&appid=' + window.owmAPIkey;

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
