import json
import requests
from pprint import pprint

def get_id(city):
    # city = 'Hannover Hbf'
    url = f"https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff={city}&typ=ALL&limit=10"

    payload = {}
    headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    'Accept': 'application/json',
    'Accept-Language': 'de',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Referer': 'https://www.bahn.de/buchung/fahrplan/suche',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    pprint(json.loads(response.text)[0]['id'])
    return json.loads(response.text)[0]['id']


url = "https://int.bahn.de/web/api/angebote/fahrplan"

import sys
frm = get_id(sys.argv[1])
to = get_id(sys.argv[2])
pprint(frm)
pprint(to)
payload = """{
    "abfahrtsHalt": "{frm}",
    "anfrageZeitpunkt": "2024-09-09T13:10:37",
    "ankunftsHalt": "{to}",
    "ankunftSuche": "ABFAHRT","klasse":"KLASSE_2","produktgattungen":["ICE","EC_IC","IR","REGIONAL","SBAHN","BUS","SCHIFF","UBAHN","TRAM","ANRUFPFLICHTIG"],"reisende":[{"typ":"ERWACHSENER","ermaessigungen":[{"art":"KEINE_ERMAESSIGUNG","klasse":"KLASSENLOS"}],"alter":[],"anzahl":1}],"schnelleVerbindungen":true,"sitzplatzOnly":false,"bikeCarriage":false,"reservierungsKontingenteVorhanden":false
}""".replace('{frm}', frm).replace('{to}', to)

headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept': 'application/json',
  'Sec-Fetch-Site': 'same-origin',
  'Accept-Language': 'en',
  'Accept-Encoding': 'gzip, deflate, br',
  'Sec-Fetch-Mode': 'cors',
  'Host': 'int.bahn.de',
  'Origin': 'https://int.bahn.de',
  'Content-Length': '647',
  'Connection': 'keep-alive'
}

response = requests.request("POST", url, headers=headers, data=payload)

pprint(response.json())
