# Import required libraries
from flask import Flask, request, jsonify
import string
import ssl

import time
from app import chatGPTRequest


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

# Run the Flask server
if __name__ == '__main__':
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    context.load_cert_chain('cert.pem', 'key.pem')

    app.run(debug=True, host='0.0.0.0', port=5000, ssl_context=context)  # Make sure to use different server in production, and to turn off debug if it's there
