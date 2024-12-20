import requests
import pandas as pd
import sys
import geocoder

def get_current_location():
    g = geocoder.ip('me')
    return g.latlng

# Get location of the machine
latitude, longitude = get_current_location()

# Vaild number of restaurants
number_of_restaurants = int(input("How many restaurants do you want to choose from? Between 5 and 50:   "))
if number_of_restaurants < 5:
    number_of_restaurants = 5
    limit = 10
elif number_of_restaurants > 50:
    number_of_restaurants = 50
    limit = 50
elif number_of_restaurants > 45:
    limit = 50
else:
    limit = number_of_restaurants + 5

# Prevent an AREA_TOO_LARGE error 
radius = int(input("How many miles are you willing to drive? Limit 25 miles:    ") * 1609)
if radius > 40000:
    radius = 40000

price = int(input("How much are you willing to spend on a scale 1-4:    "))
if price < 1:
    price = 1
elif price > 4:
    price = 3


# Replace 'YOUR_API_KEY' with your actual Yelp API key as a string
API_KEY = 'v1JO42CoSqmHEt7Pc-_E2NKdMOKqrNCXzeN90AgBbPyG8pci5NRNLP9VPtc-83zRWOMJRMDHodKW-HoOJBoXh9sapAGpEJcCR3hrMfDGR_3pacWRMardVn-DgdVdZ3Yx'
HEADERS = {'Authorization': f'Bearer {API_KEY}'}

# Yelp API endpoint
url = 'https://api.yelp.com/v3/businesses/search'

# Parameters for the API request
params = {
    'term': 'restaurants',
    'latitude': latitude,
    'longitude': longitude,
    'categories': '',
    'radius': '5000',
    'limit': limit,
    'open_now' : 'true',
    'price' : price
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

# Handle Problem created by not enough results
rows, columns = df.shape
if rows < 5:
    print("Could not find enough restaurants matching those parameters.\nGoodbye!")
    sys.exit(1)
 
# Shuffle the DataFrame rows
df = df.sample(frac=1).reset_index(drop=True)

# Logic to initialize before loop
user_input = str(input(f"{df.at[0, 'name']}      {df.at[1, 'name']}\nThis or That:   "))
if user_input == "This":
    pos = 0
elif user_input == "That":
    pos = 1

# Logic to display which restaraunt and take in use input
# TODO Replace user_input with clicking on correct icon
for i in range (2, number_of_restaurants):
    print(i)
    if user_input == "This":
        user_input = str(input(f"{df.at[pos, 'name']}    {df.at[i, 'name']}\nThis or That:   "))
        if user_input == "This": 
            pos = pos
        else:
            pos =  i

    elif user_input == "That":
        
        user_input = str(input(f"{df.at[i, 'name']}      {df.at[pos, 'name']}\nThis or That:   "))
        if user_input == "This": 
            pos = i
        else:
            pos =  pos



print(f"You have chosen {df.at[pos, 'name']}!")
sys.exit()
    

    
    


