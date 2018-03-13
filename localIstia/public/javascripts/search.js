function rechercher(){
    $.ajax({
    url: '/map/markerSearch',
    type: 'GET',
    dataType: "json",
    data: {"pays": $('#selectPays').val(),
           "ville": $('#selectVille').val()},
    cache: false,
    timeout: 5000,
    success: function(data) {
        markers.clearLayers();
        console.log(data)
          data.forEach(elem => {
            var marker = L.marker(elem.coordinates);
            marker.on('mouseover', onMarkerMouseOver);
            marker.on('click', onMarkerClick);
            markers.addLayer(marker);
          });
          markers.addTo(mymap);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error rechercher ' + textStatus + " " + errorThrown);
    }
    });
}

function villeSearch(){
    $.ajax({
    url: '/villeRecherche',
    type: 'POST',
    dataType: "json",
    data: {"pays": $('#selectPays').val()},
    cache: false,
    timeout: 5000,
    success: function(data) {
        $('#selectVille').empty();
        $.each(data, function(i, p) {
          $('#selectVille').append($('<option></option>').val(p).html(p));
        });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log('error villeSearch ' + textStatus + " " + errorThrown);
    }
    });
}

// Initialisation comcobox recherche
$(document).ready(function(){
    var pathname = window.location.pathname;
    if(pathname === '/'){
        $.ajax({
            url: '/fillRecherche',
            type: 'POST',
            dataType: "json",
            cache: false,
            timeout: 5000,
            success: function(data) {
                $('#selectPays').empty();
                $.each(data, function(i, p) {
                  $('#selectPays').append($('<option></option>').val(p).html(p));
                });
                villeSearch();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error init search' + textStatus + " " + errorThrown);
            }
        });
    }
});



    