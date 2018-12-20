
var pageViewAction;
var pageListAction;
var pageGateFn;
var pageViewClose;
var jsonUrl;
var beforeHash = window.location.hash;

function getParams() {
	var lastLen;
 
	var url = decodeURIComponent(location.href);
	url = decodeURIComponent(url);
	lastLen = url.indexOf('?') < 0 ? url.length : url.indexOf('?');  

	return url.substring( url.indexOf('#')+1, lastLen );
}

function setParam(param){
	if(param == 'alert'){
		alert('준비중입니다.');
		return false;
	}
	var p = param !== undefined ? param : '';
	window.location.hash = p;	
	return false;
}

function setHashParam(){
	var param = window.location.hash;
	param = param !== '' ? param.substring(1) : '';
	
	goAction(param);
}

function goAction(param){
	if(param in jsonUrl){
		pageViewAction(param);
	}else{
		pageListAction();		
	}
}

;(function($){	
	function addHashEvent(evt,fn){		
		if(window.addEventListener){
			window.addEventListener(evt,fn,false);
		}else {
			if(window.navigator.appVersion.indexOf('MSIE 7.0') < 0){
				window.attachEvent('on'+evt,fn);
			}else{			
				setInterval(function(){					
					if(beforeHash == window.location.hash) return;
					
					beforeHash = window.location.hash;
					setHashParam();
				},500);
			}
		}		
	}
	
	addHashEvent('hashchange',function(){
		setHashParam();
	});
	
	var param = getParams();	
	jsonUrl = {
		jeremy : '/html/adidas/prm/jeremy.json',
		blue : '/html/adidas/prm/blue.json',
		kazuki : '/html/adidas/prm/kazuki.json',
		ceremony : '/html/adidas/prm/ceremony.json',
		stella : '/html/adidas/prm/stella.json',
		nhood : '/html/adidas/prm/nhood.json',
		spezial : '/html/adidas/prm/spezial.json',
		maryk : '/html/adidas/prm/maryk.json',
		bedwin: '/html/adidas/prm/bedwin.json',
		whiteMT: '/html/adidas/prm/whiteMT.json'
	};
	var ctgr;
	var httpRequest;
	var validParam = false;
		
	pageViewAction = function(ct){
		ctgr = ct;
		getPrmJson ( jsonUrl[ct] , 'view');		
	};

	pageListAction = function(){
		getPrmJson ( '/html/adidas/prm/list.json' , 'list');		
		$('.clt_view').hide();
		$('.clt_list').fadeIn();
	};


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

	function openVideoLayer(videoId){		
		// var videoWidth = ($(window).width() > 1920 ? 960 : $(window).width()/1.3);
		// var videoHeight = ($(window).height() > 1000 ? 500 : $(window).height()/1.3);
		var videoWidth = 950;
		var videoHeight = 550;
		var overlay = '<div id="overlay" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: #000;opacity:0.75;z-index: 900;"></div>'
		var layerElem = '<div id="video_layer" style="width:'+videoWidth+'px;height:'+videoHeight+'px;position: fixed;top:50%;left:50%;margin:'+(videoHeight/2*-1)+'px 0 0 '+(videoWidth/2*-1)+'px;z-index:901;background:#000;"><a class="close" href="javascript:void(0)" style="position:absolute;top: -42px;right: 0;"><img src="/images/adidas/event/sports16/sports16_btn_close.gif" alt="영상 닫기"/></a><iframe width="'+videoWidth+'" height="'+videoHeight+'" src="http://www.youtube.com/embed/'+videoId+'?autoplay=1" frameborder="0" allowfullscreen></iframe></div>'
		$('body').prepend(overlay,layerElem);

		$('#video_layer .close,#overlay').bind('click',closeVideoLayer);
	}


	function closeVideoLayer(){
		$('#overlay').remove();
		$('#video_layer').remove();
	}
	
	$(document).ready(function(){		
		setHashParam();
		bg_idx = 0;
		bg_arr = $('.clt_background img');		

		if(bg_arr.length > 1){
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
		}
			
		
	});
	
	
	function getPrmJson(url , type){
		
		$.ajax({
			type : 'POST',
			url : url,
			dataType:'json',
			success : function(args){
				var ele;				
				if(type == 'view'){
					ele = setViewEle(args);
					$('.clt_list').hide();
					$('.clt_view').fadeIn().html(ele);
					$('#'+ctgr+'_view .clt_slider_wrap').cltSlider();					
					if(!!args.btmArea.video){
						$('.collection_view .video a').bind('click',function(){
							openVideoLayer(args.btmArea.video.videoId);
						});
					}
				}else{							
					ele = setListEle(args);
					
					$('.clt_list>ul').html(ele);
					$('.clt_list li').hover(function(){
						$(this).find('.layerbox').fadeIn();
					},function(){
						$(this).find('.layerbox').fadeOut();		
					});				
				}
				
				jQuery("html, body").animate({scrollTop:200},1);
				
				
			},
			error : function(e){
				console.log(e.responseText);
			}
		});	
		
	}
	
	function setViewEle(obj){
		
		var blk = ' target="_blank"';
		var click = ' href';
		
		var element = '<div id="'+ctgr+'_view" class="collection_view">';
		element += '	<a href="#" class="view_close clt_bg" onclick="setParam();return false;">닫기</a>';
		element += '	<div class="section1">';
		element += '		<h4><img src="'+obj.topArea.logo+'" alt="'+obj.topArea.name+'"/></h4>';
		element += '		<h5>'+obj.topArea.name+'</h5>';
		element += '		<p class="season">'+obj.topArea.season+'</p>';
		element += '		<div class="desc"><img src="'+obj.topArea.desc+'" alt=""/></div>';
		element += '		<a href="'+obj.topArea.link+'"><span class="clt_bg">컬렉션 바로가기</span></a>';
		element += '	</div>';
		element += '	<div class="section2">';
		element += '		<h6>lookbook</h6>';
		element += '		<div class="clt_slider_wrap">';
		element += '			<div class="clt_slider">';		
		element += '				<ul><li><img src="';
		element += obj.midArea.lookbook.join('" alt=""/></li><li><img src="');
		element += '" alt=""/></li></ul>';
		element += '			</div>';
		element += '			<div class="clt_slider_util">';
		element += '				<a href="#" class="clt_bg prev"></a>';
		element += '				<a href="#" class="clt_bg next"></a>';
		element += '				<div class="num">';
		element += '					<strong>01/</strong>';
		element += '					<span>'+(obj.midArea.lookbook.length >= 10 ? obj.midArea.lookbook.length : '0'+obj.midArea.lookbook.length)+'</span>';
		element += '				</div>';
		element += '			</div>';
		element += '		</div>';
		element += '	</div>';				
		element += '	<div class="section3">';
		if(!!obj.btmArea.video){			
			element += '		<div class="video"><img src="'+obj.btmArea.video.image+'"/><a href="javascript:void(0)" class="clt_bg">동영상 보러가기</a></div>';
		}		
		element += '		<div class="bnn"><a href="'+obj.btmArea.banner.link+'"><img src="'+obj.btmArea.banner.image+'"/></a></div>';
		element += '	</div>';
		element += '</div>';
		return  element;
		
	}
	
	function setListEle(obj){
		var objAry = obj.list;
		var attr = '';		
		var element = '';

		for(var i = 0; objAry.length > i; i++){			
			if(i%2 == 0) {
				attr = 'pst_lf';
			}else{
				attr = '';
			}
			element +='<li class="'+objAry[i].ctgr+' '+attr+'">';
			element +='		<div class="layerbox">';
			element +='			<div class="label" style="background-image:url('+objAry[i].label+');"></div>';
			element +='			<div class="info">';
			
			if(objAry[i].descCss){
				var css = ' style="'+objAry[i].descCss+'"';
			}else{
				var css = '';
			}
			
			element +='				<p class="smr"'+css+'><img src="'+objAry[i].desc+'" alt=""/></p>';
			//element +='				<div class="btn"><a href="#" class="clt_bg more" onclick="pageViewAction(\''+objAry[i].ctgr+'\');return false;">show more info</a><a href="'+objAry[i].link+'" class="clt_bg shop">show now</a></div>';
			element +='				<div class="btn"><a href="#" class="clt_bg more" onclick="setParam(\''+(objAry[i].isViewUnready ?  'alert' : objAry[i].ctgr)+'\');return false;">show more info</a><a href="'+objAry[i].link+'" class="clt_bg shop">show now</a></div>';
			element +='				<p class="date">'+objAry[i].date+'</p>';
			element +='			</div>';
			element +='		</div>';
			element +='		<div class="poster"><img src="'+objAry[i].poster+'" alt=""/></div>';
			element +='		<div class="desc">';
			element +='			<h4 class="label" style="background-image:url('+objAry[i].label+')">'+objAry[i].title+'</h4>';
			element +='			<div class="info">';
			element +='				<p class="tit">'+objAry[i].title+'</p>';
			element +='				<div class="data">';
			element +='					<p class="count">';
			element +='						<span>'+objAry[i].imgsLength+' images</span>';
			element +='						<span>|</span>';
			element +='						<span>'+objAry[i].moviesLength+' Movie</span>';
			element +='					</p>';
			element +='					<p class="date"><span>'+objAry[i].date+'</span></p>';
			element +='				</div>';
			element +='			</div>';
			element +='		</div>';
			element +='</li>';			
		}
		
		return element; 
	}


})(jQuery);