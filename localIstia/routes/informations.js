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
 var infos = {};

 //on géolocalise le lieu via l'adresse
 var address = req.body.inputAdresse + " " + req.body.inputCity + " " + req.body.inputCountry;
 geocoder.geocode(address)
  .then(function(result) {
    console.log(result);
    infos.type = "Point"
    infos.coordinates = [result[0].geometry.location.lat, result[0].geometry.location.lng]
  })
  .catch(function(status) {
   console.log('Geocode was not successful for the following reason: ' + status);
  });

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
});

router.get('/thanks', function(req, res, next) {
 res.render('thanks');
});

module.exports = router;