var UI = require('ui');
var Fetcher = require('./Fetcher');
var Clay = require('./clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);
var Vector2 = require('vector2');

var splashWindow = new UI.Window();

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
Fetcher.fetchTimes(splashWindow);