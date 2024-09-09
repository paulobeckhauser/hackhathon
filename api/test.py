from db_api import get_conn, get_id_only

f = get_id_only("Hannover hbf")
t = get_id_only("Berlin Hbf")

from pprint import pprint

pprint(f)
pprint(t)
# print(get_conn(f, t, '2024-09-13T02:00:39'))
