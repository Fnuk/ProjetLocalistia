var http = require('http');

httpServer = http.createServer(function(req,res) {
  console.log('une nouvelle connexion');

  socket.on('addMarker',function(user){
    console.log("OK");
  })
  
});

httpServer.listen(3000);