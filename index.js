let myDiv = document.getElementById("result");
let map, infoWindow, bermudaTriangle;
// 14.71108245715983 -17.438867066467555
const position = { lat: 14.71179088936056, lng: -17.440056693589785 };
async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: position,
    zoom: 20,
  });

  const triangleCoords = [
    { lat: 14.71179088936056, lng: -17.440056693589785 },
    { lat: 14.711909888790986, lng: -17.43993906330747 },
    { lat: 14.711778566557939, lng: -17.439800542628863 },
    { lat: 14.711657932769146, lng: -17.43992258313904 },
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
  //   bermudaTriangle.setMap(map);

  //   google.maps.event.addListener(map, "click", (e) => {
  //     console.log(e.latLng.lat(), e.latLng.lng()); // 14.711088942846432 -17.43886922709955
  //   });

  //   google.maps.event.addListenerOnce(map, "tilesloaded", function () {
  google.maps.event.addListenerOnce(map, "idle", function () {
    console.log("Map is ready!");
    // new google.maps.Marker({
    //   position: position,
    //   map,
    // });
    getGeolocation();
  });
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

        // new google.maps.Marker({
        //   position: { lat: latitude, lng: longitude },
        //   map,
        // });

        // alert(
        //   resultColor
        //     ? "you are inside the polygon"
        //     : "you are outside the polygon"
        // );

        if (resultColor) {
          startInitiBarCode();
        } else {
          console.log("You are outside the polygon");
          alert("We can't proceed with the barcode scanning. Because you are not in the showroom.");
          myDiv.innerText = "You are outside the polygon";
        }
      },
      function (error) {
        console.error(error);
        // console.error('Error occurred. Error code: ' + error.code);
      },
      { timeout: 5000, maximumAge: 0 } 
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function startInitiBarCode(params) {
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById("content"),
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: navigator.hardwareConcurrency || 4,
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader",
          "2of5_reader",
          "code_93_reader",
        ],
      },
      debug: {
        showCanvas: false,
        drawBoundingBox: true,
        showFrequency: false,
        drawScanline: false,
        showPattern: false,
      },
      locate: true,
    },
    function (err) {
      if (err) {
        //   myDiv.innerHTML = "Some error for Quagga" + err;
        console.error(err);
        alert("Error: No barcode detected. Try again");
        myDiv.innerText = "Error: No barcode detected. Try again";
        return;
      }
      Quagga.start();
      // myDiv.innerHTML = "Quagga is started";
    }
  );
}
let barrCodeIsDetected = false;

function handleDetect(result) {
  Quagga.stop();
  barrCodeIsDetected = true;
  let userResponse = confirm(
    "Barcode detected: " +
      result.codeResult.code +
      "\nDo you want to continue scanning?"
  );

  if (userResponse) {
    //alert("Scanning ended.");
    startInitiBarCode();
  }
  myDiv.innerHTML = "The detected barcode is: " + result.codeResult.code;
  //   barrCodeIsDetected = false;
  return;
}