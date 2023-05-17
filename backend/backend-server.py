# Import required libraries
from flask import Flask, request, jsonify
import string
import ssl

import time
from app import chatGPTRequest, pythonServerAPIquery


# Initialize Flask app
app = Flask(__name__)


# Function to process the data string
def process_string(data):
    # Add your custom string processing logic here
    return chatGPTRequest(data)

# Route to accept POST requests containing a data string
@app.route('/process', methods=['POST'])
def process_data():
    # Check if the request contains a JSON body
    if request.is_json:
        try:
            # Extract the data string from the JSON body
            data = request.get_json()['data']
            
            # Process the data string
            processed_data = process_string(data)
            
            # Return the processed data as JSON
            return jsonify({'status': 'success', 'processed_data': processed_data})
        
        except KeyError:
            return jsonify({'status': 'error', 'message': 'Invalid input, please provide a "data" key.'})
    
    else:
        return jsonify({'status': 'error', 'message': 'Invalid input, please send a JSON request.'})

@app.route('/generate-data', methods=['POST'])
def generate_data():
    # Check if the request contains a JSON body
    if request.is_json:
        try:
            # Extract the data string from the JSON body
            json_data = request.get_json()
            data = None
            if 'data' in json_data:
                data = json_data['data']
            elif 'prompt' in json_data:
                data = json_data['prompt']
            else:
                print("Bad json")
                print(json_data)
                raise KeyError
            
            # Process the data string
            processed_data = process_string(data)
            
            # Return the processed data as JSON
            return jsonify({'status': 'success', 'processed_data': processed_data})
        
        except KeyError:
            return jsonify({'status': 'error', 'message': 'Invalid input, please provide a "data" key.'})
    
    else:
        return jsonify({'status': 'error', 'message': 'Invalid input, please send a JSON request.'})
    
@app.route('/api-query', methods=['POST'])
def apiQuery():
    # Check if the request contains a JSON body
    if request.is_json:
        try:
            # Extract the data string from the JSON body
            json_data = request.get_json()
            print("json data:\n", json_data)
            print(type(json_data))

            command, argument_dict = json_data['command'], json_data['argument_dict']
            
            # Process the data string
            query_result = pythonServerAPIquery(command, argument_dict)
            
            # Return the processed data as JSON
            return jsonify({'status': 'success', 'query_result': query_result})
        
        except KeyError:
            return jsonify({'status': 'error', 'message': 'Invalid input, please provide a "data" key.'})
    
    else:
        return jsonify({'status': 'error', 'message': 'Invalid input, please send a JSON request.'})

# Run the Flask server
if __name__ == '__main__':
    #context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    #context.load_cert_chain('cert.pem', 'key.pem')

    app.run(debug=True, host='0.0.0.0', port=5000) #, ssl_context=context)  # Make sure to use different server in production, and to turn off debug if it's there
