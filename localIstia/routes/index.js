var express = require('express');
var router = express.Router();

//Gestion des routes localhost.../

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LOCALISTIA' });

  $('#addMarkerForm').submit(function(event){
    event.preventDefault();
    socket.emit('addMarker', {
      firstname  : $('#firstname').val(),
      name  : $('#name').val(),
      email : $('#email').val()
    });
  });

});

module.exports = router;
