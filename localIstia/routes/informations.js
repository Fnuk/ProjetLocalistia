var express = require('express');
var router = express.Router();
//pour récuperer la lat et lng depuis l'adresse renseignée
var geocoder;

//initialisation du geocoder
function initialize() {
    geocoder = new google.maps.Geocoder();
}

/* GET informations page. */
router.get('/', function(req, res, next) {
  res.render('informations');
});

router.post('/sendInfos', function(req, res, next) {
  var db = req.db;

  //initialize le géocoder
  initialize();

  //Initialisation de l'objet à sauver en base
  var infos = {};
  
  //on géolocalise le lieu via l'adresse
  var address = req.body.inputAdresse+" "+req.body.inputCity+" "+req.body.inputCountry;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status == 'OK') {
        // db.markerCollection.insert({"type":"Point", "coordinates":[results[0].geometry.location.lat, results[0].geometry.location.lng]});
        infos.type = "Point"
        infos.coordinates = [results[0].geometry.location.lat, results[0].geometry.location.lng]
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

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
  db.markerCollection.insert(infos);
  res.redirect('/informations/thanks');
});

router.post('/informations/thanks', function(req, res, next) {
  res.render('Thanks');
});

module.exports = router;