var UI = require('ui');
var Fetcher = require('./Fetcher');
var Vector2 = require('vector2');
var splashWindow = new UI.Window();
var Clay = require('./clay');
var config = require('./config.js');
var clay = new Clay(config);
var dict;

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading data...',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
  backgroundColor:'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Loading
// var loadingCard = new UI.Card({
//   title:'Rebecca',
//   subtitle:'Fetching times...'
// });

// Show Loading Screen
// loadingCard.show();
// Fetcher.initialSetup(splashWindow);

Pebble.addEventListener('showConfiguration', function(e) {
//     var platform = clay.meta.activeWatchInfo.platform || 'basalt';
    clay.config = config;

    Pebble.openURL(clay.generateUrl());
});

// SETTINGS STUFF
Pebble.addEventListener('webviewclosed', function(e) {
    if (e && !e.response) {
        return;
    }

    // Get the keys and values from each config item
    dict = clay.getSettings(e.response);

    // Send settings values to watch side
    Pebble.sendAppMessage(dict, function(e) {
        console.log('Sent config data to Pebble');
    }, function(e) {
        console.log('Failed to send config data!');
        console.log(JSON.stringify(e));
    });
});

console.log(dict);
console.log(typeof dict);
Fetcher.fetchTimes(splashWindow, dict);