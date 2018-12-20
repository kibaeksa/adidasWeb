
	scrollVMove(".sectionArea01 .move1", 4, 300, "", 0, 1300);
	scrollVMove(".sectionArea01 .move2", 5, 350, "", 0, 3000);
	scrollVMove(".sectionArea02 .move3", 5.5, 500, "", 0, 3000);
	scrollVMove(".fitnessCont  .fitnessBg", 8, 300, "", 0, 3000);

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
	});
}





