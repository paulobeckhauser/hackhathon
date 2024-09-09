import requests

url = "https://www.bahn.de/web/api/angebote/fahrplan"

payload = "{\"abfahrtsHalt\":\"A=1@O=Wolfsburg Hbf@X=10787784@Y=52429495@U=80@L=8006552@B=1@p=1725477188@i=U×008013017@\",\"anfrageZeitpunkt\":\"2024-09-09T19:53:39\",\"ankunftsHalt\":\"A=1@O=Berlin Hbf@X=13369549@Y=52525589@U=80@L=8011160@B=1@p=1725477188@i=U×008065969@\",\"ankunftSuche\":\"ABFAHRT\",\"klasse\":\"KLASSE_2\",\"produktgattungen\":[\"ICE\",\"EC_IC\",\"IR\",\"REGIONAL\",\"SBAHN\",\"BUS\",\"SCHIFF\",\"UBAHN\",\"TRAM\",\"ANRUFPFLICHTIG\"],\"reisende\":[{\"typ\":\"ERWACHSENER\",\"ermaessigungen\":[{\"art\":\"KEINE_ERMAESSIGUNG\",\"klasse\":\"KLASSENLOS\"}],\"alter\":[],\"anzahl\":1}],\"schnelleVerbindungen\":true,\"sitzplatzOnly\":false,\"bikeCarriage\":false,\"reservierungsKontingenteVorhanden\":false}"
headers = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
  'Accept': 'application/json',
  'Accept-Language': 'de',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'content-type': 'application/json; charset=utf-8',
  'x-correlation-id': '4822e9dd-6f3e-4ea6-93cf-bd8cbbb3cc55_48b243b2-862c-485f-b1bf-a856e8fc5deb',
  'Origin': 'https://www.bahn.de',
  'Connection': 'keep-alive',
  'Referer': 'https://www.bahn.de/buchung/fahrplan/suche',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'Priority': 'u=0',
  'TE': 'trailers',
  'Cookie': 'TS01309da6=0144e11a91381c470bd094b9f15297f6caa05f05b86c067abcb8d90d419d4f8e97fe364cf8e7dbdcb110432d0dc46ebc5369cf1edb'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
