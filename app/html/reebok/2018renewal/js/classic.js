var $selected;
jQuery(function(){
	classicIndexInit();
});
var classicIndexNum;
var classicSize;
var initLeft;
var moveState = false;
var scrollTop = 0;
function classicIndexInit(){
	var winHeight = jQuery(window).height();
	var empty = (jQuery(window).width() - 1600) / 2; 
	scrollTop = jQuery(window).scrollTop();
	jQuery(window).resize(function(){
		winHeight = jQuery(window).height(); 
		empty = (jQuery(window).width() - 1600) / 2;  
		initLeft =  -((Number(classicIndexNum) -1)  * 800) + 400 + empty;
		jQuery("#classicListBody").css({
			"left" : initLeft + "px"
		});
		menuSet();
	});
	classicIndexNum = 1;
	classicSize = jQuery("#classicList .section").size();
	initLeft = 400 + empty;
	jQuery("#classicListBody").css({
		"left" : initLeft + "px",
		"width" : 800 * classicSize + "px"
	});
	jQuery("#classicListBody .section:first-child").addClass("on");
	$selected = jQuery("#classicListBody .section.on"); 
	jQuery("#classicListBody .section.on").next().addClass("next");
	jQuery("#classicList").scrollEvent({
		id : "classicList",
		func : classicMove,
		preventDefault : false
	}); 
	
	jQuery("#classicListBody .section a")
	.bind("click", function(e){
		if(jQuery(this).parent().hasClass("on")){
			//console.log("이건클릭");
			var url = jQuery(this).attr("data");
			getClassicCont(url);
			//detailSet();
		} else if (jQuery(this).parent().hasClass("prev")){
			classicMove('up');
			
		} else if (jQuery(this).parent().hasClass("next")){
			classicMove('down');
		}
		e.preventDefault();	
	});
}
function classicMove(txt){
	var $now = jQuery("#classicListBody .section.on");
	var $prev = jQuery("#classicListBody .section.prev");
	var $next = jQuery("#classicListBody .section.next");
	if(!moveState && !jQuery("#classicWrap").hasClass("detailShow")){
		moveState = true; 
		if(txt == "down" && classicIndexNum < classicSize){
			initLeft = initLeft - 800;
			jQuery("#classicListBody").css("left", initLeft + "px");
			$now.removeClass("on").addClass("prev");
			$prev.removeClass("prev");
			$next.next().addClass("next");
			$next.removeClass("next").addClass("on");
			classicIndexNum = classicIndexNum + 1;
		} else if(txt == "up" && classicIndexNum > 1){
			initLeft = initLeft + 800;
			jQuery("#classicListBody").css("left", initLeft + "px");
			$now.removeClass("on").addClass("next");
			$next.removeClass("next");
			$prev.prev().addClass("prev");
			$prev.removeClass("prev").addClass("on");
			classicIndexNum = classicIndexNum - 1;
		}
		setTimeout(function(){
			moveState = false;
		},500); 
	}
}

function getClassicCont(url){
	jQuery.post(url, function(data){
		jQuery("#detailArea").html(data);
		detailSet();
	});
}


scrollInit(".nowArea .section1", "v", "200");
scrollInit(".nowArea .section2", "v", "200");
scrollInit(".nowArea .section3", "v", "200");
scrollInit(".nowArea .section4", "v", "200");
var lineUpNum = 1350; 
var nowNum = 400; 
jQuery(window).scroll(function(){
	scrollTop = jQuery(this).scrollTop();
	if(scrollTop > nowNum && !$selected.hasClass("now")){
		$selected.addClass("now")
	} else if(scrollTop <= nowNum && $selected.hasClass("now")){
		$selected.removeClass("now");
	}
	if(scrollTop > lineUpNum){
		if(!jQuery("#classicList").hasClass("open")){
			jQuery("#classicList").addClass("open");
		}
		jQuery("#classicList").css("margin-top", - (230 + scrollTop - lineUpNum) + "px");
	} else if(scrollTop <= lineUpNum){
		if(jQuery("#classicList").hasClass("open")){
			jQuery("#classicList").removeClass("open");
			if(parseInt(jQuery("#classicList").css("margin-top")) < -230) { 
				jQuery("#classicList").css("margin-top", "-230px");
			}
		}
	}
	menuSet();
});


