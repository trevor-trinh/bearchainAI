# run this python file to update the json's whenever you want :)
from bs4 import BeautifulSoup
import requests
import json

ao3_domain = "https://archiveofourown.org"
#TODO: what's the fandoms.json path? and also explore the structure! 
JSON_PATH = "put path of json here"

#TODO:? a potential helper function, optional to fill out
# returns an array of each cateogory link (on which multiple fandoms are listed)
def generate_category_links():
    return

#TODO:? a potential helper function, optional! 
# returns an array of {"name":"fandom_name", "link":"fandom_link"} for all fandoms
def get_all_fandoms():
    return

#TODO:? a potential helper function, optional! 
# returns an array of {"name":"fandom_name", "link":"fandom_link"} for the top most written fandoms in each category
def get_top_fandoms():  
   return 

#TODO: Week One deliverable ! it's to write a function that will populate fandoms.json 
# creates fandoms.json file in the json folder with all fandoms and top fandoms in the listed format: '*shoudln't return anything'
# {
#    "top":[
#       {
#          "name":"topfandom",
#          "link":"link"
#       }
#    ],
#    "all":[
#       {
#          "name":"fandom",
#          "link":"link"
#       }
#    ]
# }
def gen_fandom_json():
    return 



# gen_fandom_json() # <-- uncomment this and run the file to update or create fandoms.json
