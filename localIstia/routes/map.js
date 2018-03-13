var express = require('express');
var router = express.Router();

/* POST pour recup tous les marqueurs existant */
router.post('/all', function(req, res) {
    var db = req.db;
    var collection = db.get('markerCollection');
  
    collection.find({}, {_id: 0}, function(err, data){
        if(err) console.log('Erreur :' + err);
        res.send(data);
    });
});

/* POST pour recup les infos d'un marker*/
router.post('/markerinfo', function(req, res) {
    var db = req.db;
    var collection = db.get('markerCollection')
    var coord = [Number(req.body.coordinates[0]), Number(req.body.coordinates[1])]
    collection.find({coordinates:coord}, {_id: 0}, function(err, data){
        if(err) console.log('Erreur :' + err);
        res.send(data);
    });
});

router.get('/markerSearch', function(req, res, next){
    var db = req.db;
    var collection = db.get('markerCollection')
    collection.find({pays: req.query.pays, ville: req.query.ville}, {_id: 0}, function(err, data){
        if(err) console.log('Erreur :' + err);
        console.log(req.query.pays)
        console.log(req.query.ville)
        res.send(data);
    });
});

module.exports = router;