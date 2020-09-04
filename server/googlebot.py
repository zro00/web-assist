#from starlette.websockets import WebSocket
#from starlette.applications import Starlette
import os
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

app = FastAPI()
#from starlette.staticfiles import StaticFiles
#from starlette.responses import HTMLResponse
#from starlette.templating import Jinja2Templates
#from starlette.middleware import Middleware
#from starlette.middleware.cors import CORSMiddleware
import uvicorn

#middleware = [
    #Middleware(CORSMiddleware, allow_origins=['*'])
#]

project_id = "vap-smalltalk-pqhr"
session_id ="15AA17888"
language_code = "en_CA"

#app = Starlette(debug=True, middleware=middleware)
#app.mount('/static', StaticFiles(directory='statics'), name='static')

#@app.route('/')
#async def homepage(request):
    #return HTMLResponse(Template(template).render())

def detect_intent_with_texttospeech_response(project_id, session_id, texts,
                                             language_code):
    """Returns the result of detect intent with texts as inputs and includes
    the response in an audio format.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    import dialogflow_v2 as dialogflow
    session_client = dialogflow.SessionsClient()

    session_path = session_client.session_path(project_id, session_id)
    print('Session path: {}\n'.format(session_path))

    for text in texts:
        text_input = dialogflow.types.TextInput(
            text=text, language_code=language_code)

        query_input = dialogflow.types.QueryInput(text=text_input)

        # Set the query parameters with sentiment analysis
        output_audio_config = dialogflow.types.OutputAudioConfig(
            audio_encoding=dialogflow.enums.OutputAudioEncoding
            .OUTPUT_AUDIO_ENCODING_LINEAR_16)

        response = session_client.detect_intent(
            session=session_path, query_input=query_input,
            output_audio_config=output_audio_config)

        print('=' * 20)
        print('Query text: {}'.format(response.query_result.query_text))
        print('Detected intent: {} (confidence: {})\n'.format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence))
        print('Fulfillment text: {}\n'.format(
            response.query_result.fulfillment_text))
        # The response's audio_content is binary.
        with open('output.wav', 'wb') as out:
            out.write(response.output_audio)
            print('Audio content written to file "output.wav"')


@app.websocket_route('/voice')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    #print(websocket)
    # Process incoming messages
    while True:
        mesg = await websocket.receive_text()
        print(f"THE MESSAGE WAS {mesg}")
        audio = detect_intent_with_texttospeech_response(project_id,session_id, mesg, language_code)
        await websocket.send_text(mesg.replace("Client", "Server"))
    await websocket.close()


if __name__ == '__main__':
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    CERT_DIR = f"{ROOT_DIR}/cert"
    print(f"THE CERT IS  {CERT_DIR}/cert.pem")
    #uvicorn.run("example:app", host="127.0.0.1", port=5000, log_level="info")
    uvicorn.run(app, host='0.0.0.0', port=8000, ssl_certfile=f"{CERT_DIR}/cert.pem",ssl_keyfile=f"{CERT_DIR}/key.pem")


