var UI = require('ui');
var Ajax = require('ajax');
var stationKey = require('./lirr-stations.js');


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
  
  // Make the request
  Ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      card.title("");
      card.subtitle("ISLIP -> PENN");
      var legLength = data.TRIPS[0].LEGS.length;
      var transfers = data.TRIPS[0].CONNECTIONS.length;
      
      var returnMsg = "Dep: " + data.TRIPS[0].LEGS[0].DEPART_TIME + "\n" +
                "Arr: " + data.TRIPS[0].LEGS[legLength-1].ARRIVE_TIME + "\n" +
                "Dur: " + data.TRIPS[0].DURATION + "min";
      
      returnMsg += "\nT: ";
      // If there are transfers, add
      if(transfers > 0){
        data.TRIPS[0].CONNECTIONS.forEach(function(connection){
          returnMsg += stationKey[connection.CONNECTING_STATION] + " ";
        });
      } else {
        returnMsg += "N/A";
      }
      card.body(returnMsg);
    },
    function(error) {
      // Failure!
      console.log('Failed fetching weather data: ' + error);
    }
  );
};

fetchTimes();