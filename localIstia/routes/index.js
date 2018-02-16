var express = require('express');
var router = express.Router();

//Gestion des routes localhost.../

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LOCALISTIA' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
