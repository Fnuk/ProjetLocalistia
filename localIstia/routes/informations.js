var express = require('express');
var router = express.Router();
//pour récuperer la lat et lng depuis l'adresse renseignée utilisation de node-geocoder (middleware avec google api)
var NodeGeocoder = require('node-geocoder');



//option du geocoder
var options = {
 provider: 'google',

 // Optional depending on the providers
 httpAdapter: 'https', // Default
 apiKey: 'AIzaSyC1gihQv-kHjLscCQABx7eESNzuNijIYXo', // for Mapquest, OpenCage, Google Premier
 formatter: null // 'gpx', 'string', ...
};

//le geocoder
var geocoder = NodeGeocoder(options);

/* GET informations page. */
router.get('/', function(req, res, next) {


 res.render('informations');

});

router.post('/sendInfos', function(req, res, next) {
 var dbinfo = req.db.collection('informations');
 var dbmarker = req.db.collection('markerCollection');
console.log(req.body)
 //on géolocalise le lieu via l'adresse
 var address = req.body.inputAddress + " " + req.body.inputCity + " " + req.body.inputCountry;
 console.log(address);
 geocoder.geocode(address)
  .then(function(result) {
   console.log(result);
   dbmarker.insert({
    "lat": result[0].latitude,
    "long": result[0].longitude
   });
  })
  .catch(function(status) {
   console.log('Geocode was not successful for the following reason: ' + status);
  });

 //ici inserer les données récupérée du formulaire
 dbinfo.insert({
  "adresse": req.body.inputAddress,
  "ville": req.body.inputCity,
  "codePostal": req.body.inputZip,
  "pays": req.body.inputCountry,
  "goodDeals": req.body.goodDeals,
  "devises": req.body.devises,
  "coutVie": req.body.gridRadios,
  "contact": req.body.contactMe
 });
 res.redirect('/informations/thanks');
});

router.get('/thanks', function(req, res, next) {
 res.render('thanks');
});

module.exports = router;