/* global module */
var UI = require('ui');
var Ajax = require('ajax');
var stationKey = require('./lirr-stations.js');
var fetchTimes = function(loadingCard){

  // Construct URL
  var baseUrl='https://traintime.lirr.org/api/TrainTime?api_key=';
  var apiKey='071b22082ed67d6d6df78a3a98c41e62';
  var startStation='ISP';
  var endStation='NYK';
  
  var URL = baseUrl + 
            apiKey + 
            '&startsta=' + startStation +
            '&endsta=' + endStation;
 
  var leaveHomeByTime = 6;
  URL += "&hour="+leaveHomeByTime;
  
  console.log(URL);
  
  // Make the request
  Ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      var timesCard = new UI.Card({
        title: "Islip -> Penn",
        scrollable: true
      });
     
      // For each available train time, add to menu.
      var returnMsg ="";
      var count = 1;
      data.TRIPS.forEach(function(train){
        var legLength = train.LEGS.length;
        var transfers = train.CONNECTIONS.length;
        returnMsg += 
                  "#"+count + "\n" +
                  "DEP: " + train.LEGS[0].DEPART_TIME + "\n" +
                  "ARR: " + train.LEGS[legLength-1].ARRIVE_TIME + "\n" +
                  "DUR:" + train.DURATION + "min\n" +
                  "Xfer: ";
        // Add any transfers
        if(transfers > 0){
          train.CONNECTIONS.forEach(function(connection){
            returnMsg += stationKey[connection.CONNECTING_STATION] + " ";
          });
        } else {
          returnMsg += "N/A";
        }
        // Spacer
        returnMsg += "\n --- \n";
        count++;
      });
      // Display card
      timesCard.body(returnMsg);
      timesCard.show(); 
      
    },
    function(error) {
      // Failure!
      loadingCard.body("Train fetch failed. Check phone's bluetooth / service.");
      console.log('Failed fetching weather data: ' + error);
    }
  );
};


module.exports = {
  fetchTimes: fetchTimes
};