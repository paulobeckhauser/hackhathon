from db_api import *
# from sys import exit

f = get_id_only("Hannover hbf")
t = get_id_only("Berlin Hbf")

from pprint import pprint
import json

tid = '''¶HKI¶T$A=1@O=Hannover Hbf@X=9741017@Y=52376764@L=8000152@a=128@$A=1@O=Berlin Hbf@X=13369549@Y=52525589@L=8011160@a=128@$202409130243$202409130602$ICE 2400$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#0#SICT#0#AM#81#AM2#0#RT#7#¶KCC¶I1ZFIzEjRVJHIzEjSElOIzAjRUNLIzQwMzM2M3w0MDMzNjN8NDAzNTYyfDQwMzU2MnwwfDB8NDg1fDQwMzMxN3wxfDB8MTA1MHwwfDB8LTIxNDc0ODM2NDgjR0FNIzEzMDkyNDAyNDMjClojVk4jMSNTVCMxNzI1NDc3MTg4I1BJIzAjWkkjMjY5NzYzI1RBIzAjREEjMTIwOTI0IzFTIzgwMDAyNjEjMVQjMTc0NyNMUyM4MDEwMjU1I0xUIzEwNjEzI1BVIzgwI1JUIzEjQ0EjSUNFI1pFIzI0MDAjWkIjSUNFIDI0MDAjUEMjMCNGUiM4MDAwMTUyI0ZUIzEwMjQzI1RPIzgwMTExNjAjVFQjMTA2MDIj¶KRCC¶#VE#1#¶SC¶1_H4sIAAAAAAACA32P0U6DMBSGX8Wc67m0QCklIUFGlmkWJcYZjfECRzcxQGcpi4TwHD6QL+YBNF5obJOm/9+/5zung6PU4AOdcw9mIN8Mijia38ZzgVrLV/A7qJpyCT6bDZcIfDID1Zg4NRLDFrEcIqgNo3mTl4NJLIILrd1Y4ZTO4KVql4XRa/AfOjDtYYgl11cxhkqVDer8coHimBbNoCixbOgfx54Wz/upMJIzeVir7VSmyDNMngU0vApWaVUpHOZk9bQL7wLBHUooD+8DZtnc5a4TbgKPhGs8CKHMCiP8dggot5jDOfW8MA82H++EeITaDN+xl9pMMy7HRlKt/yRHUhd59cWltu0K5ogRjJt54gdMKXXJP2CXCVf8Bu+lSVTRIgQ9oxs5Wheq0ZVsI9VUWQ3+Li3q6SFJ67rIa/OdlVuVpDotMdT1ff8Jk+jMdPMBAAA='''

# pprint(f)
# pprint(t)
con = get_conn(f, t, '2024-09-13T02:00:39')
# pprint(json.loads(j))
pref = json.loads(con)['verbindungReference']['later']
j = prepare_llm_json(con)
print(j)

j = get_conn(f, t, '2024-09-13T02:00:39', pref)
j = prepare_llm_json(j)
input(j)
# print(j)
exit()
j = prepare_llm_json(j)
# input(j)

from lang import prompt
# input(j)

res = prompt(json.dumps(j), 'i want a connection in the morning with no transfers')
pprint(res)
for i in j:
    # pprint(i)
    if i['id'] == res['id']:
        print(i)
        print(res['description'])
