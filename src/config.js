/* global module */
var stationOptions = require('./lirr-stations-options');
module.exports = [
  {
    "type": "heading",
    "defaultValue": "Rebecca: Settings"
  },
  {
    "type": "text",
    "defaultValue": "Set home/work stations, arrive/departure times, etc."
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Home / Work Stations"
      },
      {
        "type": "select",
        "label": "Set home station.",
        "messageKey": "mk_home_station",
        "id": "id_home_station",
        "defaultValue": "Penn Station",
        "options": stationOptions
      },
      {
        "type": "select",
        "label": "Set work station.",
        "messageKey": "mk_work_station",
        "id": "id_work_station",
        "defaultValue": "Penn Station",
        "options": stationOptions
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Arrive By / Depart At"
      },
      {
        "type": "input",
        "id": "arrive_by_time",
        "messageKey": "mk_arrive_by_time",
        "label": "Arrive To Work Station By (1-24)",
        "defaultValue": "9",
        "attributes": {
          "placeholder": "9"
        }
      },
      {
        "type": "input",
        "id": "depart_by_time",
        "messageKey": "mk_depart_by_time",
        "label": "Depart For Home Station By (1-24)",
        "defaultValue": "17",
        "attributes": {
          "placeholder": "17"
        }
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];