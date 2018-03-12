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
  
  //on géolocalise le lieu via l'adresse
  var address = req.body.inputAdresse+" "+req.body.inputCity+" "+req.body.inputCountry;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
          db.markerCollection.insert({"lat":results[0].geometry.location.lat, "long":results[0].geometry.location.lng});
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

  //ici inserer les données récupérée du formulaire
  db.informations.insert({"adresse": req.body.inputAdresse,
                          "ville": req.body.inputCity, 
                          "codePostal": req.body.inputZip, 
                          "pays": req.body.inputCountry,
                          "goodDeals": req.body.goodDeals,
                          "devises": req.body.devises,
                          "coutVie": req.body.gridRadios,
                         "contact": req.body.contactMe});
  res.redirect('/informations/thanks');
});

router.post('/informations/thanks', function(req, res, next) {
  res.render('thanks');
});

module.exports = router;