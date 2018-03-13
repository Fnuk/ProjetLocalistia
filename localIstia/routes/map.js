var express = require('express');
var router = express.Router();

/* POST pour recup tous les marqueurs existant */
router.post('/all', function(req, res) {
    var db = req.db;
    var collection = db.get('markerCollection');
  
    collection.find({}, {_id: 0}, function(err, data){
        if(err) console.log('Erreur :' + err);
        console.log(data)
        res.send(data);
    });
});

router.post('/markerinfo', function(req, res) {
    var db = req.db;
    var collection = db.get('markerCollection')
    //TODO CA FONCTIONNE PAS -> query ne trouve rien
    // $and: [{lat:{$eq:req.body.lat}}, {lng:{$eq:req.body.lat}}]
    var query = {devises: "EUROS"};
    //utiliser find ou findOne
    collection.findOne({$and: [{lat:{$eq:req.body.lat}}, {lng:{$eq:req.body.lat}}]}).then((data) =>{
        console.log("COUCOU"+data);
        res.send(data);
    });
});

module.exports = router;