import createPonyfill from "web-speech-cognitive-services/lib/SpeechServices";

const confidenceLevel = 0.4;
let textData;

function test() {
  const authToken = {
    token:
      "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiI4YzM0MDQzZGEzYWI0NGQ2YmVkMmE0NjBjNjdjZTcwNiIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8xNTIwMmRhMy05M2FmLTQ2YjEtOWZkYi1hZDU5MmU0MmNmZDcvcmVzb3VyY2VHcm91cHMvd2ViLWFzc2lzdC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3dlYi1hc3Npc3Qtc3BlZWNoLTEiLCJzY29wZSI6InNwZWVjaHNlcnZpY2VzIiwiYXVkIjoidXJuOm1zLnNwZWVjaHNlcnZpY2VzLmVhc3R1cyIsImV4cCI6MTU4OTgyOTg5MiwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.2emMQ5-OIU26TwiOOyQ-Q2qNYqZrDOZlQh1CzsxQxJw",
  };

  const ponyfill = createPonyfill({
    credentials: {
      authorizationToken: authToken.token,
      //subscriptionKey: "b6aee4ea45d74b18bed9955c5cc01295",
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
      } else {
        textData = "Sorry could you repeat that agiain!";
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

  let but = document.getElementById("audio");
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