
var pageViewAction;
var pageListAction;
var pageGateFn;

function getParams() {
	var param = new Array();
 
	var url = decodeURIComponent(location.href);
	url = decodeURIComponent(url);
 
	var params;

	params = url.substring( url.indexOf('?')+1, url.length );
	params = params.split("&");

	var size = params.length;
	var key, value;

	for(var i=0 ; i < size ; i++) {
		key = params[i].split("=")[0];
		value = params[i].split("=")[1];
		param[key] = value;
	}

	return param;
}

;(function($){

	var param = getParams();	

	
	pageGateFn =function(){

		if( param["ct"] ){
			
			if($('.clt_view #'+param["ct"]+'_view').attr('id')){
				$('.clt_view').show();
				setTimeout(function(){
					$('.clt_view #'+param["ct"]+'_view').fadeIn();				
				},1000);				
			}else{
				setTimeout(function(){
					$('.clt_list').fadeIn();
				},300);
				
			}
		}else{
			setTimeout(function(){
				$('.clt_list').fadeIn();
			},300);
		} 
	}	

	pageViewAction = function(ct){		
		//changeDomain(ct);
		jQuery("html, body").animate({scrollTop:200},1);
		$('.clt_view').children('div').hide();
		$('.clt_view #'+ct+'_view').fadeIn();
		$('.clt_view').fadeIn();
		$('.clt_list').hide();
		$('.clt_list li .layerbox').hide();
	}

	pageListAction = function(){
		//changeDomain('main');
		jQuery("html, body").animate({scrollTop:200},1);
		$('.clt_view').hide();
		$('.clt_list').fadeIn();
		setTimeout(function(){
			$('.clt_view').children('div').hide();		
		},1000);
	}

	
	function changeDomain(ct){
		var url = decodeURIComponent(location.href);
		url = decodeURIComponent(url);	

		if(url.substring( 0, url.indexOf('?')) == '') url = url;
		else url = url.substring( 0, url.indexOf('?'));
		
		if(ct == 'main'){
			//$(location).attr('assign',url);
			location.href.replace("object or string", "�Ƶ�ٽ�",url);
		} else{
			url = url+'?ct='+ct;
			//$(location).attr('assign',url);
			location.href.replace("object or string", "�Ƶ�ٽ�",url);
		}
	}
	

	$.fn.cltSlider = function(ops){
		var $this = $(this);
		var idx = 0;
		var timer;
		var o = $.extend({
			sd:$this.find('.clt_slider').find('ul'),
			li:$this.find('.clt_slider').find('ul').find('li'),
			btn_pv : $this.find('.clt_slider_util').find('.prev'),
			btn_nt : $this.find('.clt_slider_util').find('.next'),
			num : $this.find('.num'),
			tm:5000,
			v:910
		},ops);

		return $(this).each(function(){	

			o.btn_nt.bind('click',function(){
				if( idx+1 == o.li.length ) return false;
				idx = idx+1;
				num = '';
				if(idx+1 < 10) num = '0'+(idx+1)+'/';
				else num = (idx+1)+'/';
				
				o.sd.stop();
				o.num.find('strong').text(num);
				o.sd.animate({
					left:o.v*idx*-1+'px'
				},1000,'easeInOutQuart');
				return false;
			});
 
			o.btn_pv.bind('click',function(){
				if( idx+1 == 1 ) return false;				
				idx = idx-1;
				num = '';
				if(idx+1 < 10) num = '0'+(idx+1)+'/';
				else num = (idx+1)+'/';

				o.sd.stop();
				o.num.find('strong').text(num);
				o.sd.animate({
					left:o.v*idx*-1+'px'
				},1000,'easeInOutQuart');
				return false;
			});

		});

	};
	
	$(document).ready(function(){
		pageGateFn();
		bg_idx = 0;
		bg_arr = $('.clt_background img');

		$('.clt_list li').hover(function(){
			$(this).find('.layerbox').fadeIn();
		},function(){
			$(this).find('.layerbox').fadeOut();		
		});

		setInterval(function(){
			var _prv ;

			if(bg_idx == bg_arr.length-1){
				_prv = bg_idx;
				bg_idx = 0;
			}else{
				_prv = bg_idx;
				bg_idx = bg_idx + 1;
			} 
			bg_arr.eq(_prv).fadeOut(1000);
			bg_arr.eq(bg_idx).fadeIn(1000);
		},5000);
		
	});


})(jQuery);