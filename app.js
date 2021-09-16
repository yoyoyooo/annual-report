const express = require("express");
const ejs = require('ejs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('node_modules/ejs'));

app.get("/annualReport", (req, res) => {
  // http://localhost:3001/annualReport?name=You%20Xu&eatsTripCount=10&ridesTripCount=20&poolTripsCount=4&favCusine=Japanese&cities=["NY","SF"]&thumbUpCount=13
  var name = req.query.name;
  var eatsTripCount = req.query.eatsTripCount;
  var ridesTripCount = req.query.ridesTripCount;
  var poolTripsCount = req.query.poolTripsCount;
  var favCusine = req.query.favCusine;
  // cities=["aa","bb"]
  var cities = JSON.parse(req.query.cities);
  var thumbUpCount = req.query.thumbUpCount;

  var data = {
    "name": name,
    "eatsTripCount": eatsTripCount,
    "ridesTripCount": ridesTripCount,
    "poolTripsCount": poolTripsCount,
    "favCusine": favCusine,
    "cities": cities,
    "thumbUpCount": thumbUpCount
  };

  console.log(__dirname + '/views/index.ejs');
  ejs.renderFile(__dirname + '/views/index.ejs', data, function(err, data) {
    if (err) {
      console.log(err);
    } else{
      res.send(data);
    }
  });
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
