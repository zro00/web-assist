import createPonyfill from "web-speech-cognitive-services/lib/SpeechServices";


function text_to_speech(msg, speechSynthesis, SpeechSynthesisUtterance){
  let voices = speechSynthesis.getVoices();
  let utterance = new SpeechSynthesisUtterance(msg);
  utterance.voice = voices.find((voice) => /JessaRUS/u.test(voice.name));
  speechSynthesis.speak(utterance);
}

function speech_to_text(SpeechRecognition) {
  const confidenceLevel = 0.4;
  let textData;
  console.log("getting voice data");
  const recognition = new SpeechRecognition();

    //recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = ({ results }) => {
      //console.log(results);
      //let x = results;
      //console.log(typeof results);

      let speechData = results[0][0];
      console.log(speechData);
      let isFinalCheck = results[0].isFinal;

      if (isFinalCheck && speechData.confidence > confidenceLevel) {
        textData = speechData.transcript;
        console.log(textData);
        
        // Web Socket is connected, send data using send()
        ws.send(textData);
        console.log("Message is sent...");
      } else {
        //text_data = "Sorry could you repeat that agiain!";
        //text_to_speech(text_data, speechSynthesis, SpeechSynthesisUtterance);
        console.log("error");
      }
      /*for (item in results) {
        console.log(item);
      }*/
      //console.log(results[0].confidence);
      //console.log(x[0].isfinal);
      //console.log(results.transcript);
    };

    recognition.start();
}

let list = document.getElementById("listen");
list.disabled = true;
if ("WebSocket" in window) {
    //alert("WebSocket is supported by your Browser!");
    
    // Let us open a web socket
    var ws = new WebSocket("wss://34.122.187.227:8000/voice");
    const ponyfill = createPonyfill({
      credentials: {
        //authorizationToken: authToken.token,
        subscriptionKey: "be80b268d9534e70bd813356e4642fd4",
        //authorizationToken: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiI4YzM0MDQzZGEzYWI0NGQ2YmVkMmE0NjBjNjdjZTcwNiIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8xNTIwMmRhMy05M2FmLTQ2YjEtOWZkYi1hZDU5MmU0MmNmZDcvcmVzb3VyY2VHcm91cHMvd2ViLWFzc2lzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3dlYi1hc3Npc3Qtc3BlZWNoLTEiLCJzY29wZSI6InNwZWVjaHNlcnZpY2VzIiwiYXVkIjoidXJuOm1zLnNwZWVjaHNlcnZpY2VzLmVhc3R1cyIsImV4cCI6MTU4OTY0Nzk2MCwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.StmrszxZ3zC1cFpjErQnwOL',
        region: "eastus",
      },
    });
  
    const {
      SpeechRecognition,
      speechSynthesis,
      SpeechSynthesisUtterance,
    } = ponyfill;
  
    ws.onopen = function() {
      console.log("CONNECTED");
      //let list = document.getElementById("listen");
      list.disabled = false;
      list.addEventListener("click", () => {
      speech_to_text(SpeechRecognition);
  });  
    }
    ws.onmessage = function (evt) { 
      let received_msg = evt.data;
      text_to_speech(received_msg, speechSynthesis, SpeechSynthesisUtterance);
    };
    
    ws.onclose = function() { 
      // websocket is closed.
      console.log ("WEBSOCKET CONNETCTION CLOSING"); 
      };
  }
else {
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");
}
//import { DirectLine } from 'botframework-directlinejs';
// For Node.js:
// const { DirectLine } = require('botframework-directlinejs');


