var UI = require('ui');
var Ajax = require('ajax');
var stationKey = require('./lirr-stations.js');


var loadingCard = new UI.Card({
  title:'Rebecca',
  subtitle:'Fetching times...'
});

var fetchTimes = function(){
  // Show Loading Screen
  loadingCard.show();

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
      data.TRIPS.forEach(function(train){
        var legLength = train.LEGS.length;
        var transfers = train.CONNECTIONS.length;
        returnMsg = "DEPARTS @" + train.LEGS[0].DEPART_TIME + "\n" +
                  "ARRIVES @ " + train.LEGS[legLength-1].ARRIVE_TIME + "\n" +
                  "DURATION :" + train.DURATION + "min\n" +
                  "T: ";
        // Add any transfers
        if(transfers > 0){
          train.CONNECTIONS.forEach(function(connection){
            returnMsg += stationKey[connection.CONNECTING_STATION] + " ";
          });
        } else {
          returnMsg += "N/A";
        }
        
        console.log(returnMsg);
        // Spacer
        returnMsg += "\n --- \n";
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

fetchTimes();