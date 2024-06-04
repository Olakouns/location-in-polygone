// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow, bermudaTriangle;
// 14.71108245715983 -17.438867066467555
const position = { lat: 14.71108245715983, lng: -17.438867066467555 };
async function initMap() {
  const google = await new Promise((resolve) => {
    if (window.google) {
      resolve(window.google);
    } else {
      window.initMap = () => {
        resolve(window.google);
      };
    }
  });

  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 30,
  });

  const triangleCoords = [
    { lat: 14.711096077152874, lng: -17.43889448462234 },
    { lat: 14.71111845283765, lng: -17.438872021121842 },
    { lat: 14.711085051452296, lng: -17.438838828785283 },
    { lat: 14.71106235147876, lng: -17.438860957009656 },
  ];
  bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  //   console.log(bermudaTriangle);
  bermudaTriangle.setMap(map);

  google.maps.event.addListener(map, "click", (e) => {
    console.log(e.latLng.lat(), e.latLng.lng()); // 14.711088942846432 -17.43886922709955
  });

  google.maps.event.addListenerOnce(map, "tilesloaded", function () {
    console.log("Map is ready!");
    
    // const resultColor = google.maps.geometry.poly.containsLocation(
    //   position,
    //   bermudaTriangle
    // );

    // new google.maps.Marker({
    //     position:  position,
    //     map,
    //   });


  
    getGeolocation();
  });

  //  getGeolocation();

  //   setTimeout(function () {
  // const resultColor = google.maps.geometry.poly.containsLocation(
  //   position,
  //   bermudaTriangle
  // );

  //     console.log(resultColor);
  //   }, 5000);
}

window.initMap = initMap;
// initMap();

function getGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(position.coords);
        // window.initMap = initMap;

        const resultColor = google.maps.geometry.poly.containsLocation(
          { lat: latitude, lng: longitude },
          bermudaTriangle
        );

        new google.maps.Marker({
            position:  { lat: latitude, lng: longitude },
            map,
          });

          alert(resultColor ? 'you are inside the polygon' : 'you are outside the polygon');
        console.log(resultColor);
      },
      function (error) {
        console.error(error);
        // console.error('Error occurred. Error code: ' + error.code);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