/*while (Porcupine.isLoaded() !== true){
  continue;
}
let keywordModels = [new Uint8Array([0x8d, 0x9a, 0x9e, 0x3e, 0x6a, 0xf2, 0x11, 0x40, 0xc4, 0x91, 0x94, 0xdd, 0xf5, 0xe0, 0xf1, 0xc1, 0xc1,
  0x2d, 0x15, 0x71, 0x62, 0x29, 0x4d, 0x15, 0x41, 0x9b, 0x59, 0x48, 0x2d, 0xe0, 0x28, 0x4c, 0x97, 0x36,
  0x77, 0x90, 0xc1, 0xe2, 0x18, 0xf5, 0x4e, 0x5b, 0x71, 0xd0, 0x99, 0x34, 0x0c, 0x51, 0x4f, 0xfa, 0xe3,
  0x36, 0xd2, 0x25, 0x6e, 0xe8, 0xea, 0x9a, 0xe2, 0xb3, 0x56, 0x0b, 0x12, 0x1f, 0xb2, 0xf4, 0x0a, 0xe6,
  0xba, 0xd7, 0xf4, 0x32, 0x78, 0x98, 0x0f, 0xd4, 0x4f, 0x0a, 0xf4, 0xe3, 0xd8, 0x40, 0x0a, 0xc1, 0x15,
  0xff, 0x78, 0xde, 0x58, 0xa8, 0x36, 0x09, 0xc7, 0x96, 0xb8, 0xf7, 0xf0, 0x86, 0x7e, 0x66, 0x48, 0x81,
  0x83, 0xec, 0x7e, 0xdd, 0x1a, 0xbb, 0x23, 0x0a, 0x1a, 0x21, 0x29, 0x29, 0x68, 0x40, 0x61, 0xa4, 0x8c,
  0xcf, 0x03, 0xbb, 0xf5, 0x87, 0x92, 0x70, 0x17, 0xeb, 0xa4, 0xbb, 0x93, 0x17, 0x57, 0x37, 0x22, 0xb3,
  0x45, 0x0e, 0x9b, 0x36, 0x42, 0xa4, 0xf5, 0x3b, 0x41, 0xe4, 0x9e, 0xf9, 0xbb, 0xd9, 0xfd, 0xa3, 0x91,
  0x50, 0x94, 0x72, 0x7c, 0x2a, 0xf9, 0x82, 0x65, 0xa9, 0x9a, 0x08, 0x31, 0x06, 0x4a, 0x0b, 0x01, 0x4b,
  0x05, 0x3c, 0x0a, 0x4f, 0x00, 0xf7, 0xd7, 0xb7, 0xec, 0x7f, 0xf0, 0x77, 0x41, 0x25, 0x57, 0x91, 0xf1,
  0x64, 0x3e, 0xab, 0x72, 0x22, 0x64, 0x5f, 0x07, 0x55, 0x75, 0x62, 0xd4, 0x35, 0x3d, 0x21, 0xd0, 0x42,
  0x4c, 0x23, 0xef, 0x05, 0xed, 0xa8, 0x61, 0xbb, 0xae, 0x19, 0x49, 0x84, 0x60, 0xf4, 0x90, 0x74, 0x4e,
  0x1c, 0x9d, 0xca, 0x38, 0xff, 0x6e, 0xc9, 0x23, 0x9b, 0xca, 0x5a, 0x7a, 0x40, 0xf9, 0x12, 0x4d, 0xf5,
  0x96, 0x52, 0xa6, 0xc0, 0x98, 0x78, 0x63, 0x6e, 0xc5, 0xe4, 0xfa, 0xc6, 0x95, 0xa0, 0x1d, 0x4b, 0x51,
  0x9b, 0x68, 0x24, 0x09, 0xe2, 0x51, 0x61, 0x54, 0x95, 0xde, 0xd8, 0x85, 0x77, 0x2d, 0xe4, 0xfd, 0x4f,
  0xb3, 0x88, 0x59, 0x9a, 0x50, 0x27, 0x04, 0x10, 0x10, 0x69, 0x00, 0xc3, 0xe4, 0xe5, 0xf5, 0x7e, 0x62,
  0xe4, 0x6a, 0x50, 0x05, 0x66, 0x97, 0x85, 0x2f, 0xfd, 0x86, 0x98, 0x66, 0xb3, 0xff, 0xd3, 0x8d, 0x06,
  0x42, 0xfe, 0x65, 0x6d, 0x11, 0x04, 0xdd, 0xb4, 0xd5, 0x00, 0xf1, 0x62, 0x4b, 0x7d, 0xf9, 0x0d, 0x8b,
  0xc1, 0xef, 0xd7, 0x0a, 0xe3, 0xa1, 0x7a, 0xad, 0x1d, 0x12, 0xa7, 0xa8, 0x98, 0x38, 0x00, 0x99, 0xb2,
  0x75, 0xd8, 0x14, 0x1b, 0x57, 0x04, 0xb7, 0xd8, 0x7b, 0x69, 0x23, 0x93, 0x0e, 0x8d, 0x49, 0xbd, 0x44,
  0x01, 0xab, 0x2f, 0x57, 0x6b, 0x3c, 0x1d, 0x7c, 0x15, 0xe7, 0xcb, 0xe7, 0xb5, 0x76, 0xf7, 0x6a, 0x3d,
  0xc5, 0x21, 0xd8, 0x4d, 0x5e, 0x35, 0xdc, 0x7a, 0x8e, 0xb7, 0x2c, 0xe8, 0xf9, 0x89, 0x45, 0xc8, 0xcc,
  0x1e, 0x3d, 0x39, 0x0e, 0x45, 0x51, 0x6a, 0x3c, 0x45, 0x06, 0x92, 0x52, 0x2f, 0xea, 0x85, 0x61, 0x40,
  0xb9, 0xa6, 0x9a, 0x00, 0x0c, 0x1c, 0xb4, 0xd7, 0x02, 0xda, 0x7f, 0xb2, 0x4c, 0xe2, 0x10, 0xa5, 0x25,
  0x6a, 0xc8, 0xe3, 0x4f, 0x90, 0x83, 0x3e, 0xd2, 0x05, 0x8b, 0xe2, 0x87, 0x14, 0x3c, 0x35, 0xd5, 0x71,
  0x99, 0x3a, 0x41, 0x58, 0xc5, 0x88, 0x8b, 0xe7, 0x4f, 0xd0, 0x8c, 0x67, 0x13, 0xbe, 0x7a, 0x32, 0xf3,
  0x65, 0x4a, 0xe7, 0x76, 0x4b, 0xaa, 0xdc, 0xc1, 0xe5, 0xa6, 0x78, 0x93, 0x9d, 0x44, 0x18, 0x84, 0xb3,
  0xac, 0xef, 0x45, 0x00, 0x5e, 0x45, 0x0e, 0xed, 0x19, 0x99, 0x59, 0x88, 0xfc, 0xa2, 0x0b, 0x2e, 0x9b,
  0x2e, 0x22, 0xbd, 0x15, 0x0a, 0x94, 0xfc, 0x37, 0x4f, 0x95, 0x5f, 0x50, 0xd1, 0x80, 0xe8, 0xdb, 0xf6,
  0x19, 0x58, 0x52, 0xd4, 0x29, 0x83, 0x63, 0x95, 0x70, 0x25, 0x21, 0xd7, 0xb1, 0xe7, 0x3e, 0x48, 0x98,
  0xf8, 0x8e, 0x24, 0x55, 0x73, 0xee, 0x56, 0xd8, 0x29, 0x74, 0x9b, 0xba, 0xc4, 0x83, 0x81, 0xbc, 0x48,
  0xdc, 0xd9, 0xe5, 0x26, 0xbf, 0xa3, 0x6c, 0xd3, 0x6c, 0xaa, 0x64, 0x28, 0xd1, 0x50, 0x89, 0x8e, 0x96,
  0xc8, 0xba, 0xfa, 0x32, 0x7f, 0xf9, 0x64, 0x39, 0x2c, 0xc2, 0x03, 0x35, 0x7b, 0x05, 0x20, 0xc2, 0xe6,
  0x50, 0xcc, 0xfa, 0x18, 0x2d, 0x3e, 0xf9, 0x57, 0x98, 0x82, 0xe8, 0x39, 0x74, 0x87, 0x6a, 0xe8, 0xb2,
  0x3b, 0xaa, 0x8a, 0x4f, 0x24, 0x8a, 0x8d, 0x25, 0x80, 0x70, 0x43, 0xd8, 0x32, 0xe1, 0x36, 0xf4, 0x03,
  0xfe, 0x3f, 0xde, 0x87, 0xc5, 0x3f, 0x46, 0x2e, 0x15, 0x75, 0x8a, 0x2c, 0x60, 0xd0, 0x24, 0x05, 0xf3,
  0xdb, 0x81, 0xb0, 0xca, 0x2e, 0xcd, 0x59, 0x1c, 0x28, 0x55, 0xb3, 0x6c, 0xf3, 0x39, 0xf1, 0x71, 0x52,
  0x4c, 0x0a, 0x83, 0x88, 0x89, 0xce, 0xb2, 0x68, 0x1a, 0xff, 0xf7, 0xe3, 0xde, 0x59, 0xbd, 0x5a, 0x62,
  0x72, 0x64, 0x84, 0xf2, 0x8d, 0xbb, 0xd6, 0x36, 0x09, 0x0f, 0x4e, 0xaa, 0xd3, 0x9b, 0x48, 0x16, 0x91,
  0x96, 0x04, 0x11, 0x87, 0x7c, 0x4f, 0x95, 0x10, 0x90, 0x2c, 0xdc, 0xf0, 0x52, 0x10, 0xe1, 0x79, 0x6e,
  0xff, 0xf5, 0x82, 0x20, 0xf9, 0x8a, 0x82, 0x4a, 0xc6, 0x70, 0xec, 0xff, 0x50, 0x6f, 0x8d, 0x21, 0xda,
  0xb3, 0x70, 0x4d, 0x36, 0x22, 0xf2, 0x6a, 0xd3, 0xef, 0x11, 0x3a, 0x0e, 0xfa, 0x2e, 0xf4, 0x6c, 0x20,
  0x1a, 0xae, 0x99, 0x9b, 0x23, 0xaa, 0x27, 0x05, 0xa4, 0x31, 0x8b, 0x91, 0x49, 0x30, 0x72, 0xf8, 0x2f,
  0xf1, 0x71, 0x4e, 0x66, 0xdc, 0x6a, 0x40, 0x48, 0x02, 0x5e, 0xc6, 0x8a, 0x5e, 0xa5, 0x26, 0x5d, 0x07,
  0x29, 0x04, 0x34, 0x6f, 0x07, 0x90, 0xf5, 0xaa, 0x18, 0xe6, 0x31, 0x5a, 0x61, 0x8c, 0x48, 0xed, 0xb2,
  0xb4, 0x69, 0xfa, 0xa4, 0x2c, 0x6c, 0xb5, 0xdd, 0xea, 0x57, 0x3e, 0xe8, 0x56, 0x22, 0x6d, 0xd1, 0x28,
  0xfc, 0xf6, 0xb3, 0xd8, 0xc2, 0xf1, 0x34, 0xd9, 0xbb, 0x56, 0x4c, 0xdd, 0xe8, 0xa5, 0x55, 0x26, 0x5c,
  0x78, 0xda, 0x6d, 0xda, 0x10, 0xc4, 0xc5, 0x6f, 0x94, 0x1b, 0xd2, 0x2b, 0x50, 0xea, 0xb3, 0xd8, 0xb7,
  0xcd, 0x0f, 0xcc, 0x87, 0x53, 0xcd, 0x56, 0xb3, 0x32, 0xbf, 0x95, 0xef, 0x05, 0x11, 0x0f, 0x84, 0xf4,
  0x6b, 0x0c, 0x7f, 0x23, 0xda, 0x31, 0x47, 0xc3, 0x1f, 0x8e, 0x9c, 0xdb, 0xd9, 0xfd, 0x10, 0x1d, 0x29,
  0x47, 0x87, 0xb0, 0x7f, 0x13, 0x9e, 0xca, 0x6b, 0xed, 0xdd, 0x35, 0xee, 0x8f, 0x40, 0x8b, 0xb3, 0xf2,
  0xd5, 0x4e, 0x33, 0x2c, 0x6e, 0x33, 0x0e, 0xb8, 0x10, 0x02, 0x33, 0xc6, 0xcc, 0x24, 0x37, 0xd7, 0x80,
  0xdb, 0xc5, 0x71, 0x54, 0x9f, 0x26, 0xf6, 0xee, 0xbb, 0xb8, 0xc2, 0x13, 0xd7, 0x5e, 0xe6, 0xd4, 0x1f,
  0x48, 0x82, 0xf2, 0xea, 0x3c, 0xa5, 0xe6, 0x70, 0xbe, 0xee, 0x9e, 0xf8, 0x75, 0xbe, 0x51, 0xae, 0xe3,
  0x0a, 0x89, 0x15, 0xd3, 0x34, 0xe4, 0x3b, 0x54, 0x7e, 0xae, 0xad, 0x08, 0xe5, 0xdc, 0x6e, 0xaa, 0x12,
  0xa4, 0xa8, 0xc2, 0xf8, 0x30, 0x05, 0xba, 0x61, 0x8e, 0x83, 0xc7, 0x5b, 0x22, 0xe0, 0xc8, 0x48, 0x5c,
  0xa4, 0x11, 0x8c, 0xac, 0x4f, 0xaf, 0x9a, 0xc5, 0xcb, 0x12, 0x7b, 0x9e, 0x89, 0xbc, 0xac, 0xaf, 0x95,
  0x88, 0x50, 0x1a, 0x53, 0x01, 0xe4, 0x67, 0xd9, 0xc2, 0x28, 0x89, 0x95, 0xa0, 0xa9, 0x0d, 0xe9, 0x24,
  0x60, 0x1d, 0xfa, 0x9f, 0xf9, 0x83, 0xeb, 0xe5, 0xa7, 0x1a, 0x07, 0xef, 0x41, 0x53, 0x5e, 0xa7, 0x66,
  0xa2, 0xc5, 0xe7, 0x49, 0x06, 0xde, 0x75, 0x7d, 0x11, 0x85, 0x3c, 0x3b, 0x80, 0x24, 0xe9, 0x55, 0x47,
  0x15, 0xbc, 0xcd, 0xe1, 0xf7, 0xa8, 0x45, 0x17, 0xd9, 0xc5, 0x9d, 0xba, 0x62, 0x6f, 0xab, 0x1a, 0x84,
  0x02, 0xe7, 0x07, 0xf7, 0x76, 0x41, 0x2c, 0x6c, 0x3c, 0x6b, 0x89, 0x9d, 0x84, 0xfb, 0x4d, 0x21, 0x7c,
  0x09, 0x98, 0x52, 0x70, 0x5b, 0x47, 0x31, 0xd4, 0x28, 0xba, 0xa1, 0x83, 0x36, 0x6a, 0x48, 0x14, 0x6c,
  0x9a, 0x85, 0xfe, 0x19, 0xa4, 0xa1, 0xa5, 0xee, 0xec, 0xc9, 0xb0, 0xf5, 0x97, 0x96, 0x37, 0xdc, 0xea,
  0x65, 0xd5, 0x8f, 0x6e, 0x1a, 0x4f, 0x9d, 0xb4, 0xcc, 0xb7, 0x0e, 0x2b, 0x69, 0x23, 0xee, 0x4d, 0x0d,
  0xd8, 0x84, 0x66, 0xf1, 0x1a, 0x90, 0x28, 0xfc, 0x3a, 0x2e, 0x3b, 0x34, 0x1b, 0xd4, 0xb6, 0xbf, 0xf0,
  0x6e, 0xb3, 0x2a, 0xa4, 0xaa, 0x04, 0xca, 0x69, 0x0f, 0x50, 0xc6, 0x29, 0x17, 0x8f, 0xe0, 0x7c, 0xb7,
  0xbe, 0x0c, 0x7c, 0xfd, 0xcf, 0x2a, 0x10, 0x9f, 0x09, 0x8f, 0x14, 0x94, 0x1d, 0x99, 0x4f, 0x3e, 0xdf,
  0x69, 0xbd, 0x9d, 0xa5, 0xa4, 0xb1, 0xe5, 0x55, 0xe6, 0xf9, 0x85, 0x12, 0x46, 0x01, 0xa5, 0x7b, 0x62,
  0x2f, 0x69, 0xa7, 0xd9, 0x93, 0xb8, 0xa4, 0x14, 0x3d, 0x66, 0x4e, 0x4d, 0xcf, 0xd3, 0x13, 0xda, 0xfb,
  0x28, 0x7b, 0x92, 0xd2, 0x63, 0x2b, 0x3e, 0x82, 0x18, 0x9f, 0x1f, 0x40, 0x26, 0xa8, 0x9c, 0x77, 0xb9,
  0xdc, 0xe9, 0xf8, 0x30, 0x0a, 0xd0, 0xb0, 0xc6, 0x84, 0xf6, 0xed, 0x5a, 0x08, 0x68, 0xfa, 0x5b, 0x7a,
  0x24, 0x12, 0x0b, 0x7b, 0x3d, 0x47, 0x82, 0xe3, 0x07, 0x33, 0xb2, 0x4d, 0x1e, 0xdd, 0x59, 0x95, 0x9d,
  0x75, 0x8b, 0x26, 0x3f, 0xce, 0xdd, 0x09, 0x4a, 0x27, 0xb6, 0x1e, 0xd7, 0xd4, 0x00, 0x59, 0x27, 0x41,
  0x5d, 0xda, 0x1d, 0x00, 0xc9, 0xb5, 0x05, 0x34, 0x9c, 0xc8, 0x51, 0x35, 0x9b, 0x6c, 0xe8, 0x68, 0xe7,
  0x76, 0x3b, 0x6a, 0xb3, 0x66, 0x01, 0xaa, 0x4b, 0x5e, 0xa5, 0x17, 0xc4, 0xf7, 0xa0, 0x44, 0xc8, 0x03,
  0x53, 0xdb, 0x0a, 0x6b, 0x13, 0xe1, 0x62, 0x3b, 0x4a, 0x49, 0x00, 0xf4, 0x6b, 0xf9, 0x2e, 0x3b, 0x04,
  0x19, 0x09, 0x44, 0xb5, 0xb4, 0x03, 0x1b, 0x0c, 0x6e, 0x6e, 0x89, 0xb1, 0x9c, 0x3a, 0xe6, 0xd7, 0x26,
  0xbd, 0x9b, 0xd9, 0x1e, 0x6f, 0xf6, 0xea, 0x42, 0xd5, 0x55, 0x0b, 0xd1, 0xde, 0x8f, 0xdd, 0x95, 0x78,
  0xd3, 0x0e, 0xc0, 0x79, 0x03, 0x1e, 0xc5, 0x25, 0x73, 0xbe, 0x17, 0x50, 0x72, 0xf3, 0x53, 0x5d, 0xc1,
  0x55, 0x51, 0xdc, 0x8d, 0x7e, 0xa5, 0x52, 0x98, 0x3f, 0xcd, 0x9c, 0x0a, 0x57, 0x8d, 0x6d, 0x77, 0x90,
  0xc7, 0x87, 0xcc, 0x67, 0x2b, 0xc0, 0x22, 0x84, 0x60, 0xd8, 0x0f, 0xb3, 0x07, 0x6e, 0x01, 0x65, 0x22,
  0xfa, 0xd7, 0x8d, 0xfc, 0x4f, 0xc2, 0xf6, 0x5a, 0xcf, 0xe3, 0x95, 0x1b, 0x6f, 0x9f, 0x3c, 0x80, 0xd7,
  0x5f, 0xab, 0x37, 0x45, 0x27, 0xbd, 0xf1, 0xc0, 0xcf, 0xfa, 0x04, 0x2c, 0x79, 0xa4, 0xfc, 0xb3, 0x59,
  0xfb, 0xcb, 0xd1, 0x28, 0xc3, 0x59, 0xc4, 0x04, 0xf5, 0xd4, 0x7b, 0xa3, 0xb8, 0x9b, 0xfa, 0x2a, 0xb7,
  0x0e, 0xd2, 0x44, 0x19, 0xe2, 0xa3, 0xbf, 0x12, 0xa0, 0x57, 0x7d, 0xa8, 0x2d, 0x15, 0xbf, 0xc4, 0xae,
  0xe0, 0xd2, 0xe0, 0x94, 0xfc, 0x38, 0xd5, 0xce, 0xf6, 0xe3, 0x9e, 0xdf, 0xba, 0x20, 0xc8, 0x10, 0xbc,
  0x72, 0x65, 0xa6, 0x41, 0x12, 0x25, 0x14, 0x02, 0xd1, 0x0f, 0xef, 0xbf, 0x3f, 0x10, 0xac, 0xb3, 0x6f,
  0xd1, 0x1f, 0x2c, 0x7b, 0x79, 0xca, 0x43, 0xb9, 0x4f, 0x2c, 0x32, 0x66, 0x2f, 0x37, 0x06, 0x3a, 0xd5,
  0x1f, 0xb1, 0x14, 0xef, 0x7b, 0x20, 0x58, 0x9d, 0xda, 0x2a, 0x1c, 0x4d, 0x65, 0x4b, 0xca, 0x2c, 0x1c,
  0x87, 0x46, 0x4b, 0x42, 0xe6, 0x62, 0x64, 0x4f, 0x07, 0xc4, 0x1d, 0x26, 0x5e, 0xe0, 0xcc, 0xa7, 0x5b,
  0x9c, 0x7c, 0x19, 0x89, 0xba, 0x42, 0x71, 0xac, 0x55, 0xa4, 0xc2, 0xa2, 0x1c, 0x9e, 0x80, 0x20, 0xf8,
  0x01, 0x0e, 0x2f, 0xff, 0x00, 0x37, 0x7a, 0xab, 0x8e, 0xea, 0xb5, 0x6e, 0x8e, 0xee, 0xb3, 0x3a, 0xac,
  0xbe, 0xf4, 0xb9, 0x7f, 0xfa, 0x13, 0xcb, 0xbc, 0xeb, 0x1a, 0xa4, 0xfe, 0x17, 0x02, 0xea, 0x3c, 0x65,
  0xcc, 0x69, 0x95, 0xbc, 0x4e, 0x64, 0x06, 0x22, 0xfa, 0xb1, 0x50, 0x35, 0x52, 0xf8, 0xc8, 0xf8, 0x16,
  0xbf, 0xcb, 0xdd, 0x91, 0x45, 0x1c, 0x0d, 0x9b, 0xc0, 0xb1, 0x28, 0x8a, 0xa6, 0xb1, 0x54, 0x07, 0x9f,
  0x6b, 0x4c, 0x8f, 0x84, 0xb5, 0xf1, 0x03, 0x19, 0x7e, 0x7d, 0xd4, 0x50, 0x01, 0xd3, 0xbf, 0x5d, 0xcb,
  0x52, 0x59, 0x77, 0x87, 0xa7, 0xb2, 0x01, 0xe1, 0x8b, 0x0e, 0x21, 0xcc, 0x27, 0xdf, 0xf6, 0x39, 0x46,
  0x8c, 0xdb, 0x05, 0xf2, 0xb1, 0x1e, 0xd2, 0xbc, 0x4f, 0x05, 0xa5, 0x94, 0x6f, 0x39, 0xae, 0x65, 0x8e,
  0xfe, 0x8e, 0x9d, 0xfa, 0x74, 0x32, 0x99, 0xf7, 0x50, 0xbd, 0x4a, 0x31, 0x32, 0x08, 0x0c, 0x81, 0xdd,
  0xb9, 0xd1, 0x23, 0x81, 0x0e, 0x74, 0x7a, 0x68, 0xbf, 0x1e, 0xfb, 0x47, 0x59, 0x3c, 0x1d, 0xb0, 0x4b,
  0x28, 0xb8, 0xde, 0xd1, 0xa0, 0x2e, 0xda, 0x7a, 0x9e, 0xbd, 0x5f, 0xde, 0xc5, 0x7e, 0x47, 0x94, 0x51,
  0x76, 0x28, 0xa7, 0xb7, 0x22, 0x91, 0xac, 0xac, 0xb1, 0x91, 0xaf, 0x31, 0xca, 0x9e, 0x2d, 0xf9, 0x6c,
  0xf8, 0xe5, 0xf3, 0x9d, 0x10, 0x54, 0x99, 0xe3, 0x0a, 0x7b, 0x18, 0x4c, 0x0c, 0xa1, 0x33, 0x44, 0xb1,
  0x07, 0xf0, 0x1b, 0x76, 0x9d, 0xff, 0x0e, 0xc7, 0xe4, 0x9a, 0xd3, 0xa6, 0x41, 0x96, 0x09, 0x91, 0x26,
  0xcd, 0x72, 0x39, 0xb3, 0xbe, 0xbb, 0xf7, 0x31, 0xf5, 0x2f, 0xd2, 0x84, 0x3a, 0x6e, 0xf8, 0xa7, 0xb6,
  0x71, 0x2f, 0xa0, 0x04, 0x85, 0x3c, 0x8a, 0xef, 0xbe, 0x76, 0x4a, 0x03, 0x81, 0x6e, 0x8d, 0xf7, 0x85,
  0xa6, 0xd8, 0x38, 0xf0, 0x1c, 0xb8, 0x18, 0x21, 0x96, 0x61, 0xfd, 0x18, 0x02, 0x2a, 0xef, 0x53, 0x80,
  0x00, 0xe0, 0x61, 0x82, 0xcd, 0x8e, 0x98, 0xf8, 0x49, 0xc2, 0xd4, 0x32, 0xbc, 0x3d, 0xcb, 0x71, 0x03,
  0xf6, 0xad, 0xc5, 0xf9, 0x29, 0x8e, 0xfd, 0x67, 0x52, 0xfd, 0x5b, 0x20, 0x4f, 0xdd, 0x5f, 0xe5, 0xb1,
  0xa5, 0x6d, 0xa8, 0x85, 0xcb, 0x55, 0x68, 0xa4, 0x84, 0x80, 0xf0, 0x6e, 0x72, 0x12, 0x3c, 0xb5, 0xc1,
  0xe2, 0xc4, 0x8f, 0x87, 0xe0, 0xae, 0x15, 0x1f, 0x5e, 0x5f, 0xde, 0x21, 0x53, 0xd3, 0xf5, 0xae, 0xe9,
  0x9f, 0xa8, 0x8d, 0x53, 0x7c, 0xd1, 0x87, 0xe3, 0xac, 0x72, 0xed, 0x2c, 0xcc, 0x6c, 0x0f, 0xd5, 0x63,
  0x55, 0xfc, 0xbc, 0xee, 0x86, 0x23, 0xf7, 0x49, 0x23, 0xd4, 0x32, 0xff, 0x12, 0xd9, 0x7a, 0x6d, 0x23,
  0xc1, 0xe5, 0x52, 0x5c, 0xb8, 0xdf, 0xb8, 0x4d, 0x5d, 0x42, 0x83, 0xeb, 0x84, 0xdc, 0xae, 0xec, 0xd3,
  0x62, 0xa8, 0xcb, 0xbf, 0xd9, 0x8d, 0x28, 0x87, 0x22, 0x5c, 0x99, 0x52, 0x6a, 0x4b, 0xed, 0xcb, 0xcc,
  0xc7, 0xef, 0xd6, 0x9e, 0x22, 0x65, 0xdb, 0xce, 0x6d, 0x38, 0x33, 0x92, 0xae, 0x98, 0xea, 0xcb, 0x8c,
  0xb7, 0x0c, 0xda, 0x5c, 0x63, 0x6b, 0xad, 0x24, 0x16, 0x1c, 0x22, 0x53, 0xce, 0xba, 0x72, 0xc8, 0x5a,
  0x64, 0x63, 0x9b, 0x96, 0xe5, 0xe0, 0xa3, 0x75, 0x16, 0xfa, 0x4f, 0x22, 0xb4, 0x1f, 0x06, 0xb6, 0x29,
  0xb7, 0x74, 0xa3, 0x8c, 0x2d, 0x4b, 0xbf, 0x01, 0x63, 0x39, 0xa0, 0xf1, 0xe8, 0xc2, 0x6e, 0xc8, 0xd9,
  0xf5, 0x00, 0x3b, 0x80, 0x9c, 0xd2, 0x91, 0x50, 0x8e, 0x6a, 0x12, 0xae, 0x8e, 0xdf, 0x39, 0x6f, 0x41,
  0xb9, 0x84, 0x4d, 0xc3, 0x11, 0x2d, 0x6f, 0xac, 0xcd, 0x41, 0x82, 0x38, 0x65, 0xa4, 0xac, 0x31, 0x3b,
  0x41, 0x4b, 0xf6, 0x7d, 0xb6, 0x6a, 0xf8, 0xcf, 0x76, 0x4a, 0xc5, 0x0c, 0x76, 0xd8, 0x92, 0xc9, 0xd2,
  0xcc, 0xc9, 0xb6, 0x78, 0xcf, 0xf8, 0x8d, 0x2c, 0x62, 0xbb, 0x2d, 0xe1, 0xd9, 0x4a, 0x35, 0x08, 0xe5,
  0x0d, 0xc2, 0xfa, 0x00, 0x31, 0x6b, 0xaf, 0xe7, 0xa4, 0x8e, 0x0c, 0xd0, 0x66, 0x3b, 0xdf, 0x73, 0xc7,
  0x37, 0x83, 0xbf, 0x05, 0xf7, 0xc3, 0xe3, 0xac, 0x8d, 0x08, 0x81, 0xb2, 0xd6, 0xa9, 0x35, 0x6c, 0xe2,
  0xbf, 0x60, 0x8b, 0x1a, 0x06, 0x11, 0xfa, 0x13, 0x82, 0x42, 0x44, 0x1b, 0xb7, 0xd6, 0xb4, 0xad, 0x5f,
  0xe5, 0x99, 0xa6, 0x92, 0xab, 0x59, 0xca, 0x0a, 0xad, 0x0b, 0x8e, 0xad, 0x0b, 0x71, 0x43, 0x9e, 0x5f,
  0x71, 0xb0, 0x91, 0xec, 0x35, 0x47, 0xfb, 0x8d, 0xcd, 0x77, 0x9d, 0x5e, 0x5b, 0x5c, 0x87, 0xa9, 0x8d,
  0x85, 0x41, 0xf4, 0x5d, 0xa1, 0xdd, 0x77, 0x15, 0x5d, 0x93, 0x7c, 0x99, 0xee, 0x43, 0x8b, 0x92, 0x20,
  0x9f, 0x78, 0x64, 0xe8, 0x82, 0x66, 0xf2, 0xb5, 0x19, 0x16, 0xc5, 0xe6, 0xb5, 0x09, 0xf2, 0xd1, 0xbb,
  0xa1, 0x68, 0xea, 0x9f, 0x1f, 0x02, 0xa7, 0x92, 0xea, 0xa7, 0x2f, 0x75, 0xff, 0x7d, 0xe8, 0x5e, 0x3f,
  0x5c, 0x7f, 0xd8, 0xdd, 0xb6, 0xbc, 0x12, 0x8d, 0x2a, 0xe5, 0x05, 0x19, 0x26, 0x24, 0x06, 0x62, 0x0f,
  0xf0, 0x6b, 0x31, 0x9e, 0xc5, 0x92, 0xb9, 0x0a, 0xa1, 0x16, 0xc9, 0xec, 0xe5, 0x5a, 0x52, 0x67, 0x18,
  0xc6, 0xfe, 0x7e, 0x2b, 0xf4, 0x06, 0x21, 0x2d, 0x4f, 0x5d, 0x12, 0x78, 0x18, 0x29, 0x86, 0x1c, 0xa3,
  0xfa, 0xeb, 0x4c, 0xfb, 0x5f, 0x2f, 0x3d, 0x46, 0x2e, 0x8f, 0x15, 0x52, 0x1d, 0x60, 0x5d, 0x5e, 0x94,
  0x63, 0x10, 0x59, 0x96, 0xfb, 0x99, 0x12, 0xc2, 0xde, 0x05, 0xc9, 0x67, 0xd2, 0xe9, 0x00, 0x03, 0x31,
  0x86, 0xc5, 0xfb, 0x21, 0xd2, 0xd9, 0xd6, 0x93, 0x4e, 0x27, 0xc2, 0xdd, 0x56, 0xf2, 0xc3, 0xe8, 0xde,
  0xc1, 0xba, 0xd1, 0x30, 0x46, 0x3a, 0xcd, 0x80, 0x13, 0x12, 0xaa, 0xbd, 0x77, 0xd2, 0xac, 0x14, 0x87,
  0x00, 0x33, 0x4a, 0x33, 0x46, 0xe8, 0xa7, 0x92, 0x68, 0xc6, 0xa4, 0xb5, 0x67, 0x0c, 0x3c, 0xea, 0xbf,
  0x86, 0xe9, 0xea, 0x1a, 0x2b, 0x61, 0x8d, 0x05, 0xb7, 0x6e, 0xa8, 0x9f, 0x24, 0xbb, 0x2d, 0x00, 0xe3,
  0x6f, 0x67, 0x2f, 0x02, 0x14, 0xcf, 0x81, 0xa9, 0x1d, 0xb9, 0x61, 0xb1, 0x5b, 0xa0, 0x16, 0xcb, 0xb0,
  0x88, 0x27, 0xb6, 0x46, 0x0d, 0x28, 0x20, 0x07, 0x76, 0xab, 0xba, 0xcb, 0x74, 0x0e, 0xce, 0x9e, 0x91,
  0x89, 0xe8, 0x40, 0x69, 0x4f, 0x80, 0x58, 0xac, 0xae, 0x76, 0xbd, 0x65, 0x4c, 0x8b, 0x96, 0x74, 0xc6,
  0x4d, 0x24, 0xe0, 0x38, 0x6c, 0x05, 0xf4, 0x0d, 0xc3, 0xce, 0xb4, 0x8f, 0x40, 0x26, 0xff, 0x10, 0x2e,
  0xed, 0x00, 0xa0, 0x1c, 0xb0, 0xf8, 0x0f, 0x05, 0xd8, 0x76, 0xab, 0xc4, 0xcc, 0x27, 0xc2, 0x8c, 0x08,
  0x54, 0x0c, 0x9b, 0x54, 0xda, 0xbe, 0x90, 0xc3, 0x73, 0x72, 0x23, 0xc4, 0xa4, 0x2b, 0x01, 0xe6, 0xeb,
  0x3c, 0xeb, 0x2c, 0x48, 0xc8, 0x70, 0xca, 0x87, 0x04, 0xad, 0xf0, 0x65, 0xc3, 0xca, 0x10, 0x0a, 0xf0,
  0x5c, 0x63, 0x13, 0x18, 0x4b, 0x1a, 0x4f, 0x60, 0x6c, 0x8e, 0x74, 0x3e, 0x13, 0xf2, 0xef, 0x04, 0x1a,
  0x92, 0x0e, 0x0b, 0x39, 0x99, 0x10, 0xb8, 0xc7, 0x01, 0x08, 0xf5, 0x46, 0xcb, 0x1e, 0xd0, 0xe7, 0xb7,
  0x30, 0xec, 0xad, 0x91, 0x10, 0x41, 0x32, 0x84, 0x03, 0x9a, 0xa5, 0x3c, 0x6b, 0xf1, 0xf5, 0x3e, 0x79,
  0x8a, 0xbe, 0x22, 0x06, 0x7d, 0x8c, 0xcb, 0xce, 0xa6, 0xa5, 0x23, 0x55, 0x79, 0xbc, 0x8b, 0xaa, 0xf3,
  0xbc, 0x7e, 0xb5, 0x69, 0xb7, 0xa6, 0x05, 0x4a, 0x73, 0xb9, 0x83, 0x77, 0xac, 0x01, 0xe4, 0x2e, 0xd8,
  0x9e, 0xca, 0xe8, 0xa0, 0x12, 0x3f, 0x2a, 0xbf, 0x6a, 0x02, 0x91, 0xb3, 0x82, 0x56, 0x52, 0x93, 0x5b,
  0x0e, 0xbc, 0xbd, 0xb0, 0x77, 0xcb, 0x40, 0x14, 0xf3, 0xe2, 0x36, 0x8f, 0x49, 0xc7, 0xdf, 0x5e, 0x95,
  0x0f, 0xcc, 0x53, 0xea, 0x13, 0x3d, 0xbf, 0x7a, 0x42, 0x51, 0x5f, 0x4b, 0x6e, 0xcf, 0x78, 0xd5, 0x94,
  0x2d, 0x2c, 0x50, 0x18, 0x46, 0x98, 0xd8, 0x33, 0x1f, 0x46, 0x5a, 0xc1, 0x70, 0xff, 0x3c, 0x41, 0x08,
  0xbc, 0x4e, 0xf2, 0x72, 0xf2, 0x1a, 0x3c, 0xb6, 0xa0, 0x8b, 0xd4, 0x0f, 0x3b, 0x42, 0x18, 0x5a, 0x7c,
  0x74, 0xfc, 0x71, 0x8d, 0x55, 0x29, 0x89, 0xae, 0x1d, 0x35, 0x54, 0x07, 0xb5, 0x4f, 0x21, 0x0b, 0x41,
  0xd6, 0x16, 0x1d, 0xa6, 0xf6, 0x0e, 0xde, 0x73, 0xc6, 0xfc, 0x7d, 0x7c, 0xef, 0xa1, 0x5e, 0xb5, 0x15,
  0xec, 0x62, 0x31, 0xee, 0x09, 0xec, 0xe4, 0x77, 0xfa, 0xf9, 0x58, 0x25, 0xda, 0xb8, 0x6f, 0xf8, 0x01,
  0x63, 0x3b, 0x4d, 0x8e, 0xfd, 0xcd, 0x71, 0x14, 0x68, 0x35, 0xc3, 0x59, 0x42, 0x35, 0x3e, 0xff, 0x18,
  0x6e, 0xa9, 0xa0, 0x4d, 0xec, 0x5c, 0x6d, 0xdb, 0x84, 0xcb, 0x54, 0xb4, 0x8d, 0x9b, 0x24, 0xb2, 0x27,
  0x2e, 0xbb, 0x30, 0xe8, 0x5c, 0x91, 0xfd, 0x0a, 0xb7, 0x38, 0x07, 0x86, 0xc3, 0x9d, 0xee, 0xbe, 0xeb,
  0x66, 0x5c, 0xbe, 0xac, 0x04, 0x58, 0x4a, 0xa2, 0x03, 0xe1, 0x5a, 0x7a, 0x20, 0x57, 0xeb, 0xf4, 0xf9,
  0xbf, 0x85, 0x45, 0x94, 0x9f, 0x4c, 0xdf, 0xa8, 0x15, 0xa9, 0x21, 0x88, 0x77, 0x32, 0xb7, 0xee, 0xf7,
  0x49, 0x55, 0xf9, 0x01, 0x04, 0xe9, 0x2a, 0xd9, 0x2f, 0xe0, 0x0f, 0xe9, 0xec, 0x4f, 0xf2, 0x5e, 0x9a,
  0xb4, 0xdb, 0x2a, 0x08, 0x38, 0xa2, 0x69, 0x32, 0x7e, 0xf6, 0xaf, 0x06, 0xc5, 0x7b, 0xf4, 0x83, 0xf1,
  0x9f, 0xb4, 0x16, 0xc9, 0xbe, 0xe4, 0x81, 0xb7, 0x7f, 0x8a, 0x76, 0xf7, 0xf3, 0x85, 0xaf, 0xda, 0x36,
  0x4b, 0xaf, 0x53, 0x02, 0xfb, 0xb7, 0xbc, 0x25, 0x53, 0x31, 0xc9, 0x17, 0xa6, 0xeb, 0xf8, 0x5f, 0xc2,
  0x40])];
let sensitivities = new Float32Array([0.5]);

let handle = Porcupine.create(keywordModels, sensitivities)

let getNextAudioFrame = function() {
  ...
};

while (true) {
  let keywordIndex = handle.process(getNextAudioFrame());
  if (keywordIndex !== -1) {
      // detection event callback
  }
}*/


//let textData;
//const confidenceLevel = 0.4;
//const directLine = new DirectLine({
  //secret: "qOk-KiMu8IU.M4SODPphbB_HY8EmgS65hrPJ4VBSQTb1FxN5x3nCqV0" /* put your Direct Line secret here */,
  //token: /* or put your Direct Line token here (supply secret OR token, not both) */,
  //domain: /* optional: if you are not using the default Direct Line endpoint, e.g. if you are using a region-specific endpoint, put its full URL here */
  //webSocket: true /* optional: false if you want to use polling GET to receive messages. Defaults to true (use WebSocket). */,
  //pollingInterval: /* optional: set polling interval in milliseconds. Defaults to 1000 */,
  //timeout: /* optional: a timeout in milliseconds for requests to the bot. Defaults to 20000 */,
  //conversationStartProperties: { /* optional: properties to send to the bot on conversation start */
      //locale: 'en-US'
  //}
//});