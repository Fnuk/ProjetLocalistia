var express = require('express');
var router = express.Router(); 
var mailer = require("nodemailer"); //pour utiliser le mailer 

var link = "http://localhost:3000/informations";

//pour l'envoi de mail, identification de l'expediteur 
var transporter = mailer.createTransport({
					service: "Gmail",
					auth: {
						user: "contact.localistia@gmail.com",
						pass: "localistia"
					}
				});

//Gestion des routes localhost.../
/* GET home page. */
router.get('/', function(req, res, next) {

 var collection = req.db.get('markerCollection');
 var dataPays;
  collection.find({}, {_id:0, pays: 1}, function(err, data){
      collection.distinct('pays', function (err, data){
        if(err) console.log('Erreur :' + err);
        dataPays = data;
      })
        if(err) console.log('Erreur :' + err);
    });
    
  res.render('index', { title: 'LOCALISTIA', data : dataPays });

});

/* GET add marker */
router.post('/add', function(req, res, next) {

    var dbUrl = req.db.get('singleUrl');

  //préparation du mail à envoyer
  var mailOptions = {
					from: "contact.localistia@gmail.com",
					to: req.body.email,
					subject: "votre lien pour l'ajout de votre marker sur LocalIstia",
					html: "Bonjour, merci "+req.body.firstname+" d'accepter de renseigner des informations sur votre expérience à l'étranger,"+
           "cliquer <a href='"+link+"'>ici</a> afin de remplir un formulaire en lien avec votre lieu de stage. "
				}

  // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }     

        dbUrl.insert({"firstname":req.body.firstname, "lastname":req.body.name, "email":req.body.email, "hash":hashCode(req.body.name.concat(req.body.email)) });
        
        console.log('Message sent: %s', info.messageId);
        console.log('Message sent to : %s', req.body.email);
        res.redirect('/');

    });

});

    function hashCode(str){
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

module.exports = router;
