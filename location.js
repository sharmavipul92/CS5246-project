const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var csvWriter = createCsvWriter({
    path: 'usergeocode-temp4.csv',
    header: ['uid', 'lat', 'long', 'state', 'region']
});

var regions = {
    'AK': 'west',
    'HI': 'west',
    'WA': 'west',
    'OR': 'west',
    'CA': 'west',
    'MT': 'west',
    'ID': 'west',
    'WY': 'west',
    'NV': 'west',
    'UT': 'west',
    'CO': 'west',
    'AZ': 'west',
    'NM': 'west',
    'ND': 'midwest',
    'SD': 'midwest',
    'MN': 'midwest',
    'NE': 'midwest',
    'IA': 'midwest',
    'KS': 'midwest',
    'MO': 'midwest',
    'WI': 'midwest',
    'MI': 'midwest',
    'IL': 'midwest',
    'IN': 'midwest',
    'OH': 'midwest',
    'OK': 'south',
    'AR': 'south',
    'TX': 'south',
    'LA': 'south',
    'KY': 'south',
    'TN': 'south',
    'MS': 'south',
    'AL': 'south',
    'FL': 'south',
    'GA': 'south',
    'SC': 'south',
    'NC': 'south',
    'VA': 'south',
    'WV': 'south',
    'DC': 'south',
    'MD': 'south',
    'DE': 'south',
    'NY': 'northeast',
    'PA': 'northeast',
    'NJ': 'northeast',
    'ME': 'northeast',
    'NH': 'northeast',
    'VT': 'northeast',
    'MA': 'northeast',
    'CT': 'northeast',
    'RI': 'northeast'
};

var dataArray = [];
var promises = [];
var url = 'http://open.mapquestapi.com/geocoding/v1/reverse?key=2oTDvaJZgZYooGFu6vQtMMovkTV0PTOd&location='

// http://open.mapquestapi.com/geocoding/v1/reverse?key=xhwC8jxnXYHG875bcmutxdDz8bXWG9L6&location=47.528139,-122.197916

fs.createReadStream('user-subset.csv')
    .pipe(csv())
    .on('data', async (data) => {
        dataArray.push({uid: data.uid, lat: data.lat, long: data.long});
        promises.push(axios.get(url + data.lat + ',' + data.long));
    })
    .on('end', () => {
        axios.all(promises).then(async results => {
            for(var i=0; i<results.length; i++){
                let state = results[i].data.results[0].locations[0].adminArea3 || '';
                if(state === 'District of Columbia') state = 'DC';
                let region = '';
                if(state){
                    region = regions[state] || results[i].data.results[0].locations[0].adminArea1 || '';
                }
                dataArray[i].state = state;
                dataArray[i].region = region;
            }
            console.log(dataArray);
            await csvWriter.writeRecords(dataArray)
                        .then(async () => {
                            console.log('...Done');
                        });
        }).catch(error => {
            console.log('error aa gaya !!!!!!!!!!!!!!!');
            console.log(error);
        });
    });

// axios.get(url + data.lat + ',' + data.long)
//     .then(response => {
//         // console.log(data.lat + ', ' + data.long);
//         let state = response.data.results[0].locations[0].adminArea3 || '';
//         let region = '';
//         if(state){
//             region = regions[state] || response.data.results[0].locations[0].adminArea1 || '';
//         }
//         // console.log(response.data.results[0].locations[0].adminArea3);
//         let record = {uid: data.uid, lat: data.lat, long: data.long, state: state, region: region};
//         console.log(record);
//         dataArray.push(record);
//         csvWriter.writeRecords([record])
//             .then(() => {
//                 console.log('...Done');
//             });
//     })
//     .catch(error => {
//         console.log(error);
//     });
  



