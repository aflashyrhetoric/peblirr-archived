/* global module */
var UI = require('ui');
var Ajax = require('ajax');
var stationKey = require('./lirr-stations.js');
// var Vector2 = require('vector2');
// var splashWindow = UI.Window();
    
var fetchTimes = function(){

  // Construct URL
  var baseUrl='https://traintime.lirr.org/api/TrainTime?api_key=';
  var apiKey='071b22082ed67d6d6df78a3a98c41e62';
  
  // Hard-coded STATION values
  var startStation='ISP';
  var endStation='NYK';
  var URL = baseUrl + 
            apiKey + 
            '&startsta=' + startStation +
            '&endsta=' + endStation;
  var leaveHomeByTime = 6;
  URL += "&hour="+leaveHomeByTime;
  
  var convertToTime = function(time){
    var hours = time.substring(0,2);
    var minutes = time.substring(2,4);
    if(time.charAt(0) === "0"){
      hours = hours.substring(1,2);
    }
    return hours + ":" + minutes;
  };
  
  // Make the request
  Ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      
      // Success
      var items = [];
      data.TRIPS.forEach(function(train){
        var legLength = train.LEGS.length;
        var transferCount = train.CONNECTIONS.length;
        var departure = convertToTime(train.LEGS[0].DEPART_TIME);
        var arrival = convertToTime(train.LEGS[legLength-1].ARRIVE_TIME);
        
        var transferList = "";
        
        // Add any transfers
        if(transferCount > 0){
          train.CONNECTIONS.forEach(function(connection){
            transferList+= stationKey[connection.CONNECTING_STATION] + " ";
          });
          transferList = transferList.trim();
        } else {
          transferList = "No transfers.";
        }
        
        items.push({
          title: departure + "->" + arrival,
          subtitle: train.DURATION + "m | " + transferList,
        });
      });
      
      var trainTimesList = new UI.Menu ({
        sections: [{
          title: stationKey[startStation] + " -> " + stationKey[endStation],
          items: items
        }]
      });
      trainTimesList.show();
    },
    function(error) {
      var card = new UI.Card();
      // Failure!
      card.body("Train fetch failed. Check data/bluetooth connection.");
      card.show();
      console.log('Failed fetching weather data: ' + error);
    }
  );
};


module.exports = {
  fetchTimes: fetchTimes
};