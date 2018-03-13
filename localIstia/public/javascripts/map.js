function toggleSearchInfo(){
  $("#recherche").toggleClass("d-none");
  $("#info").toggleClass("d-none");
}

function onMarkerMouseOver(event){
  $.ajax({
    url: '/map/markerinfo',
    type: 'POST',
    dataType: "json",
    data: {"coordinates": [event.latlng.lat, event.latlng.lng]},
    cache: false,
    timeout: 5000,
    success: function(data) {
      var popup = L.popup()
      popup.setLatLng(data[0].coordinates)
      .setContent("Adresse :"+ data[0].adresse + "\n" + "Commentaire :" + data[0].goodDeals.substring(0,25)+"...(Clic pour voir +)")
      .openOn(mymap);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error getOneMarker ' + textStatus + " " + errorThrown);
    }
  });
}

function onMarkerClick(event){
  $.ajax({
    url: '/map/markerinfo',
    type: 'POST',
    dataType: "json",
    data: {"coordinates": [event.latlng.lat, event.latlng.lng]},
    cache: false,
    timeout: 5000,
    success: function(data) {
      toggleSearchInfo();
      $("textarea#accomodations").val(data[0].adresse + "\n" + data[0].contactMe)
      $("textarea#devise").val(data[0].devises + "\n" + data[0].coutVie)
      $("textarea#goodDeals").val(data[0].goodDeals)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error getOneMarker ' + textStatus + " " + errorThrown);
    }
  });
}

function displayAllMarkers(){
    $.ajax({
        url: '/map/all',
        type: 'POST',
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {
          markers.clearLayers();
          data.forEach(elem => {
            var marker = L.marker(elem.coordinates);
            marker.on('mouseover', onMarkerMouseOver);
            marker.on('click', onMarkerClick);
            markers.addLayer(marker);
          });
          markers.addTo(mymap);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error displayAllMarker ' + textStatus + " " + errorThrown);
        }
    });
}

// Initialisation de la map
var pathname = window.location.pathname;
if(pathname === '/'){
  var mymap = L.map('map').setView([49.505, -0.09], 5);
  var markers = L.layerGroup();
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2Vyb3phciIsImEiOiJjamVpd3J6M2owN3EwMnhwaGFuaWxicmpyIn0.NmUTfrLP7Kham8myNxeBRg'
  }).addTo(mymap);
}
