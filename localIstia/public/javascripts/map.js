function toggleSearchInfo(){
  $("#recherche").toggleClass("hidden");
  $("#info").toggleClass("hidden");
}

function getOneMarker(latlng) {
  console.log(latlng);
  $.ajax({
    url: 'http://localhost:3000/map/markerinfo',
    type: 'POST',
    dataType: "json",
    data: {"lat": latlng.lat, "lng":latlng.long},
    cache: false,
    timeout: 5000,
    success: function(data) {
      return data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error ' + textStatus + " " + errorThrown);
    }
  });
}

function onMarkerMouseOver(event){
  console.log(event);
  var data = getOneMarker(event);
  var popup = L.popup()
  popup.setLatLng(event)
        .setContent("Adresse :"+ data.adresse + "\n" + "Commentaire :" + data.goodDeals.subString(0,50)+"...(Clic pour voir +)")
        .openOn(mymap);
}

function onMarkerClick(event){
  var data = getOneMarker(event);
  toggleSearchInfo();
  $("textarea#accomodations").val(data.adresse + "\n" + data.contactMe)
  $("textarea#devise").val(data.devises + "\n" + data.coutVie)
  $("textarea#goodDeals").val(data.goodDeals)
}

function displayAllMarkers(){
    $.ajax({
        url: 'http://localhost:3000/map/all',
        type: 'POST',
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {   
            data.forEach(elem => {
              var marker = L.marker(elem.coordinates).addTo(mymap);
              marker.on('mouseover', onMarkerMouseOver);
              marker.on('click', onMarkerClick);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error ' + textStatus + " " + errorThrown);
        }
    });
}
var mymap = L.map('map').setView([49.505, -0.09], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic2Vyb3phciIsImEiOiJjamVpd3J6M2owN3EwMnhwaGFuaWxicmpyIn0.NmUTfrLP7Kham8myNxeBRg'
}).addTo(mymap);


mymap.on('click', displayAllMarkers);