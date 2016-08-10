var UI = require('ui');
var Fetcher = require('./Fetcher.js');

// Loading
var loadingCard = new UI.Card({
  title:'Rebecca',
  subtitle:'Fetching times...'
});

// Show Loading Screen
loadingCard.show();

Fetcher.fetchTimes(loadingCard);