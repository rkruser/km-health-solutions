import requests

# Define the URL for the Flask server
url = "http://localhost:5000/process"

# Data to be sent in the request
data = {
    "data": "This is a test string! uwwwwwuuuuuuuuuuu"
}

# Send a POST request with JSON data to the Flask server
response = requests.post(url, json=data)

# Print the status code and the response JSON
print(f"Status Code: {response.status_code}")
print("Response JSON:")
print(response.json())
