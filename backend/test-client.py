import requests

# Define the URL for the Flask server
url = "https://localhost:5000/process"

# Data to be sent in the request
data = {
    "data": "This is a test string! uwwwwwuuuuuuuuuuu"
}

# Send a POST request with JSON data to the Flask server
response = requests.post(url, json=data, verify=False) #GET RID OF verify=False IN ORDER TO SECURE THE SERVER IN PRODUCTION

# Print the status code and the response JSON
print(f"Status Code: {response.status_code}")
print("Response JSON:")
print(response.json())
