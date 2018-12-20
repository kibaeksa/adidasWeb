
var _boxtop,_looknavitop,minus_val,_fmenu_top;

function lookAnchorMove(_top){
	var curidx;
	var _pos_arr=[
		jQuery('#yoga_row').offset().top-115,	
		jQuery('#running_row').offset().top-115,
		jQuery('#gym_row').offset().top-115,
		jQuery('#street_row').offset().top-115,
		jQuery('#tennis_row').offset().top-115,
		jQuery('#swim_row').offset().top-115
	];
	var navi_list=jQuery('.look_navi li');
	if(_pos_arr[0] <=_top && _top <_pos_arr[1]){
		curidx=0;
	}else if(_pos_arr[1] <=_top && _top <_pos_arr[2]){
		curidx=1;
	}else if(_pos_arr[2] <=_top && _top <_pos_arr[3]){
		curidx=2;
	}else if(_pos_arr[3] <=_top && _top <_pos_arr[4]){
		curidx=3;
	}else if(_pos_arr[4] <=_top && _top <_pos_arr[5]){
		curidx=4;
	}else if(_pos_arr[5] <=_top){
		curidx=5;
	}else{
		curidx=-1;		
	}
	navi_list.each(function(){
		jQuery(this).find('a').removeClass('on');
	});
	if(curidx >= 0)
		navi_list.eq(curidx).find('a').addClass('on');
}

function scrollMygirlDocument(tp,fmenutop,movebxtop,val){	
	/*
	var _top_bnn=parseInt(jQuery('.top_bnn').css('height')) > 0 ? parseInt(jQuery('.top_bnn').css('height')) : 0;
	var total_ht=141+val+_top_bnn;
	console.log(_top_bnn);
	*/
	var total_ht=261+val;
	if(tp>=_boxtop && tp <= fmenutop-val){
		jQuery('.mg_snb').removeClass('stop');
		jQuery('.mg_snb').addClass('fixed');

	}else if(fmenutop-val <=movebxtop){
		jQuery('.mg_snb').removeClass('fixed');
		jQuery('.mg_snb').addClass('stop');
		jQuery('.mg_snb').css({
			top:fmenutop-total_ht+'px'
		});
	}else if(_boxtop >= tp){
		jQuery('.mg_snb').removeClass('fixed');
		jQuery('.mg_snb').removeClass('stop');
	}
}

function scrollMygirlLookDocument(tp,fmenutop,movebxtop,val){	
	/*
	var _top_bnn=parseInt(jQuery('.top_bnn').css('height')) > 0 ? parseInt(jQuery('.top_bnn').css('height')) : 0;
	var total_ht=141+val+_top_bnn;
	console.log(_top_bnn);
	*/
	var total_ht=261+val;
	if(tp>=_looknavitop && tp <= fmenutop-val){
		jQuery('.look_navi').addClass('fixed');
	}else if(fmenutop-val <=movebxtop){
		jQuery('.look_navi').removeClass('fixed');
		jQuery('.look_navi').css({
			top:fmenutop-total_ht+'px'
		});
	}else if(_looknavitop >= tp){
		jQuery('.look_navi').removeClass('fixed');
		jQuery('.look_navi').css({
			top:'360px'
		});
	}
}


function lookNavi(el_id){
	var topval=jQuery('#'+el_id).offset().top-112;	
	jQuery("html, body").animate({scrollTop:topval+'px'},300);
	jQuery('.look_navi li').each(function(){
		jQuery(this).find('a').removeClass('on');
	});
}


function openNotice(){

	if(jQuery(window).height() < 850)
		_ht=852;
	else
		_ht=jQuery(window).height()-50;	
	
	jQuery('.mgnote').addClass('open');
	jQuery('.mgnote .note .note_inner').fadeOut();
	setTimeout(function(){
		jQuery('.mgnote .notice_slide').animate({height:_ht+'px'},500);
		jQuery("html, body").animate({scrollTop:'680px'},800);
	},300);
	
	setTimeout(function(){
		jQuery('.notice_slide .sign').fadeIn();
	},800);
}


function closeNotice(){
	jQuery('.mgnote .notice_slide').animate({height:0},500);
	jQuery("html, body").animate({scrollTop:'578px'},800);				
	jQuery('.notice_slide .sign').hide();
	jQuery('.mgnote').removeClass('open');
	jQuery('.mgnote .note .note_inner').fadeIn();
}


