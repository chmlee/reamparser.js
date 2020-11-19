import json
import os

results = [['language', 'schema', 'time']]

for filename in os.listdir('./result'):
    with open(f"./result/{filename}", "r") as f:
        data = json.load(f)

    times = data['results'][0]['times']
    language, schema = data['results'][0]['command'].split('_')
    for time in times:
        results.append([language, schema, time])

with open("result.csv", "w") as f:
    for line in results:
        result = ",".join([str(item) for item in line])
        f.write(result)
        f.write("\n")
