;(function () {
	jQuery.fn.shoplive=function(){
		jQuery('.live_left_inner li').hover(function(){
			jQuery(this).find('a').find('strong').addClass('hv');
		},function(){
			jQuery(this).find('a').find('strong').removeClass('hv');
		});
		jQuery('.rank_view>span').hover(function(){
			jQuery(this).find('span').stop();			
			jQuery(this).find('span').animate({opacity:1},350);
		},function(){
			jQuery(this).find('span').stop();	
			jQuery(this).find('span').animate({opacity:0},200);
		});

		jQuery('.live_rbody li').hover(function(){
			jQuery(this).find('.hover_bg').stop();
			jQuery(this).find('.hover_bg').animate({top:0,left:0,borderWidth:'4px'},80);
		},function(){
			jQuery(this).find('.hover_bg').stop();
			jQuery(this).find('.hover_bg').animate({top:'4px',left:'4px',borderWidth:'0px'},1);		
		});
		jQuery('.live_rbody li>.hover_bg').click(function(){
			jQuery('.live_layer1,.live_layer2').hide();
			jQuery('.hover_bg').removeClass('on');
			jQuery(this).addClass('on');
			jQuery(this).siblings('div').fadeIn(200);
		});
		jQuery('.live_layer_close').click(function(){
			jQuery('.live_layer1,.live_layer2').fadeOut();		
			jQuery('.live_rbody li>.hover_bg').each(function(){
				jQuery(this).removeClass('on');
			})
		});
		jQuery('.rank_view >span').click(function(){
			jQuery(this).find('span').addClass('on');
			jQuery(this).siblings('span').find('span').removeClass('on');
			var num=jQuery(this).attr('class').match(/\d/);
			if(num==1){
				jQuery('.rank_list1').fadeIn();
				jQuery('.rank_list2').fadeOut();
			}else{
				jQuery('.rank_list2').fadeIn();
				jQuery('.rank_list1').fadeOut();				
			}
		});
		var slide_op={
			isSliding:false
		}
		jQuery('.live_ar_r').click(function(){
			if(slide_op.isSliding){
				return false;
			}
			slide_op.isSliding=true;
			jQuery('.live_ar_l').show();
			var slide=jQuery('.live_slide');
			var length=slide.find('.live_list').length;
			var leftval=Math.abs(parseInt(slide.css('left')));
			if(leftval/530 == length-2){
				jQuery(this).hide();
			}
			jQuery('.live_bul span').each(function(){
				jQuery(this).removeClass('on');
			});
			jQuery('.live_bul span').eq(leftval/530+1).addClass('on');
			slide.animate({left:'-=530px'},800,'easeInOutQuint');
			setTimeout(function(){slide_op.isSliding=false},820);
			return false;
		});
		jQuery('.live_ar_l').click(function(){
			if(slide_op.isSliding){
				return false;
			}
			slide_op.isSliding=true;
			jQuery('.live_ar_r').show();
			var slide=jQuery('.live_slide');
			var length=slide.find('.live_list').length;
			var leftval=Math.abs(parseInt(slide.css('left')));
			if(leftval/530 == 1){
				jQuery(this).hide();
			}
			jQuery('.live_bul span').each(function(){
				jQuery(this).removeClass('on');
			});
			jQuery('.live_bul span').eq(leftval/530-1).addClass('on');
			slide.animate({left:'+=530px'},800,'easeInOutQuint');
			setTimeout(function(){slide_op.isSliding=false},820);
			return false;
		});
	}
}());

var bg_location=0; //롤링
var is_rolling=false;  //클릭제한 변수
var is_cursor_inner=false;  //마우스포인터가 위로 올라왔을때 롤링 작동 판단


function language_btn(){
	if(document.getElementById("language").style.display=="none"){
	   document.getElementById("language").style.display='block'
	}
	else{
   document.getElementById("language").style.display='none'
	}
}

/* 
	fn_autoSlideVisual 함수 
	- fn_visualAction함수를 n초 간격으로 무한호출

*/
function fn_autoSlideVisual(){
	this.setInterval('fn_visualAction()',4000);
}

