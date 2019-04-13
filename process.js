var csv = require('csv-parser');
var fs = require('fs');
var json2csv = require('json2csv');
var dataArray = [];

fs.createReadStream('user.csv')
  .pipe(csv())
  .on('data', (data) => {
    console.log(data);
    // data.newColumn = newColumnValue;
    // dataArray.push(data);
  })
  .on('end', () => {
    // var result = json2csv({ data: dataArray, fields: Object.keys(dataArray[0]) });
    // fs.writeFileSync(fileName, result);
  });