var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('images', fs.createReadStream('/Users/akash/OneDrive/Desktop/BasicApps/CommerceUP/Puppeteer/screenshot.jpg'));
data.append('images', fs.createReadStream('/Users/akash/OneDrive/Pictures/Screenshots/2020-10-08 (1).png'));

var config = {
  method: 'post',
  url: 'http://localhost:5000/multiple',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


