var _dojoReady,
_currentMap = 0;

$(document).ready(function(e) {
  resetLayout();

  $(".iconCell").click(function(e){
    var jElement = $(this);

    if (jElement.hasClass("descriptionButton")){
      updateMobileContent("description");
    }
    else if (jElement.hasClass("legendButton")){
      updateMobileContent("legend");
    }
    else{
      updateMobileContent("share");
    }

    if($(this).hasClass("close")){
      $("#mobileContent").animate({
        "height" : "0%"
      },"fast");
      setTimeout(function() {
        $(".iconCell").addClass("open");
        $(".iconCell").removeClass("close");
        jElement.addClass("open");
        jElement.removeClass("close");
      }, 200);
    }
    if($(this).hasClass("open")){
      $("#mobileContent").animate({
        "height" : "100%"
      },"fast");
      setTimeout(function() {
        $(".iconCell").removeClass("close");
        $(".iconCell").addClass("open");
        jElement.addClass("close");
        jElement.removeClass("open");
      }, 200);
    }
  });
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
      $(".iconText").removeClass("wide").removeClass("narrow").addClass("small");
      $("#infoBar").removeClass("wide").addClass("small");
      $("#sidePanel").removeClass("wide").addClass("small");
      $(".currentDescriptionPane").removeClass("currentDescriptionPane");
      $("#mobileContent").addClass("currentDescriptionPane");
      $(".currentLegendPane").removeClass("currentLegendPane");
      $("#mobileContent").addClass("currentLegendPane");
	}
	else{

      $("#mobileContent").height(0);
      $(".iconCell").removeClass("close");
      $(".iconCell").addClass("open");

	  if($("#subtitle").length === 0){
		$("#banner").append("<h2 id='subtitle'>"+_configOptions.subtitle+"</h2>");
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
      $(".currentDescriptionPane").removeClass("currentDescriptionPane");
      $("#descriptionPaneSide").addClass("currentDescriptionPane");
      $(".currentLegendPane").removeClass("currentLegendPane");
      $("#legendPaneSide").addClass("currentLegendPane");
      $(".legend").hide();
      $(".description").hide();
      $("#legend"+_currentMap).show();
      $("#description"+_currentMap).show();
	}

    $(".map").each(function(){
        $(this).css("left",($(this).index() - 1 - _currentMap)*$("#mapPane").width());
    });

    if (_maps[_currentMap]){
      $("#description"+_currentMap).appendTo($(".currentDescriptionPane"));
      $("#legend"+_currentMap).appendTo($(".currentLegendPane"));
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

var updateMobileContent = function(pane){
    if (pane === "description"){
      $(".legend").hide();
      $(".description").hide();
      $("#description"+_currentMap).show();
    }
    else if (pane === "legend"){
      $(".legend").hide();
      $(".description").hide();
      $("#legend"+_currentMap).show();
    }
    else{
      $(".legend").hide();
      $(".description").hide();
    }
};

var nextMap = function(){
  if (_currentMap === _configOptions.webmaps.length - 1){
    goToMap(0);
  }
  else{
    goToMap(_currentMap+1)
  }
};

var prevMap = function(){
  if (_currentMap === 0){
    goToMap(_configOptions.webmaps.length - 1);
  }
  else{
    goToMap(_currentMap-1)
  }
};

var goToMap = function(pos){
  if(_configOptions.webmaps.length > 1){
    _currentMap = pos;
    $(".map").each(function(){
      $(this).animate({
        "left" : ($(this).index() - 1 - _currentMap)*$("#mapPane").width()
      },500);
    });
  }
  
  resetLayout();
};

dojo.ready(function(){
  _dojoReady = true;
});