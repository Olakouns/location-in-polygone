<html>
  <head>
    <title>Geolocation</title>
    <script src="quagga.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <link rel="stylesheet" type="text/css" href="./style.css" />
    <script type="module" src="./index.js"></script>
  </head>
  <body>
    <div id="map"></div>

    <main>
        <div id = "result" class="info-message">
            Please try scanning to see the result.
        </div>
        <div id="content"></div>
    </main>

    <!-- 
      The `defer` attribute causes the script to execute after the full HTML
      document has been parsed. For non-blocking uses, avoiding race conditions,
      and consistent behavior across browsers, consider loading using Promises. See
      https://developers.google.com/maps/documentation/javascript/load-maps-js-api
      for more information.
      -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZ1NyIP9FBXmUmrXtC1gWqNt0yXdgBsf8&callback=initMap&v=weekly"
      async defer
    ></script>
  </body>
</html>