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
    var wHeight = $(window).height();
	if (wWidth < 768){
      $("#banner").removeClass("wide");
      $("#title").removeClass("wide");
      $("#banner").addClass("small");
      $("#title").addClass("small");
      if($("#subtitle").length > 0){
        $("#subtitle").removeClass("wide");
	    $("#subtitle").addClass("small");
      }
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
	}
    $("#mapPane").height(wHeight - $("#banner").outerHeight());

	if (_maps.length > 0){
	  $.each(_maps,function(i){
		_maps[i].resize();
	  });
	}
};