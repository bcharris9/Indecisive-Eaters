from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def getRestaurants():
  # Parameters for the API request
  params = request.get_json()

  API_KEY = 'v1JO42CoSqmHEt7Pc-_E2NKdMOKqrNCXzeN90AgBbPyG8pci5NRNLP9VPtc-83zRWOMJRMDHodKW-HoOJBoXh9sapAGpEJcCR3hrMfDGR_3pacWRMardVn-DgdVdZ3Yx'
  HEADERS = {'Authorization': f'Bearer {API_KEY}'}

  # Yelp API endpoint
  url = 'https://api.yelp.com/v3/businesses/search'


  ## Info about this endpoint:
  ## https://docs.developer.yelp.com/reference/v3_business_search

  # Make the request to the Yelp API
  response = requests.get(url, headers=HEADERS, params=params)
  print(response.text)

  return "Hello, World!"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)