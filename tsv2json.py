#!/usr/bin/env python

import csv
import json
import collections
import codecs

# aliases
OrderedDict = collections.OrderedDict

src = '../training-small.txt'
dst = 'tweets-geocode.json'
header = [
    'user','temp1','lat','long','temp2','temp3','temp4','tweet'
]

data = []
with open(src, 'r') as csvfile:
    
    reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter='\t', quotechar='"')
    for row in reader:
        row = filter(None, row)
        data.append(OrderedDict(zip(header, row)))

with open(dst, 'w') as jsonfile:
    json.dump(data, jsonfile, indent=2)

# if '\0' in open('../full_text.txt').read():
#     print "you have null bytes in your input file"
# else:
#     print "you don't"