var express = require('express');
var router = express.Router();

/* GET pour recup tous les marqueurs existant */
router.post('/all', function(req, res, next) {
    var db = req.db;
    var collection = db.get('markerCollection');
  
    collection.find({}, {_id: 0, coordinates: 1}, function(err, data){
        if(err) console.log('Erreur :' + err);
        console.log(data)
        res.send(data);
    });
  });

module.exports = router;