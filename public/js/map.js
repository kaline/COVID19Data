
 OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
  defaultHandlerOptions: {
      'single': true,
      'double': false,
      'pixelTolerance': 0,
      'stopSingle': false,
      'stopDouble': false
  },

  initialize: function(options) {
      this.handlerOptions = OpenLayers.Util.extend(
          {}, this.defaultHandlerOptions
      );
      OpenLayers.Control.prototype.initialize.apply(
          this, arguments
      ); 
      this.handler = new OpenLayers.Handler.Click(
          this, {
              'click': this.trigger
          }, this.handlerOptions
      );
  }, 

  trigger: function(e) {
      //A click happened!
      var lonlat = map.getLonLatFromViewPortPx(e.xy)
      
      lonlat.transform(
        new OpenLayers.Projection("EPSG:900913"), 
        new OpenLayers.Projection("EPSG:4326")
      );
      
      alert("You clicked near " + lonlat.lat + " N, " +
                                + lonlat.lon + " E");
  }

});


var map;

function init() {
    // map = new L.Map('map');
    map = L.map('map').setView([51.505, -0.09], 13);


    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);


    map = new OpenLayers.Map({
        div: "map",
        allOverlays: true
    });

    var osm = new OpenLayers.Layer.OSM(
      "OpenStreetMap", 
      // Official OSM tileset as protocol-independent URLs
      [
          'http://a.tile.openstreetmap.org/${z}/${x}/${y}.png',
          'http://b.tile.openstreetmap.org/${z}/${x}/${y}.png',
          'http://c.tile.openstreetmap.org/${z}/${x}/${y}.png'
      ], 
      null);
    var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});

    map.addLayers([osm, gmap], circle);


    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());

    map.zoomToMaxExtent();
    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate()

   
}




