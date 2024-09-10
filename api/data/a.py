import pandas as pd

f = pd.read_csv('all.csv')
print((f['Verspätung (am Zielbahnhof)'] == 0).count())
