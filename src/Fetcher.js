/* global module */
// START IMPORTS
var UI = require('ui');
var Ajax = require('ajax');
var stationKey = require('./lirr-stations.js');
var Clay = require('./clay');
var clayConfig = require('./config');
var Vector2 = require('vector2');
// END OF IMPORTS

// START INITIALIZATIONS
var clay = new Clay(clayConfig);
var splashWindow = new UI.Window();
var dict;
// END OF INITIALIZATIONS

// Display error page if settings aren't set.
var displaySettingsNotSet = function(){
  
  // Text element to inform user
  var text = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    text:'Please double-check phone settings.',
    font:'GOTHIC_28_BOLD',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });
  
  // Add to splashWindow and show
  splashWindow.add(text);
  splashWindow.show();
};

var fetchTimes = function(splashWindow, dict){
  
  // Construct URL
  var baseUrl='https://traintime.lirr.org/api/TrainTime?api_key=';
  var apiKey='071b22082ed67d6d6df78a3a98c41e62';
  
  // Hard-coded STATION values
//   var startStation='ISP';
  var startStation=dict.mk_home_station;
//   var endStation='NYK';
  var endStation=dict.mk_work_station;
  var URL = baseUrl + 
            apiKey + 
            '&startsta=' + startStation +
            '&endsta=' + endStation;
//   var leaveHomeByTime = 6;
  var leaveHomeByTime = dict.mk_arrive_by_time;
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
      splashWindow.hide();
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