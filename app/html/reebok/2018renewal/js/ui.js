
//휠이벤트
jQuery.fn.scrollEvent = function(opt){
    var defaultOpt = {
        id : null,
        func : null,
        preventDefault : true
    };
    jQuery.extend(defaultOpt, opt);
    
    var elem = document.getElementById(defaultOpt.id);
    if (elem.addEventListener) {    // all browsers except IE before version 9
        // Internet Explorer, Opera, Google Chrome and Safari
        elem.addEventListener ("mousewheel", MouseWheelHandler, false);
        // Firefox
        elem.addEventListener ("DOMMouseScroll", MouseWheelHandler, false);
    }else{
        if (elem.attachEvent) { // IE before version 9
            elem.attachEvent ("onmousewheel", MouseWheelHandler);
        }
    }   
    
    function MouseWheelHandler() {
        var nDelta = 0;
        if (!event) { event = window.event; }
        // cross-bowser handling of eventdata to boil-down delta (+1 or -1)
        if ( event.wheelDelta ) { // IE and Opera
            nDelta= event.wheelDelta;
            if ( window.opera ) {  // Opera has the values reversed
                nDelta= -nDelta;
            }
        }
        else if (event.detail) { // Mozilla FireFox
            nDelta= -event.detail;
        }
        if (nDelta > 0) {
        	defaultOpt.func('up');
        }
        if (nDelta < 0) {
        	defaultOpt.func('down');
        }
        if(defaultOpt.preventDefault){
        	if ( event.preventDefault ) {  // Mozilla FireFox
        		event.preventDefault();
        	}
        	event.returnValue = false;  // cancel default action
        }
   }
}

//classic 이미지 확대
function bigImgOpen(url){
	var tamp = '<div id="blockArea"><div id="bigImgArea"><img src="'+ url +'" alt=""><a href="#" onclick="layerPopupClose(); return false;" class="btnClose">닫기</a></div></div>';
	jQuery("#wrapper").append(tamp);
}

/* 20180326 추가*/
//메인 popup
function showPopupLayer(url, size){
	var temp = '<iframe width="100%" height="'+ size +'" src="'+ url +'" class="mainPopup"></iframe>';

	jQuery("#wrapper").append('<div id="blockArea">'+ temp +'</div>');
}
/*//20180326 추가*/

function layerPopupClose(){
	jQuery("#blockArea").fadeOut(function(){
		jQuery(this).remove();
	});
}

function youtubePopup(id){
	var url = 'https://www.youtube.com/embed/' + id + '?version=3&autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&disablekb=1';
	var temp = '<a href="#" class="btnLayerClose" onclick="layerPopupClose(); return false;"><img src="/images/reebok/efu2018/btn/btn_close2.png" alt="닫기" width="60" class="imgVm"></a>'
					+'<iframe width="100%" height="100%" src="'+ url +'" frameborder="0" allowfullscreen id="youtubeFullFrame"></iframe>';
	
	jQuery("#wrapper").append('<div id="blockArea">'+ temp +'</div>');
}

function checkAll(all, chks){
	var $chkAll = jQuery(all);
	var $chkOther = jQuery(chks);
	$chkAll.change(function(){
		var chkAllState = jQuery(this).prop("checked");
		$chkOther.prop("checked", chkAllState).change(); 
		if(chkAllState){
			$chkOther.parent().addClass("on");
		} else {
			$chkOther.parent().removeClass("on");
		}
	});
	$chkOther.change(function(){
		var chkVal = true;
		var allCheckState = true;
		$chkOther.each(function(){
			if(!jQuery(this).prop("checked")){
				chkVal = false;	
			}
		});
		$chkOther.not(this).each(function(){
			if(!jQuery(this).prop("checked")){
				allCheckState = false;	 
			}
		});
		$chkAll.prop("checked", chkVal);   
		if(chkVal) {
			$chkAll.parent().addClass("on");
		} else {
			$chkAll.parent().removeClass("on");
			if(allCheckState) {
				$chkOther.prop("checked", false);
				$chkOther.parent().removeClass("on");
				jQuery(this).prop("checked", true);
				jQuery(this).parent().addClass("on");				
			}
		}
	});
}

jQuery(function(){
	//header Top Bar
	jQuery(".oneday_bars .b1>a").click(function(){
		jQuery("#speedPop").css("display","block");
		jQuery(".overlay").css("display","block");
		
		var popH = jQuery("#speedPop .popup").height()/2;

		jQuery("#speedPop .popup").css("margin-top", -popH);
	});
	
	jQuery(".oneday_bars .b3>a").click(function(){
		jQuery("#changePop").css("display","block");
		jQuery(".overlay").css("display","block");
		
		var popH = jQuery("#changePop .popup").height()/2;

		jQuery("#changePop .popup").css("margin-top", -popH);
	});
	
	
	/*//마이페이지
	//selectBox
	jQuery(".selectbox-ctm>a").click(function(){
		if(!jQuery(this).parent(".selectbox-ctm").hasClass("open")) {
			jQuery(".selectbox-ctm").removeClass("open");
			jQuery(this).parent(".selectbox-ctm").addClass("open");
		} else {
			jQuery(this).parent().removeClass("open");
		}
		return false;
	});

	jQuery(".select-contents ul li a").click(function(){		
		jQuery(this).parent().parent().parent().parent().find(">a").text(jQuery(this).text())  ; 
		jQuery(this).parents(".selectbox-ctm").removeClass("open");
	
	});
	
	//반품신청절차 팝업 check
	jQuery(".input-ctm label .ctm-box").click(function(){
		if(!jQuery(this).parents(".input-ctm").hasClass("checked")) {
			jQuery(this).parents(".input-ctm").addClass("checked");
		} else {
			jQuery(this).parents(".input-ctm").removeClass("checked");
		}
	});
	

	//팝업닫기
	jQuery(".mypage-wrapper .close, .popup-contents .button_wrap .cancel, .popup-contents .button_wrap .btn-ctm, .modal-popup-wrapper .close").click(function(){
		jQuery(".modal-popup-wrapper").css("display","none");
		jQuery(".overlay").css("display","none");

	});
	
	//셀렉트 박스 닫기
	jQuery(".selectbox-ctm .option-list ul li a").click(function(){
		jQuery(this).parents(".option-list").find("li").removeClass("open");
		jQuery(this).parent().addClass("open");
	
		return false;
	});
	
	
	jQuery(document).click(function(e) {
		if(jQuery(".selectbox-ctm .select-contents").is(":visible")){
			if(!(jQuery(e.target).parents(".select-box-wrapper").length)){
				jQuery(".selectbox-ctm").removeClass("open");
			}
		}
	});
	
	jQuery(document).keyup(function(e) {
		if(jQuery(".selectbox-ctm .select-contents").is(":visible")){
			if(!(jQuery(e.target).parents(".select-box-wrapper").length)){
				jQuery(".selectbox-ctm").removeClass("open");
			}
		}
	}); 
	*/
});

function layerOpen(target){
	var _target = jQuery(target);
	_target.css("display","block");
	jQuery(".overlay").css("display","block");
	jQuery(".modal-popup-wrapper .popup-contents").scrollTop(0);
}

