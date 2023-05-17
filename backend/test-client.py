import requests

# Define the URL for the Flask server
url = "http://localhost:5000/process"

# Data to be sent in the request
data = {
    "data": "Hello, chatGPT! What is your favorite color and scary movie? I know you are a language model, but make something up anyway."
}

# Send a POST request with JSON data to the Flask server
response = requests.post(url, json=data, verify=False) #GET RID OF verify=False IN ORDER TO SECURE THE SERVER IN PRODUCTION

# Print the status code and the response JSON
print(f"Status Code: {response.status_code}")
print("Response JSON:")
print(response.json())
