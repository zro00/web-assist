import createPonyfill from "web-speech-cognitive-services/lib/SpeechServices";
import { DirectLine } from 'botframework-directlinejs';
// For Node.js:
// const { DirectLine } = require('botframework-directlinejs');



let textData;
const confidenceLevel = 0.4;
const directLine = new DirectLine({
  secret: "qOk-KiMu8IU.M4SODPphbB_HY8EmgS65hrPJ4VBSQTb1FxN5x3nCqV0" /* put your Direct Line secret here */,
  //token: /* or put your Direct Line token here (supply secret OR token, not both) */,
  //domain: /* optional: if you are not using the default Direct Line endpoint, e.g. if you are using a region-specific endpoint, put its full URL here */
  webSocket: false /* optional: false if you want to use polling GET to receive messages. Defaults to true (use WebSocket). */,
  //pollingInterval: /* optional: set polling interval in milliseconds. Defaults to 1000 */,
  //timeout: /* optional: a timeout in milliseconds for requests to the bot. Defaults to 20000 */,
  conversationStartProperties: { /* optional: properties to send to the bot on conversation start */
      locale: 'en-US'
  }
});

function test() {
  /*const authToken = {
    token:
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiI4YzM0MDQzZGEzYWI0NGQ2YmVkMmE0NjBjNjdjZTcwNiIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8xNTIwMmRhMy05M2FmLTQ2YjEtOWZkYi1hZDU5MmU0MmNmZDcvcmVzb3VyY2VHcm91cHMvd2ViLWFzc2lzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3dlYi1hc3Npc3Qtc3BlZWNoLTEiLCJzY29wZSI6InNwZWVjaHNlcnZpY2VzIiwiYXVkIjoidXJuOm1zLnNwZWVjaHNlcnZpY2VzLmVhc3R1cyIsImV4cCI6MTU4OTgyOTg5MiwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.2emMQ5-OIU26TwiOOyQ-Q2qNYqZrDOZlQh1CzsxQxJw",
  };*/

  const ponyfill = createPonyfill({
    credentials: {
      //authorizationToken: authToken.token,
      subscriptionKey: "1ec57e11112e441aa47679171ec3e3af",
      //authorizationToken: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiI4YzM0MDQzZGEzYWI0NGQ2YmVkMmE0NjBjNjdjZTcwNiIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8xNTIwMmRhMy05M2FmLTQ2YjEtOWZkYi1hZDU5MmU0MmNmZDcvcmVzb3VyY2VHcm91cHMvd2ViLWFzc2lzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3dlYi1hc3Npc3Qtc3BlZWNoLTEiLCJzY29wZSI6InNwZWVjaHNlcnZpY2VzIiwiYXVkIjoidXJuOm1zLnNwZWVjaHNlcnZpY2VzLmVhc3R1cyIsImV4cCI6MTU4OTY0Nzk2MCwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.StmrszxZ3zC1cFpjErQnwOL',
      region: "eastus",
    },
  });

  const {
    SpeechRecognition,
    speechSynthesis,
    SpeechSynthesisUtterance,
  } = ponyfill;

  let list = document.getElementById("listen");
  list.addEventListener("click", () => {
    const recognition = new SpeechRecognition();

    //recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = ({ results }) => {
      console.log(results);
      //let x = results;
      //console.log(typeof results);

      let speechData = results[0][0];
      let isFinalCheck = results[0].isFinal;

      if (isFinalCheck && speechData.confidence > confidenceLevel) {
        textData = speechData.transcript;
        console.log(textData);
        directLine.postActivity({
          from: { id: 'client', name: 'client' }, // required (from.name is optional)
          type: 'message',
          text: textData
      }).subscribe(
          id => console.log("Posted activity, assigned ID ", id),
          error => console.log("Error posting activity", error)
      );

      directLine.activity$
    .filter(activity => activity.type === 'message' && activity.from.id === 'vap-echo')
    .subscribe(
        message => {
          console.log("received message ", message);
          console.log(activity.text);
          let voices = speechSynthesis.getVoices();
          let utterance = new SpeechSynthesisUtterance(message);
          utterance.voice = voices.find((voice) => /JessaRUS/u.test(voice.name));
          speechSynthesis.speak(utterance);
        }
    );
      } else {
        textData = "Sorry could you repeat that agiain!";
        let voices = speechSynthesis.getVoices();
        let utterance = new SpeechSynthesisUtterance(textData);
    
        utterance.voice = voices.find((voice) => /JessaRUS/u.test(voice.name));
    
        speechSynthesis.speak(utterance);
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
  });

  /*let but = document.getElementById("audio");
  but.addEventListener("click", () => {
    const voices = speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance("hello");

    utterance.voice = voices.find((voice) => /JessaRUS/u.test(voice.name));

    speechSynthesis.speak(utterance);
  });
  /*speechSynthesis.addEventListener('voiceschanged', () => {
    const voices = speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance('Hello, World!');

    utterance.voice = voices.find(voice => /JessaRUS/u.test(voice.name));

    speechSynthesis.speak(utterance);
  });*/
}

test();