import json
import requests
from pprint import pprint

headers = {
  # 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  'Accept': 'application/json',
  'Accept-Language': 'de',
  'content-type': 'application/json; charset=utf-8',
  'Origin': 'https://www.bahn.de'
}

def get_id_only(city):
    return json.loads(get_id(city))[0]['id']

def get_id(city):
    url = f"https://www.bahn.de/web/api/reiseloesung/orte?suchbegriff={city}&typ=ALL&limit=10"
    response = requests.request("GET", url, headers=headers, data={})
    return response.text

def share_con(frm, to, datetime, tfID):
    url = "https://www.bahn.de/web/api/angebote/verbindung/teilen"

    payload = json.dumps({
      "startOrt": frm,
      "zielOrt": to,
      "hinfahrtDatum": datetime,
      "hinfahrtRecon": tfID
    })
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text
    # print(response.text)

def get_conn(frm, to, datetime, pagingRef=None):
    url = "https://www.bahn.de/web/api/angebote/fahrplan"
    payload = "{\"abfahrtsHalt\":\"<FROM>\",\"anfrageZeitpunkt\":\"<DATE>\",\"ankunftsHalt\":\"<TO>\",\"ankunftSuche\":\"ABFAHRT\",\"klasse\":\"KLASSE_2\",\"produktgattungen\":[\"ICE\",\"EC_IC\",\"IR\",\"REGIONAL\",\"SBAHN\",\"BUS\",\"SCHIFF\",\"UBAHN\",\"TRAM\",\"ANRUFPFLICHTIG\"],\"reisende\":[{\"typ\":\"ERWACHSENER\",\"ermaessigungen\":[{\"art\":\"KEINE_ERMAESSIGUNG\",\"klasse\":\"KLASSENLOS\"}],\"alter\":[],\"anzahl\":1}],\"schnelleVerbindungen\":true,\"sitzplatzOnly\":false,\"bikeCarriage\":false,\"reservierungsKontingenteVorhanden\":false}"
    payload_json = json.loads(payload)
    payload_json['abfahrtsHalt'] = frm
    payload_json['ankunftsHalt'] = to
    payload_json['anfrageZeitpunkt'] = datetime
    if pagingRef:
        payload_json['pagingReference'] = pagingRef
    payload = json.dumps(payload_json)
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text

def prepare_llm_json(conns):
    res = []
    id = 0
    for p in conns:
        price = 0
        try:
            price = p['angebotsPreis']['betrag']
        except:
            pass

        res.append({
            'id': str(id),
            'price': price,
            'departure': p['verbindungsAbschnitte'][0]['halte'][0]['abfahrtsZeitpunkt'],
            'transfers': p['umstiegsAnzahl'],
            'duration': p['verbindungsDauerInSeconds'],
            'sections': [{'from': s['abfahrtsOrt'], 'to': s['abfahrtsOrt']} for s in p['verbindungsAbschnitte']]
        })
        id += 1
    # pprint(res)
    return res
