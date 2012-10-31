dojo.require("esri.map");
dojo.require("esri.arcgis.utils");
dojo.require("esri.IdentityManager");
dojo.require("dijit.dijit");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("esri.dijit.Legend");
dojo.require("esri.dijit.Scalebar");

var _maps = [];

var initAGOL = function(){
	createMaps();
};

var createMaps = function(){
  dojo.forEach(_configOptions.webmaps,function(webmap,i){
	dojo.place("<div id='map"+i+"' class='map'></div>",dojo.byId('mapPane'),"last");
    dojo.place("<div id='description"+i+"' class='description'></div>",dojo.byId('mainWindow'),"last");
    dojo.place("<div id='legend"+i+"' class='legend'></div>",dojo.byId('mainWindow'),"last");

    var mapDeferred = esri.arcgis.utils.createMap(webmap.id, "map"+i, {
	  mapOptions: {
        slider: true,
        nav:false
      }
    });
    mapDeferred.then(function(response) {

      var map = response.map;

      if(i === 0){
        map.currentMap = true;
        _configOptions.title = _configOptions.title || response.itemInfo.item.title;
        _configOptions.subtitle = _configOptions.subtitle || response.itemInfo.item.snippet;
		_configOptions.description = _configOptions.description || response.itemInfo.item.description;

		setUpBanner();
	  }
      else{
        map.currentMap = false;
      }

      if(_configOptions.webmaps.length === 1){
        dojo.byId("description"+i).innerHTML = _configOptions.description;
      }
      else{
        dojo.byId("description"+i).innerHTML = "<h3 class='mapTitle'>"+response.itemInfo.item.title+"</h3>"+response.itemInfo.item.description;
      }

      map.firstUpdate = false;
      map.itemData = {
        "title" : response.itemInfo.item.title,
        "subtitle" : response.itemInfo.item.snippet,
        "description" : response.itemInfo.item.description
      };

	  _maps.push(map);

      dojo.connect(map,"onUpdateEnd",function(){
        if(map.firstUpdate === false){
          mapLoaded();
        }
      });

      //add the legend
      var layers = response.itemInfo.itemData.operationalLayers;
      if(map.loaded){
        initMap(map,layers,i);
        resetLayout();
      }
      else{
        dojo.connect(map,"onLoad",function(){
          initMap(map,layers,i);
          resetLayout();
        });
      }
    },function(error){
      console.log("Map creation failed: ", dojo.toJson(error));
    });

  });

};

dojo.addOnLoad(initAGOL);

var mapLoaded = function(){
  if(_maps.length === 1){
    openApp();
  }
  else{
    var readyCount = 0;
    dojo.forEach(_maps,function(map){
      if (map.firstUpdate === true){
        readyCount++;
      }
    });
    if (readyCount === _configOptions.webmaps.length){
      openApp();
    }
  }
};

var initMap = function (map,layers,index) {
  //add chrome theme for popup
  dojo.addClass(map.infoWindow.domNode, "chrome");
  //add the scalebar
  var scalebar = new esri.dijit.Scalebar({
    map: map,
    scalebarUnit:"english" //metric or english
  });

  var layerInfo = buildLayersList(layers);

  if(layerInfo.length > 0){
    var legendDijit = new esri.dijit.Legend({
	  map:map,
	  layerInfos:layerInfo
    },"legend"+index);
    legendDijit.startup();
  }
  else{
    dojo.byId("legend"+index).innerHTML = "";
  }
};

function buildLayersList(layers){
  //layers  arg is  response.itemInfo.itemData.operationalLayers;
  var layerInfos = [];
  dojo.forEach(layers, function(mapLayer, index){
    var layerInfo = {};
    if (mapLayer.featureCollection && mapLayer.type !== "CSV") {
      if (mapLayer.featureCollection.showLegend === true) {
        dojo.forEach(mapLayer.featureCollection.layers, function(fcMapLayer){
          if (fcMapLayer.showLegend !== false) {
            layerInfo = {
              "layer": fcMapLayer.layerObject,
              "title": mapLayer.title,
              "defaultSymbol": false
            };
            if (mapLayer.featureCollection.layers.length > 1) {
              layerInfo.title += " - " + fcMapLayer.layerDefinition.name;
            }
            layerInfos.push(layerInfo);
          }
        });
      }
    } else if (mapLayer.showLegend !== false) {
      layerInfo = {
        "layer": mapLayer.layerObject,
        "title": mapLayer.title,
        "defaultSymbol": false
      };
      //does it have layers too? If so check to see if showLegend is false
      if (mapLayer.layers) {
        var hideLayers = dojo.map(dojo.filter(mapLayer.layers, function(lyr){
        return (lyr.showLegend === false);
    }), function(lyr){
      return lyr.id
      });
      if (hideLayers.length) {
        layerInfo.hideLayers = hideLayers;
      }
    }
    layerInfos.push(layerInfo);
    }
  });
  return layerInfos;
}

var openApp = function () {

};