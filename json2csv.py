import csv, json, sys
reload(sys)
sys.setdefaultencoding("UTF-8")

fileInput = 'tweets-geocode.json'
fileOutput = 'tweet1-geocode.csv'
flag = False
inputFile = open(fileInput)
outputFile = open(fileOutput, 'w')
data = json.load(inputFile)
inputFile.close()
output = csv.writer(outputFile)
for row in data:
    del row['temp2']
    del row['temp3']
    del row['temp4']
    if not flag:
        output.writerow(row.keys())
        flag = True
    output.writerow(row.values())