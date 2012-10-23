dojo.require("esri.map");
dojo.require("esri.arcgis.utils");
dojo.require("dijit.dijit");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");

var _maps = [];

var initAGOL = function(){
	createMaps();
};

var createMaps = function(){
  dojo.forEach(_configOptions.webmaps,function(webmap,i){
	dojo.place("<div id='map"+i+"' class='map'></div>",dojo.byId('mapPane'),"last");

    var mapDeferred = esri.arcgis.utils.createMap(webmap.id, "map"+i, {
	  mapOptions: {
        slider: true,
        nav:false
      }
    });
    mapDeferred.then(function(response) {
	  if(i === 0){
	    _configOptions.title = _configOptions.title || response.itemInfo.item.title;
        _configOptions.subtitle = _configOptions.subtitle || response.itemInfo.item.snippet;
		_configOptions.description = _configOptions.description || response.itemInfo.item.description;

		setUpBanner();
	  }

      var map = response.map;

      map.itemData = {
        "title" : response.itemInfo.item.title,
        "subtitle" : response.itemInfo.item.snippet,
        "description" : response.itemInfo.item.description
      };

	  _maps.push(map);

      //add the legend
      var layers = response.itemInfo.itemData.operationalLayers;
      if(map.loaded){
        //initMap(layers);
        resetLayout();
      }
      else{
      dojo.connect(map,"onLoad",function(){
        //initMap(layers);
        resetLayout();
      });
    }
    },function(error){
      console.log("Map creation failed: ", dojo.toJson(error));
    });

  });

};

dojo.addOnLoad(initAGOL);