var _configOptions

var init = (function(){
	
  _configOptions = {
	
	//The IDs for the webmap from ArcGIS Online
	webmaps : [{
	  "id" : "6edc7488ccbd4f42b7af33f48e0264a1",
	  "title" : ""
	}],
	//Enter a title, if no title is specified, the first webmap's title is used.
	title : "",
	//Enter a subtitle, if no title is specified, the first webmap's subtitle is used.
	subtitle : "",
	//Enter a subtitle, if no title is specified, the first webmap's subtitle is used.
	description : "",
	//If the webmap uses Bing Maps data, you will need to provided your Bing Maps Key
    bingmapskey : "",
	//specify a proxy url if needed
    proxyurl:"",
    //specify the url to a geometry service 
    geometryserviceurl:"http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
    //Modify this to point to your sharing service URL if you are using the portal
    sharingurl :"http://arcgis.com/sharing/content/items"	
	
  }
	
}());