# -*- coding: utf-8 -*-
"""association_check.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1knTU2tLrlwwzvL6mJ4GLQXkF_w4LWP_b
"""

# importing necessary libraries
import pandas as pd

# importing data, association of which to check, from github

train_url = "https://raw.githubusercontent.com/forrestpark/adonde.kr/main/data/train/train_city_destinations.csv"
express_url = "https://raw.githubusercontent.com/forrestpark/adonde.kr/main/data/express/express_final.csv"
suburbs_url = "https://raw.githubusercontent.com/forrestpark/adonde.kr/main/data/suburbs/suburbs_preprocessed2.csv"
city_url = "https://raw.githubusercontent.com/forrestpark/adonde.kr/main/data/city/city_population_latlng.csv"

train = pd.read_csv(train_url)
express = pd.read_csv(express_url)
suburbs = pd.read_csv(suburbs_url)
city = pd.read_csv(city_url)

# creating a list of all sido values and sgg values in city table
sido_list = list(city['sido'])
sgg_list = list(city['sgg'])
sgg_list.index('아산')

# checking city pair association between city table and train table
# check if all city entries (sido/sgg pairs) in train data is in the city data
# if nothing prints after running this cell, then all city values in train table
# are in the city table

for idx, item in train.iterrows():
  try:
    # should find index of sgg value since sido values alone have many repeats
    sgg_idx = sgg_list.index(item['sgg'])
    if sido_list[sgg_idx] == item['sido']:
      continue
    else:
      print("Wrong index")
      print(sgg_list[sido_idx], item['sido'], item['sgg'])
  except:
    print("Value Error")
    print(item['sido'], item['sgg'])

# checking city pair association between city table and express table
# check if all city entries (sido/sgg pairs) in express bus terminal data is in the city data
# if nothing prints after running this cell, then all city values in express table
# are in the city table

for idx, item in express.iterrows():
  try:
    # should find index of sgg value since sido values alone have many repeats
    sgg_idx = sgg_list.index(item['sgg'])
    if sido_list[sgg_idx] == item['sido']:
      continue
    else:
      print("Wrong index")
      print(sgg_list[sido_idx], item['sido'], item['sgg'])
  except:
    print("Value Error")
    print(item['sido'], item['sgg'])

# checking city pair association between city table and suburbs table
# check if all city entries (sido/sgg pairs) in suburban bus terminal data is in the city data
# if nothing prints after running this cell, then all city values in suburbs table
# are in the city table

for idx, item in suburbs.iterrows():
  try:
    # should find index of sgg value since sido values alone have many repeats
    sgg_idx = sgg_list.index(item['sgg'])
    if sido_list[sgg_idx] == item['sido']:
      continue
    else:
      print("Wrong index")
      print(sido_list[sgg_idx], item['sido'], item['sgg'])
  except:
    print("Value Error")
    print(item['sido'], item['sgg'])