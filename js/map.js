const INPUT = document.getElementById("place_input")
let MAP;
let AUTOCOMPLETE;
let MARKER;
function initMap() {
    MAP = new
    google.maps.Map(document.getElementById("map"), {
        center: { lat: -14.235004, lng: -51.92528 },
        zoom: 5,
        });
        
        MARKER = new google.maps.Marker({
        position:{ lat: -14.235004, lng: -51.92528 },
        map:MAP,
        });
        
        initAutocomplete();
}
        
        function initAutocomplete(){
            AUTOCOMPLETE = new google.maps.places.Autocomplete(INPUT)
            AUTOCOMPLETE.addListener("place_changed", function(){
            const place = AUTOCOMPLETE.getPlace();
            MAP.setCenter(place.geometry.location);
            MARKER.setPosition(place.geometry.location);
            })
        }
        
        function getAddressFromLatLng(lat, lng) {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(lat, lng);
          
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    document.getElementById("place_input").classList.add("hidden");
                    document.getElementById("map").classList.add("hidden");
                    document.getElementById("boton").classList.add("hidden");
                    document.getElementById("address").innerHTML = "este quadrinho será enviado para: " + results[0].formatted_address;
                } else {
                  console.log("No se encontró una dirección.");
                }
              } else {
                console.log("Error al usar el Geocoder: " + status);
              }
            });
          }
          
          
        const button = document.querySelector("button[type='submit']");
        button.addEventListener("click", function(){
            const latitude = MARKER.getPosition().lat();
            const longitude = MARKER.getPosition().lng();
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            getAddressFromLatLng(latitude, longitude);
          });

        
          
window.initMap = initMap;