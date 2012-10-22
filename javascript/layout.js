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
	var dWidth = $(document).width();
	if (dWidth < 768){
	  $("#subtitle").hide();
	}
	else{
	  if($("#subtitle").length === 0){
		$("#banner").append("<div id='subtitle'>"+_configOptions.subtitle+"</div>");
	  }
	  $("#subtitle").show();
	}
	
	if (_maps.length > 0){
	  $.each(_maps,function(i){
		  _maps[i].resize();
	  });
	}
};