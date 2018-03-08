var express = require('express');
var router = express.Router();

//Gestion des routes localhost.../

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LOCALISTIA' });
});

module.exports = router;