/*
	fn_visualAction 함수
	- visual을 롤링시키는 함수
*/
function fn_visualAction(){
	if(is_cursor_inner){
		is_rolling=false;
		return false;
	}
	is_rolling=true;
	var visual_image_list=new Array();
	var visual_list=new Array();
	var current_index; //현재 보여지는 visual이미지의 index번호
	visual_image_list=jQuery('.visual_wrap').find('div'); //visual 이미지리스트
	visual_list=jQuery('.visual_list').find('li'); //visual 제목리스트 (이미지수와 무조건 같아야한다)
	setListWidth(visual_list.length); //visual_list ul의 가로값을 반영

	jQuery(visual_image_list).each(function(){ //현재 보여지는 list객체의 index번호를 가져온다
	if(jQuery(this).css('display')=='block')
		current_index=jQuery(this).index();
	});

	if(current_index==visual_list.length-1){ //마지막 이미지일때
		jQuery('.visual_list ul').animate({ 
			left:'0'
		},300);
		jQuery(visual_image_list).each(function(){  //현재 보이는이미지와 다음에 보여질이미지빼고 전부 숨긴다.
			if(jQuery(this).index()==jQuery(visual_list[current_index]).index()){
			}else{
				jQuery(this).hide();
			}
		});
		jQuery(visual_list).each(function(){  //visual_list li에 on class가 설정이 돼있으면 없앤다.
			if(jQuery(this).attr('class')!=undefined || jQuery(this).attr('class')!='')
			jQuery(this).removeClass('on');
		});
		bg_location=0; //
		jQuery('.visual_list_bg').animate({
			left:'2000px'
		},1);
		this.setTimeout(function(){
			jQuery('.visual_list_bg').css('left','-300px').animate({
				left:0
			},400);
		},150);
		jQuery(visual_list[0]).addClass('on')
		jQuery(visual_image_list[visual_image_list.length-1]).fadeOut(400);
		jQuery(visual_image_list[0]).fadeIn(400);
		jQuery('div.visual_right').find('a').removeClass('disable_visual');
		jQuery('div.visual_right').css({opacity:1});
		jQuery('div.visual_left').find('a').addClass('disable_visual');
		jQuery('div.visual_left').css({opacity:0.5});

	}else{

		jQuery(visual_image_list).each(function(){
			if(jQuery(this).index()==jQuery(visual_list[current_index]).index() || jQuery(this).index()==jQuery(visual_list[current_index+1]).index()){
			}else{
				jQuery(this).hide();
			}
		});
		jQuery(visual_list).each(function(){
			if(jQuery(this).attr('class')!=undefined || jQuery(this).attr('class')!='')
			jQuery(this).removeClass('on');
		});
		
		for (var i = 0; i <visual_list.length; i++ ){

			if(jQuery(visual_list[i]).index() == current_index){

				if ( i > 1 && (i-2)==bg_location){
					jQuery('.visual_list ul').animate({
						left: ((i - 1) * -300)+"px"
					},300);
					bg_location=bg_location+1;
					this.visualBg(2);
				}else{
					this.visualBg((current_index+1)-bg_location);
				}
				jQuery(visual_list[i+1]).addClass('on');
				jQuery(visual_image_list[i+1]).fadeIn(400);
				jQuery(visual_image_list[i]).fadeOut(400);

			}
		}
		if(current_index+1==visual_list.length-1){
			jQuery('div.visual_right').css({
				opacity:0.5
			});
			jQuery('div.visual_right').find('a').addClass('disable_visual');
		}
		
		if(current_index==jQuery(visual_list[0]).index()){
			jQuery('div.visual_left').css({
				opacity:1
			});
			jQuery('div.visual_left').find('a').removeClass('disable_visual');
		}
	}/*마지막이미지일때 if end*/
	this.setTimeout(function(){is_rolling=false;},400);
}

function fn_visualListClick(obj){
	if(is_rolling){
		return false;
	}
	is_rolling=true;
	var visual_image_list=new Array();
	var visual_list=new Array();
	var current_index;
	visual_image_list=jQuery('.visual_wrap').find('div');
	visual_list=jQuery('.visual_list').find('li');
	setListWidth(visual_list.length); //visual_list ul의 가로값을 반영

	jQuery(visual_image_list).each(function(){
		if(jQuery(this).css('display')=='block'){
			current_index=jQuery(this).index();
		}
	});

	if(current_index==jQuery(obj).index()){
		return false;
	}

	var index_num=jQuery(obj).index();
	jQuery(visual_image_list).each(function(){
		if(jQuery(this).index()==jQuery(visual_image_list[current_index]).index()){
		}else{
			jQuery(this).hide();
		}
	});
	jQuery(visual_list).each(function(){
		if(jQuery(this).attr('class')!=undefined || jQuery(this).attr('class')!='')
		jQuery(this).removeClass('on');
	});
	jQuery(visual_image_list[index_num]).fadeIn(400);
	jQuery(visual_image_list[current_index]).fadeOut(400);
	jQuery(visual_list[index_num]).addClass('on');
	this.visualBg(index_num-bg_location);

	if(index_num==visual_list.length-1){
		jQuery('div.visual_right').css({
			opacity:0.5
		});
		jQuery('div.visual_right').find('a').addClass('disable_visual');
	}else{
		jQuery('div.visual_right').css({
			opacity:1
		});
		jQuery('div.visual_right').find('a').removeClass('disable_visual');
	}

	if(index_num==jQuery(visual_list[0]).index()){
		jQuery('div.visual_left').css({
			opacity:0.5
		});
		jQuery('div.visual_left').find('a').addClass('disable_visual');
	}else{
		jQuery('div.visual_left').css({
			opacity:1
		});
		jQuery('div.visual_left').find('a').removeClass('disable_visual');
	}
	this.setTimeout(function(){is_rolling=false;},400);
	
}

