import requests
import pandas as pd
import geocoder

def get_current_location():
    g = geocoder.ip('me')
    return g.latlng

latitude, longitude = get_current_location()
#print("Latitude:", latitude)
#print("Longitude:", longitude)

#Vaild number of restaurants
print("How many restaurants do you want to choose from? Between 5 and 50")
number_of_restaurants = int(input())
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
print("How many miles are you willing to drive? Limit 25 miles.")
radius = int(input() * 1609)
if radius > 40000:
    radius = 40000


# Replace 'YOUR_API_KEY' with your actual Yelp API key as a string
API_KEY = 'v1JO42CoSqmHEt7Pc-_E2NKdMOKqrNCXzeN90AgBbPyG8pci5NRNLP9VPtc-83zRWOMJRMDHodKW-HoOJBoXh9sapAGpEJcCR3hrMfDGR_3pacWRMardVn-DgdVdZ3Yx' # should look something like 'zwk_38920294dk38_292049SPLEKZHEJ3928Hksj3kd' except longer
HEADERS = {'Authorization': f'Bearer {API_KEY}'}

# Yelp API endpoint
url = 'https://api.yelp.com/v3/businesses/search'

# Parameters for the API request
params = {
    'term': 'restaurants',
    'latitude': latitude,
    'longitude': longitude,
    #'categories': '',
    'radius': '5000',
    'limit': limit,
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
print("Original DataFrame :")
print(df)
 
# shuffle the DataFrame rows
df = df.sample(frac=1).reset_index(drop=True)
 
# print the shuffled DataFrame
#print("\nShuffled DataFrame:")
#print(df)

# Logic to initialize before loop
print(f"This or That?")
print(f"{df.at[0, 'name']}      {df.at[1, 'name']}")
user_input = str(input())
if user_input == "This":
    pos = 0
elif user_input == "That":
    pos = 1

# Logic to display which restaraunt and take in use input
for i in range (2, number_of_restaurants):
    if user_input == "This":
        print(f"This or That?")
        print(f"{df.at[pos, 'name']}    {df.at[i, 'name']}")
        user_input = str(input())
        if user_input == "This": 
            pos = pos
        else:
            pos =  i

    elif user_input == "That":
        print(f"This or That?")
        print(f"{df.at[i, 'name']}      {df.at[pos, 'name']}")
        user_input = str(input())
        if user_input == "This": 
            pos = i
        else:
            pos =  pos

print(f"You have chosen {df.at[pos, 'name']}!")
    

    
    


