"use strict";

// var scriptsModule = require('./scripts.js');
// var speechModule = require('./speech.js');

// import { speechRecognition } from 'speech'

$(document).ready(function() {
  init();
});

function init() {
  speechRecognition.initialize();
  pageScripts.activateModal();
}