jQuery.fn.lookRolling=function(option){

	return jQuery(this).each(function(){
		var nowidx=0;
		var isOver=false;
		var timerid;

		function setBtn(_idx){
			option.ctrl_btn.each(function(){
				jQuery(this).removeClass('on');
			});
			option.ctrl_btn.eq(_idx).addClass('on');
		}

		function setAction(_idx){
			if(_idx == nowidx) return;

			option.slider_obj.eq(nowidx).fadeOut();
			option.slider_obj.eq(_idx).fadeIn();
			setBtn(_idx);
			nowidx=_idx;
		}

		function autoRoll(){
			var _idx;
			if(nowidx == option.slider_obj.length-1){
				_idx=0
			}else{
				_idx=nowidx+1;	
			}
			setAction(_idx);
		}

		if(option.arrowuse){
			/*
			option.arrow_l.bind('click',function(){
				var _idx;
				if(nowidx == 0){
					_idx=option.slider_obj.length-1;
				}else{
					_idx=nowidx-1
				}
				setAction(_idx);
			});
			*/
			option.arrow_r.bind('click',function(){
				var _idx;
				if(nowidx == option.slider_obj.length-1){
					_idx=0
				}else{
					_idx=nowidx+1;	
				}

				setAction(_idx);
			});			
		}

		option.ctrl_btn.bind('click',function(){
			var _idx=jQuery(this).index();
			setAction(_idx);
		});

		if(option.auto_roll){
			timerid=setInterval(function(){
				autoRoll()
			},option.timer);
		}
		option.wrapper.hover(function(){
			clearInterval(timerid);			
		},function(){
			timerid=setInterval(function(){
				autoRoll()
			},option.timer);
		});

	});
}

jQuery(document).ready(function(){
	_boxtop=jQuery('.mg_snb').offset().top+120;
	var inner_info=false;
	var nowobj;
	var _boxover= false;
	if(jQuery(document).find('.look_navi').attr('class')){
		_looknavitop=jQuery('.look_navi').offset().top;
	}
	
	jQuery(window).scroll(function(){
		var _top=jQuery(document).scrollTop();
		_fmenu_top=jQuery('#footer_r').offset().top;
		var _move_boxtop=jQuery('.mg_snb').offset().top;
		if(jQuery(document).find('.look_navi').attr('class')){
			scrollMygirlLookDocument(_top,_fmenu_top,_move_boxtop,476);
			lookAnchorMove(_top);
		}
		scrollMygirlDocument(_top,_fmenu_top,_move_boxtop,476);
	});	

	jQuery('.str_listbox li').bind('mouseover',function(){
		var _moveval=80;
		var idx=jQuery(this).index();
		var linkbox=jQuery('.str_listbox .linkbox');
		if(linkbox.css('display')=='none'){
			setTimeout(function(){linkbox.fadeIn(300);},1);
		}
		linkbox.stop();
		linkbox.attr('href',jQuery(this).attr('data-url'));
		linkbox.animate({
			top:(_moveval+208*idx)+'px'
		});				
	});

	jQuery('.lookbox .look_category_main').hover(function(){
		jQuery(this).find('.box_info').stop(true,true).fadeOut();
		jQuery(this).find('.box_info').fadeIn(300);
	},function(){
		jQuery(this).find('.box_info').stop(true,true).fadeIn();
		jQuery(this).find('.box_info').fadeOut(300);
	})

	
	/*
	jQuery('.clothes_icon .icon').bind('click',function(event){
		var evt = event || window.event;
		if(evt.stopPropagation) evt.stopPropagation();
		else evt.cancelBubble=true;
		var imgsrc;
		var imgsrc2;
		if(nowobj != undefined || nowobj != null){
			imgsrc=jQuery(this).siblings('.info').find('img').attr('src');
			imgsrc2=nowobj.siblings('.info').find('img').attr('src');
			nowobj.css({zIndex:2});
			nowobj.siblings('.info').css({zIndex:1});
			nowobj.siblings('.info').fadeOut();		 
			if(imgsrc == imgsrc2){
				return false;
			}
				
		}

		nowobj=jQuery(this);
		jQuery(this).css({zIndex:4});
		var _info=jQuery(this).siblings('.info');
		_info.css({zIndex:3});
		_info.fadeIn();

		return false;
	});
	*/
	
	jQuery('.lookbox .box .clt_layer .btn').click(function(){return false;});
	
	jQuery('.lookbox .box .clt_layer').hover(function(){
		jQuery(this).addClass('now');
		jQuery(this).find('div.img').fadeIn();	
	},function(){
		jQuery(this).removeClass('now');
		jQuery(this).find('div.img').fadeOut();
	});
	
	
	


	jQuery('.clothes_icon .info').bind('mouseover',function(event){
		inner_info=true;
	});
	jQuery('.clothes_icon .info').bind('mouseout',function(event){
		inner_info=false;
	});

	jQuery(document).click(function(){
		if(inner_info) return;
		if(nowobj == undefined || nowobj == null) return 

		nowobj.css({zIndex:2});
		nowobj.siblings('.info').css({zIndex:1});
		jQuery('.clothes_icon .info').fadeOut();
	});


});