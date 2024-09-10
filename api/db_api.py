import json
import requests
from pprint import pprint

headers = {
  # 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  'Accept': 'application/json',
  'Accept-Language': 'de',
  # 'Accept-Encoding': 'gzip, deflate, br, zstd',
  'content-type': 'application/json; charset=utf-8',
  # 'x-correlation-id': '4822e9dd-6f3e-4ea6-93cf-bd8cbbb3cc55_48b243b2-862c-485f-b1bf-a856e8fc5deb',
  'Origin': 'https://www.bahn.de'
}

def get_id_only(city):
    return json.loads(get_id(city))[0]['id']

def get_id(city):
    url = f"https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff={city}&typ=ALL&limit=10"
    response = requests.request("GET", url, headers=headers, data={})
    # pprint(json.loads(response.text)[0]['id'])
    #return json.loads(response.text)[0]['id']
    return response.text

def share_con(frm, to, datetime, tfID):
    import requests
    import json

    url = "https://www.bahn.de/web/api/angebote/verbindung/teilen"

    payload = json.dumps({
      "startOrt": frm,
      "zielOrt": to,
      "hinfahrtDatum": datetime,
      "hinfahrtRecon": tfID
    })
    headers = {
      'Accept': 'application/json',
      'Accept-Language': 'de',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Content-Type': 'application/json',
      'Origin': 'https://www.bahn.de',
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text
    # print(response.text)

def get_conn(frm, to, datetime):
    url = "https://www.bahn.de/web/api/angebote/fahrplan"
    payload = "{\"abfahrtsHalt\":\"<FROM>\",\"anfrageZeitpunkt\":\"<DATE>\",\"ankunftsHalt\":\"<TO>\",\"ankunftSuche\":\"ABFAHRT\",\"klasse\":\"KLASSE_2\",\"produktgattungen\":[\"ICE\",\"EC_IC\",\"IR\",\"REGIONAL\",\"SBAHN\",\"BUS\",\"SCHIFF\",\"UBAHN\",\"TRAM\",\"ANRUFPFLICHTIG\"],\"reisende\":[{\"typ\":\"ERWACHSENER\",\"ermaessigungen\":[{\"art\":\"KEINE_ERMAESSIGUNG\",\"klasse\":\"KLASSENLOS\"}],\"alter\":[],\"anzahl\":1}],\"schnelleVerbindungen\":true,\"sitzplatzOnly\":false,\"bikeCarriage\":false,\"reservierungsKontingenteVorhanden\":false}"
    payload = payload.replace('<FROM>', frm).replace('<TO>', to).replace("<DATE>", datetime)

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text
    for p in response.json()['verbindungen']:
        if 'angebotsPreis' in p:
            pprint(p)
            input()
            # pprint(p['angebotsPreis']['betrag'])
