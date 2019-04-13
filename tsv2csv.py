import re
with open("../training-small.txt", 'r') as myfile:
  with open("tweets-geocode.csv", 'w') as csv_file:
    for line in myfile:
      fileContent = re.sub("\t", ",", line)
      csv_file.write(fileContent)