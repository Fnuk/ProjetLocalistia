
(function($){

  var socket = io.connect('http://localhost:3000');

  $('#addMarkerForm').submit(function(event){
      event.preventDefault();
      socket.emit('addMarker', {
        firstname  : $('#firstname').val(),
        name  : $('#name').val(),
        email : $('#email').val()
      });
    });

})(JQuery);