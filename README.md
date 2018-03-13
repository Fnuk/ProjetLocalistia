# ProjetLocalistia
Projet HTML - Ei5 Istia - Localisation et description des stages à l'étranger des Ei3

**Membre du projet :**
* Alice Funk - Principale : Gestion de l'url unique envoyé aux utilisateur + geocoder (récuperer position depuis une adresse), secondaire : tout le reste, 
* Colin Gachet - Principale : Gestion de la map et des markers + recherche , secondaire : tout le reste

*Les membres du groupe ont globalement touché à tout.*

**Technologie utilisées :**
* Gestion de la map *(+ marker)* : Leaflet
* Serveur : Node.js 
* Gestion des routes : Express 
* Moteur de template : Swig 
* Base de données : MongoDB 


**Pour tester le site :**
1. git clone https://github.com/Fnuk/ProjetLocalistia.git
2. se placer à la racine du dossier localistia
3. lancer un terminal
4. taper la commande suivante : npm install 
Pré-requis à l'étape 5 :
MongoDB installé 
Modules installé
5. taper la commande suivante : npm start 
6. aller à l'adresse suivante : http://localhost:3000/
7. Partager vos expériences

**Bugs connu :**
* Pas de vérification sur le saisie de champs
* Sécurité faible
* Pas de gestion des retour null sur les BDD 
* Pas de gestion des fausses routes *(stacktrace visible)

**Evolutions :**
* Plus de notifications à l'utilisateur *(Ex : confirmation d'envoie de mail via pop-up)*
* limiter les adresses à celle de l'université d'angers
* Supprimer le code mort
* Amélioration de la sécurité
