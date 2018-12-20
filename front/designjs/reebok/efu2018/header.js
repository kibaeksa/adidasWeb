(function($){
	$(document).ready(function(){	 	
		if($("#gnb").size() > 0){
			gnb.initGnb();
			gnb.overEvent();
		}
		
		$("#efu_headerWrap .utilArea .util .searchBtn").click(function(){		
			$(this).addClass("on");
			$("#efu_headerWrap .utilArea .searchArea").show();
		});	
		
		/* 20180326 추가*/
		//util
		$(".util .util2").bind("mouseenter focusin", function(){
			$(this).find(".utilBox").show();
				return false;
			})
		.bind("mouseleave focusout" , function(){
			$(this).find(".utilBox").hide();
			return false;
		});
		
		$(".subMenuCont .fitness li")
		.bind("mouseenter focusin", function(){
			$(this).addClass("on");
		})
		.bind("mouseleave focusout" , function(){
			$(this).removeClass("on");
		});
		/*//20180326 추가*/
		
		
		$(".subMenuCont .menuArea ul li a, .subMenuCont .menuArea h2 a").bind("mouseenter focusin", function(){
			$(this).parent().addClass("on");
				return false;
			})
		.bind("mouseleave focusout" , function(){
			$(this).parent().removeClass("on");
			return false;
		});
		
		
	});
	var gnb = {
			initGnb : function initGnb(){
				var $depth1_on = $("#gnb > ul > li.on");
				var gnbDefault_pos = $("#gnb > ul > li:first-child > a").position().left;
				$("#gnbOverBar").css({
					"left" : gnbDefault_pos + "px"  
				});
				$("#gnb > ul > li > .subMenu").hide();
				$("#gnbOverBar").fadeIn(function(){
					if($depth1_on.size() > 0) {
						var depth1_w = $depth1_on.find("> a").width(); 
						var depth1_pos = $depth1_on.find("> a").position().left;
						$("#gnbOverBar").css({ 
							"width" : depth1_w + "px",
							"left" : depth1_pos + "px"
						});
						$(window).resize(function(){
							depth1_w = $depth1_on.find("> a").width(); 
							depth1_pos = $depth1_on.find("> a").position().left;
							$("#gnbOverBar").css({ 
								"width" : depth1_w + "px",
								"left" : depth1_pos + "px"
							}); 
						});
					} else {
						$("#gnbOverBar").removeAttr("style");
						$("#gnbOverBar").css({
							"left" : gnbDefault_pos + "px"  
						});
						$("#gnbOverBar").show();
					}
				}); 
			}, 
			overEvent : function overEvent(){
				var $depth1 = $("#gnb > ul > li > a");
				$depth1.bind("mouseenter", function(){
					if($("body").hasClass("efu_main")){
						$("#header").addClass("on");
					}
					var depth1_w = $(this).width(); 
					var depth1_pos = $(this).position().left;
					$("#gnbOverBar").css({
						"width" : depth1_w + "px",
						"left" : depth1_pos + "px"
					});
					$("#gnb > ul > li > .subMenu").stop().removeAttr("style");
					$(this).siblings(".subMenu").fadeIn(500);
				});
				
				$("#gnb").bind("mouseleave", function(e){
					if($("body").hasClass("efu_main") && $(window).scrollTop() <= 0){
						$("#header").removeClass("on");
					} 
					gnb.initGnb();
				}) 
			} 
			
	}
})(jQuery);