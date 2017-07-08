"use strict";

var scriptsModule = require('./scripts');

$(document).ready(function() {
    console.log("speech js loaded");

    var recognizing = false;
    var ignore_onend;
    var final_transcript = '';
    var start_timestamp;
    var isCommand = false;
    var input_val = document.getElementById('form-input');

    // Web Speech
    if (!('webkitSpeechRecognition' in window)) {
        upgrade();
    } else {
        console.log('speech recognition function');
        var grammar = '#JSGF V1.0; grammar words; public <commands> = on-screen | home screen | june search ;'
        var recognition = new webkitSpeechRecognition();

        // grammar stuff
        var speechRecognitionList = new webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        //console.log(speechRecognitionList[0].src);

        recognition.continuous = true;
        //console.log(recognition.continuous);
        recognition.interimResults = true;

        //console.log(document.getElementById("sent").title);

        // On Start
        recognition.onstart = function(event) {
            console.log('Speech recognition service has started');
            recognizing = true;
        };

        // On Audio Start
        recognition.onaudiostart = function(event) {
            console.log('Audio capturing started');
            // pass value to have css change 
            // indicate that jun is listening
        };

        // On Error
        recognition.onerror = function(event) {
            if (event.error == 'no-speech') {
                console.log('error');
                recognition.continuous = true;
                recognition.start();
            }
        };

        // Continue listening
        if (document.getElementById("sent").title == 'True') {
            recognition.start();
        }

        // On end
        recognition.onend = function() {
            console.log('Speech recognition service disconnected');
            recognizing = false;
        };

        // On Result
        recognition.onresult = function(event) {
            console.log('Audio result');
            var command = '';
            var returned_speech = event.results[0][0].transcript;
            console.log(returned_speech + " RETURNED SPEECH");

            // auto update input file not working
            // document.getElementById('form-input').value += returned_speech;

            if (returned_speech == 'on-screen' || returned_speech == 'home screen') {
                command = returned_speech;
                console.log('the command is ' + command);
                isCommand = true;
                activateModal(); // figure out how to do this
            }

            // if (returned_speech == 'june search') {
            //     command = returned_speech;
            //     console.log('the command is ' + command);
            //     isCommand = true;
            //     recognition.start();
            // }

            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    input_val.value += event.results[i][0].transcript;
                }
            }
            input_val.value = capitalize(final_transcript);
            console.log(input_val.value);
            if (input_val.value && isCommand === false) {
                submitForm();
            }
        };

        // Submit Form
        function submitForm() {
            document.getElementById('search-form').submit();
        }

        // Capitalize
        var first_char = /\S/;
        function capitalize(s) {
            return s.replace(first_char, function(m) { return m.toUpperCase(); });
        }

        $("#voice-btn").click(function() {
            console.log("voice-btn click");
            startButton(event);
        });

        // Start Button
        function startButton(event) {
            if (recognizing) {
                recognition.stop();
                return;
            }
            final_transcript = '';
            //recognition.lang = select_dialect.value;
            recognition.start();
            ignore_onend = false;
            //final_span.innerHTML = '';
            // grab input value to be editting on speech
            var input_val = document.getElementById('form-input');
            input_val.value = '';
            //interim_span.innerHTML = '';
            //start_img.src = 'mic-slash.gif';
            //showInfo('info_allow');
            //howButtons('none');
            start_timestamp = event.timeStamp;
        }
    }
});