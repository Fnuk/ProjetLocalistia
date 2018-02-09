var express = require('express');
var router = express.Router();

//gestion des routes localhost.../users/...

/* GET users listing. */
router.get('/', function(req, res, next) { //chemin relatif après le 'users'
  res.send('respond with a resource');
});

module.exports = router;
