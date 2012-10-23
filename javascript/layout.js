var _dojoReady;

$(document).ready(function(e) {
  resetLayout();
});

$(window).resize(function(e) {
  resetLayout();
});

var setUpBanner = function(){
  $("title").html(_configOptions.title);
  $("#title").html(_configOptions.title);
  $("#subtitle").html(_configOptions.subtitle);
  $("#description").html(_configOptions.description);
};

var resetLayout = function(){
	var wWidth = $(window).width();
	if (wWidth < 768){
      $("#banner").removeClass("wide").addClass("small");
      $("#title").removeClass("wide").addClass("small");;
      if($("#subtitle").length > 0){
        $("#subtitle").removeClass("wide").addClass("small");
      }
      if($("#iconBar").length === 0){
        $("#infoBar").append("<table id='iconBar'><tr><td class='iconCell'><img src='css/icons/4_collections_view_as_list.png' class='icon' alt=''><p class='iconText small'>Description</p></td><td class='iconCell'><img src='css/icons/10_device_access_storage.png' class='icon' alt=''><p class='iconText small'>Legend</p></td><td class='iconCell'><img src='css/icons/6_social_share.png' class='icon' alt=''><p class='iconText small'>Share</p></td><tr></table>");
      }
      else{
        $(".iconText").removeClass("wide").removeClass("narrow").addClass("small");
      }
      $("#infoBar").removeClass("wide").addClass("small");
      $("#sidePanel").removeClass("wide").addClass("small");
	}
	else{
	  if($("#subtitle").length === 0){
		$("#banner").append("<div id='subtitle'>"+_configOptions.subtitle+"</div>");
	  }
      $("#banner").removeClass("small");
      $("#title").removeClass("small");
      $("#subtitle").removeClass("small");
      $("#banner").addClass("wide");
	  $("#title").addClass("wide");
      $("#subtitle").addClass("wide");
      $(".iconText").removeClass("small").removeClass("narrow").addClass("wide");
      $("#infoBar").removeClass("small").addClass("wide");
      $("#sidePanel").removeClass("small").addClass("wide");
	}

    if (wWidth < 350){
      $(".iconText").removeClass("wide").removeClass("small").addClass("narrow");
    }

    if(_dojoReady === true){
      dijit.byId("mainWindow").layout();
    }

	if (_maps.length > 0){
	  $.each(_maps,function(i){
		_maps[i].resize();
	  });
	}
};

dojo.ready(function(){
  _dojoReady = true;
});