function fn_visualLeft(){
	if(is_rolling){
		return false;
	}
	is_rolling=true;
	var visual_image_list=new Array();
	var visual_list=new Array();
	var current_index;
	visual_image_list=jQuery('.visual_wrap').find('div');
	visual_list=jQuery('.visual_list').find('li');
	setListWidth(visual_list.length); //visual_list ul의 가로값을 반영		
	jQuery(visual_image_list).each(function(){
		if(jQuery(this).css('display')=='block'){
			current_index=jQuery(this).index();
		}
	});
	if(current_index==jQuery(visual_list[0]).index()){
		return false;
	}else{
		jQuery(visual_image_list).each(function(){
			if(jQuery(this).index()==jQuery(visual_list[current_index]).index() || jQuery(this).index()==jQuery(visual_list[current_index-1]).index()){
			}else{
				jQuery(this).hide();
			}
		});
		jQuery(visual_list).each(function(){
			if(jQuery(this).attr('class')!=undefined || jQuery(this).attr('class')!='')
			jQuery(this).removeClass('on');
		});
		for (var i = 0; i <visual_list.length; i++ ){

			if(jQuery(visual_list[i]).index() == current_index){

				if ( i > 0 && i==bg_location){
					jQuery('.visual_list ul').animate({
						left:"+=300px"
					},300);
					bg_location=bg_location-1;
				}else{
					this.visualBg((current_index-1)-bg_location);
				}

				jQuery(visual_list[i-1]).addClass('on');
				jQuery(visual_image_list[i-1]).fadeIn(400);
				jQuery(visual_image_list[i]).fadeOut(400);

			}
		}
		if(current_index-1==jQuery(visual_list[0]).index()){
			jQuery('div.visual_left').css({
				opacity:0.5
			});
			jQuery('div.visual_left').find('a').addClass('disable_visual');
		}
		if(current_index==visual_list.length-1){
			jQuery('div.visual_right').css({
				opacity:1
			});
			jQuery('div.visual_right').find('a').removeClass('disable_visual');
		}
	}
	this.setTimeout(function(){is_rolling=false;},200);
	
}

function fn_visualRight(){
	/*is_rolling if문 start*/
	if(is_rolling){
		return false;	
	}
	is_rolling=true;
	var visual_image_list=new Array();
	var visual_list=new Array();
	var current_index;
	visual_image_list=jQuery('.visual_wrap').find('div');
	visual_list=jQuery('.visual_list').find('li');
	setListWidth(visual_list.length); //visual_list ul의 가로값을 반영	
	jQuery(visual_image_list).each(function(){
		if(jQuery(this).css('display')=='block')
			current_index=jQuery(this).index();
	});
	/*마지막페이지일때 if문 start*/
	if(current_index==visual_list.length-1){
		return false;
	}else{
		jQuery(visual_image_list).each(function(){
			if(jQuery(this).index()==jQuery(visual_list[current_index]).index() || jQuery(this).index()==jQuery(visual_list[current_index+1]).index()){
			}else{
				jQuery(this).hide();
			}
		});
		jQuery(visual_list).each(function(){
			if(jQuery(this).attr('class')!=undefined || jQuery(this).attr('class')!='')
			jQuery(this).removeClass('on');
		});
		for (var i = 0; i <visual_list.length; i++ ){

			if(jQuery(visual_list[i]).index() == current_index){

				if ( i > 1 && (i-2)==bg_location){
					jQuery('.visual_list ul').animate({
						left:'-=300+px'
					},300);
					bg_location=bg_location+1;
				}else{
					this.visualBg((current_index+1)-bg_location);
				}
				jQuery(visual_list[i+1]).addClass('on');
				jQuery(visual_image_list[i+1]).fadeIn(400);
				jQuery(visual_image_list[i]).fadeOut(400);

			}
		}
		if(current_index+1==visual_list.length-1){
			jQuery('div.visual_right').css({
				opacity:0.5
			});
			jQuery('div.visual_right').find('a').addClass('disable_visual');
		}
		if(current_index==jQuery(visual_list[0]).index()){
			jQuery('div.visual_left').css({
				opacity:1
			});
			jQuery('div.visual_left').find('a').removeClass('disable_visual');
		}
	}/*마지막페이지일때 if문 end*/
	this.setTimeout(function(){is_rolling=false;},300);
}


 function visualBg(num){
 	jQuery('.visual_list_bg').animate({
		left:num*300+'px'
	},400);
 }

 function setListWidth(numb){
	jQuery('.visual_list ul').css('width',(numb*300)+'px'); //visual_list ul의 가로값을 반영	
 }

function fn_closeBanner(){

	setTimeout(function(){
		jQuery('div.top_banner').animate({
			top:'-90px'
		},500);
		jQuery('div#wrap').animate({
			paddingTop:'0'
		},500);
		jQuery('div#quick').animate({
			top:'83px'
		},500);
	},100);		


}

jQuery(document).ready(function(){
	
	if (jQuery('div.top_banner').length == 0) {
		return;
	}
	jQuery('#visual').hover(function(){
		is_cursor_inner=true;
	},function(){
		is_cursor_inner=false;	
	});

	setTimeout(function(){
		jQuery('div.top_banner').animate({
			top:'0'
		},100);
		jQuery('div#wrap').animate({
			paddingTop:'90px'
		},100);
		jQuery('div#quick').animate({
			top:'173px'
		},300);

	},1000);
	
	

});