var UI = require('ui');
var Ajax = require('ajax');
var Clock = require('clock');

var card = new UI.Card({
  title:'Rebecca',
  subtitle:'Fetching times...'
});

var fetchTimes = function(){
  // Show Loading Screen
  card.show();

  // Construct URL
  var baseUrl='https://traintime.lirr.org/api/TrainTime?api_key=';
  var apiKey='071b22082ed67d6d6df78a3a98c41e62';
  var startStation='ISP';
  var endStation='NYK';
  
  var URL = baseUrl + 
            apiKey + 
            '&startsta=' + startStation +
            '&endsta=' + endStation;
 
  var leaveHomeByTime = 7;
  URL += "&hour="+leaveHomeByTime;
  
  console.log("URL:" + URL);
  
  // Make the request
  Ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      card.title("");
      card.subtitle("ISLIP TO PENN");
      var legLength = data.TRIPS[0].LEGS.length;
      card.body("DEP: " + data.TRIPS[0].LEGS[0].DEPART_TIME + "\n" +
                "ARR: " + data.TRIPS[0].LEGS[legLength-1].ARRIVE_TIME + "\n" +
                "LEN: " + data.TRIPS[0].DURATION + "min\n");
    },
    function(error) {
      // Failure!
      console.log('Failed fetching weather data: ' + error);
    }
  );
};

fetchTimes();