function menuSet(){
	var menuPosNum = Number(jQuery("#wrapper").height()) - Number(jQuery("#efu_footerArea").height()) - Number(jQuery(window).height());
	if(scrollTop >= menuPosNum){
		var btnNum = Number(scrollTop) - menuPosNum;
		if(btnNum < jQuery("#efu_footerArea").height()){
			jQuery("#footBtnArea").css("bottom", btnNum + "px");
		} else {
			jQuery("#footBtnArea").css("bottom", jQuery("#efu_footerArea").height() + "px");
		}
	} else {
		jQuery("#footBtnArea").css("bottom", "0px")
	}
}

function detailSet(){
	var $target = jQuery("#classicListBody .section.on");
	jQuery("#classicListBody .section:not(.on)").addClass("hide");
	jQuery("#classicWrap").addClass("detailShow");
	$selected = jQuery("#classicListBody .section.on"); 
	$selected.find("a").unbind("click");
	setTimeout(function(){
		jQuery("#detailArea .pastArea").removeClass("move");
		jQuery("#footBtnArea").removeClass("move");
	},300)
	
	if(jQuery("#nowSlide").size() > 0){
		jQuery("#nowSlide ul").cycle({ 
		    fx:     'scrollLeft', 
		    pager:  '.sidePaging' ,
		    speed: 500,
		    timeout: 0, 
		})	
	}
	
	
	scrollInit(".nowArea .section1", "v", "200");
	scrollInit(".nowArea .section2", "v", "200");
	scrollInit(".nowArea .section3", "v", "200");
	scrollInit(".nowArea .section4", "v", "200");
	var lineUpNum = 1350; 
	var nowNum = 400; 
	jQuery(window).scroll(function(){
		var scrollTop = jQuery(this).scrollTop();
		if(scrollTop > nowNum && !$selected.hasClass("now")){
			$selected.addClass("now")
		} else if(scrollTop <= nowNum && $selected.hasClass("now")){
			$selected.removeClass("now");
		}
		if(scrollTop > lineUpNum){
			if(!jQuery("#classicList").hasClass("open")){
				jQuery("#classicList").addClass("open");
			}
			jQuery("#classicList").css("margin-top", - (230 + scrollTop - lineUpNum) + "px");
		} else if(scrollTop <= lineUpNum){
			if(jQuery("#classicList").hasClass("open")){
				jQuery("#classicList").removeClass("open");
				if(parseInt(jQuery("#classicList").css("margin-top")) < -230) { 
					jQuery("#classicList").css("margin-top", "-230px");
				}
			}
		}
	});
	scrollVMove(".pastArea .move1", 2, 0, "", 0, 1300);
	scrollVMove(".pastArea .move2", 1.5, 0, "", 0, 1300);
	scrollVMove(".pastArea .move3", 3, 0, "", 0, 1300);
	scrollVMove(".pastArea .move4", 4, 0, "", 0, 1300);
	scrollVMove(".nowArea .section1", 2.5, 200, "", 0, 3000);
	scrollVMove(".nowArea .section2", 3, 200, "", 0, 3000);
	scrollVMove(".nowArea .section3", 4, 200, "", 0, 3000);
	scrollVMove(".nowArea .section4", 3, 200, "", 0, 3000); 
}

function scrollInit(obj, pos, num){
	var $obj = jQuery(obj);
	if(pos == "v"){
		$obj.css("transform", "translateY("+ num +"px)");
	} else {
		$obj.css("transform", "translateX("+ num +"px)");
	}
}
function scrollVMove(obj, speed, moveStart, moveEnd, scrollStart, scrollEnd){
	jQuery(window).scroll(function(e){
		scrollTop = jQuery(this).scrollTop();
		var $obj = jQuery(obj);
		$obj.addClass("transition");
		var move =  - ((scrollTop - scrollStart)  / speed);
		var startNum = 0;
		var endNum = 999999999999999;
		if(scrollStart || scrollStart != "") {
			startNum = scrollStart;
		}
		if(scrollEnd || scrollEnd != "") {
			endNum = scrollEnd;
		}
		if(moveEnd == null) {
			moveEnd = "";
		}
		
		if(startNum < scrollTop && endNum > scrollTop){
			if(moveStart >= 0){
				move = moveStart + move;
				if (Number(move) < Number(moveEnd) && moveEnd.toString() != ""){ 
					$obj.css("transform", "translateY("+ moveEnd +"px)");
				} else {
					$obj.css("transform", "translateY("+ move +"px)");
				}
			}
		}
		
		if(scrollTop <= scrollStart){
			$obj.css("transform", "translateY("+ scrollStart +"px)"); 
		}
	});
}





