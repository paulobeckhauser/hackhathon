import json
import requests
from pprint import pprint

# headers = {
#     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
#     'Accept': 'application/json',
#     'Accept-Language': 'de',
#     'Accept-Encoding': 'gzip, deflate, br, zstd',
#     'Referer': 'https://www.bahn.de/buchung/fahrplan/suche',
#     'Sec-Fetch-Mode': 'cors',
#     'Sec-Fetch-Site': 'same-origin'
# }

headers = {
  # 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  'Accept': 'application/json',
  'Accept-Language': 'de',
  # 'Accept-Encoding': 'gzip, deflate, br, zstd',
  'content-type': 'application/json; charset=utf-8',
  # 'x-correlation-id': '4822e9dd-6f3e-4ea6-93cf-bd8cbbb3cc55_48b243b2-862c-485f-b1bf-a856e8fc5deb',
  'Origin': 'https://www.bahn.de'
}

def get_id(city):
    url = f"https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff={city}&typ=ALL&limit=10"
    response = requests.request("GET", url, headers=headers, data={})
    # pprint(json.loads(response.text)[0]['id'])
    #return json.loads(response.text)[0]['id']
    return response.text

def get_conn(frm, to, datetime):
    url = "https://www.bahn.de/web/api/angebote/fahrplan"
    payload = "{\"abfahrtsHalt\":\"<FROM>\",\"anfrageZeitpunkt\":\"<DATE>\",\"ankunftsHalt\":\"<TO>\",\"ankunftSuche\":\"ABFAHRT\",\"klasse\":\"KLASSE_2\",\"produktgattungen\":[\"ICE\",\"EC_IC\",\"IR\",\"REGIONAL\",\"SBAHN\",\"BUS\",\"SCHIFF\",\"UBAHN\",\"TRAM\",\"ANRUFPFLICHTIG\"],\"reisende\":[{\"typ\":\"ERWACHSENER\",\"ermaessigungen\":[{\"art\":\"KEINE_ERMAESSIGUNG\",\"klasse\":\"KLASSENLOS\"}],\"alter\":[],\"anzahl\":1}],\"schnelleVerbindungen\":true,\"sitzplatzOnly\":false,\"bikeCarriage\":false,\"reservierungsKontingenteVorhanden\":false}"

    import sys
    # pprint(frm)
    # pprint(to)
    frm = json.loads(get_id(frm))[0]['id']
    to = json.loads(get_id(to))[0]['id']
    # pprint(frm)
    # pprint(to)
    # print(payload)
    #input()
    payload = payload.replace('<FROM>', frm).replace('<TO>', to).replace("<DATE>", datetime)
    # pprint(json.loads(payload))

    # headers = {
    #   # 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    #   'Accept': 'application/json',
    #   # 'Accept-Language': 'de',
    #   # 'Accept-Encoding': 'gzip, deflate, br, zstd',
    #   # 'content-type': 'application/json; charset=utf-8',
    #   # 'x-correlation-id': '4822e9dd-6f3e-4ea6-93cf-bd8cbbb3cc55_48b243b2-862c-485f-b1bf-a856e8fc5deb',
    #   # 'Origin': 'https://www.bahn.de',
    #   # 'Connection': 'keep-alive',
    #   # 'Referer': 'https://www.bahn.de/buchung/fahrplan/suche',
    #   # 'Sec-Fetch-Dest': 'empty',
    #   # 'Sec-Fetch-Mode': 'cors',
    #   # 'Sec-Fetch-Site': 'same-origin',
    #   # 'Priority': 'u=0',
    #   # 'TE': 'trailers',
    # }

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text
    # pprint(response)
    # pprint(response.text)
    # for p in response.json()['verbindungen']:
    # 	if 'angebotsPreis' in p:
    # 		pprint(p)
    		# pprint(p['angebotsPreis']['betrag'])
