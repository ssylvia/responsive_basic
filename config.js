var _configOptions;

var init = (function(){

  _configOptions = {
      
	//The IDs for the webmap from ArcGIS Online
	webmaps : [{
	  "id" : "e5359a951a5b4b1dacff6f4c79cda9e7",
	  "title" : "UNINSURED"
	},{
      "id" : "57191f9582a1496a8e6b568d2076fa22",
	  "title" : "HISPANICS"
	},{
      "id" : "4c42bb71446a471ca52065f04db20fbb",
	  "title" : "INCOME"
	}],
	//Enter a title, if no title is specified, the first webmap's title is used.
	title : "Where are the uninsured?",
	//Enter a subtitle, if no title is specified, the first webmap's subtitle is used.
	subtitle : "Nearly 20 percent of Americans are without health insurance. While lack of coverage is a nationwide challenge, regional patterns are striking. Comparing patterns of those without insurance with factors like ethnicity and income hints at possible causes and effects.",
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

  };

}());