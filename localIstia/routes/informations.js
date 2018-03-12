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
 var dbmarker = req.db.collection('markerCollection');
<<<<<<< HEAD
console.log(req.body)
=======
 var infos = {};

>>>>>>> fe4fecd0e1a44608f6ccd454684af58c27784a99
 //on géolocalise le lieu via l'adresse
 var address = req.body.inputAddress + " " + req.body.inputCity + " " + req.body.inputCountry;
 console.log(address);
 geocoder.geocode(address)
  .then(function(result) {
<<<<<<< HEAD
   console.log(result);
   dbmarker.insert({
    "lat": result[0].latitude,
    "long": result[0].longitude
   });
=======
    console.log(result);
    infos.type = "Point"
    infos.coordinates = [result[0].geometry.location.lat, result[0].geometry.location.lng]
>>>>>>> fe4fecd0e1a44608f6ccd454684af58c27784a99
  })
  .catch(function(status) {
   console.log('Geocode was not successful for the following reason: ' + status);
  });

<<<<<<< HEAD
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
=======
  console.log("ADRESSE:" + req.body.inputAdresse)
  // update objet à sauver dans la base
  infos.adresse = req.body.inputAdresse,
  infos.ville = req.body.inputCity, 
  infos.codePostal = req.body.inputZip, 
  infos.pays = req.body.inputCountry,
  infos.goodDeals = req.body.goodDeals,
  infos.devises = req.body.devises,
  infos.coutVie = req.body.gridRadios,
  infos.contact = req.body.contactMe;

  //ici inserer les données récupérée du formulaire
  dbmarker.insert(infos);
  console.log("Insertion réussie:" + infos)
  res.redirect('/informations/thanks');
>>>>>>> fe4fecd0e1a44608f6ccd454684af58c27784a99
});

router.get('/thanks', function(req, res, next) {
 res.render('thanks');
});

module.exports = router;