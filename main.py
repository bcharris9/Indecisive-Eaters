import requests
import pandas as pd
import geocoder

def get_current_location():
    g = geocoder.ip('me')
    return g.latlng

latitude, longitude = get_current_location()
print("Latitude:", latitude)
print("Longitude:", longitude)

#amount of restaraunts to be gathered
number_of_restaraunts = 5

# Replace 'YOUR_API_KEY' with your actual Yelp API key as a string
API_KEY = 'v1JO42CoSqmHEt7Pc-_E2NKdMOKqrNCXzeN90AgBbPyG8pci5NRNLP9VPtc-83zRWOMJRMDHodKW-HoOJBoXh9sapAGpEJcCR3hrMfDGR_3pacWRMardVn-DgdVdZ3Yx' # should look something like 'zwk_38920294dk38_292049SPLEKZHEJ3928Hksj3kd' except longer
HEADERS = {'Authorization': f'Bearer {API_KEY}'}

# Yelp API endpoint
url = 'https://api.yelp.com/v3/businesses/search'

# Parameters for the API request
params = {
    'term': 'restaurants',
    #'location': 'New York City',
    'latitude': latitude,
    'longitude': longitude,
    #'categories': '',
    'radius': '5000',
    'limit': number_of_restaraunts,
    'open_now' : 'true'
}

## Info about this endpoint:
## https://docs.developer.yelp.com/reference/v3_business_search

# Make the request to the Yelp API
response = requests.get(url, headers=HEADERS, params=params)

# Parse the JSON response data
data = response.json()
businesses = data['businesses']

# Create a DataFrame from the business data
df = pd.DataFrame(businesses)

# Display the DataFrame

for i in range (number_of_restaraunts):
    print(df.at[i, 'name'])