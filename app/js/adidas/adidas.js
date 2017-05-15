var tabval=0;
var openMiPopup;

(function setApp(){
	var ua = navigator.userAgent;
	var isIE = ua.search(/MSIE/) > -1 ? true : false;

	if(!isIE){
		isIE = ua.search(/Trident/) > -1 ? true : false;
	}

	if(ua.search(/Chrome/) > -1){
		jQuery('html').addClass('chrome');
	}

	if(isIE){
		var isIEUnder9v = ua.match(/(?:MSIE\s)(\d+).\d/) && ua.match(/(?:MSIE\s)(\d+).\d/)[1] < 9;
		var ieVersion = isIEUnder9v != undefined ? ua.match(/(?:MSIE\s)(\d+).\d/)[1] : false;
		if(!ieVersion){
			ieVersion = 11;
		}
		jQuery('html').addClass('ie ie'+ieVersion);
		if(isIEUnder9v){
			jQuery('html').addClass('old_ie');
		}
	}
})();

function openModalVideoViewer(ytbId , width , height){
	var videoWidth = width == undefined ? 950 : width;
	var videoHeight = height == undefined ? 500 : height;
	var popupMarginProp = 'margin:-'+(videoHeight/2)+'px 0 0 -'+(videoWidth/2)+'px';

	var htmlString = '<div id="video-modal-popup">';
		htmlString += '	<div class="overlay"></div>';
		htmlString += '	<div class="popup" style="'+popupMarginProp+'">';
		htmlString += '		<a href="javascript:void(0)" class="close spt_bg"></a>';
		htmlString += '		<iframe class="video" id="main_video" frameborder="0" allowfullscreen="1" title="YouTube video player" width="'+videoWidth+'" height="'+videoHeight+'" src="https://www.youtube.com/embed/'+ytbId+'?rel=0&autoplay=1"></iframe>'
		htmlString += '	</div>';
		htmlString += '</div">';

	jQuery('body').prepend(htmlString);
	jQuery('#video-modal-popup .overlay').click(function(){
		jQuery('#video-modal-popup').remove();
	});

	jQuery('#video-modal-popup .close').click(function(){
		jQuery('#video-modal-popup').remove();
	});

}

function fn_closeBanner(){
	fn_setCookie('top_bnn','close',1);
	jQuery('.top_bnn').animate({height:'0'});
}

function slideLeftAction(idx,preidx){
	var listObj=jQuery('ul li.lf_dep1');
	jQuery(listObj[preidx]).children('a').removeClass('on');
	jQuery(listObj[preidx]).find('div.lfmenu_depth2').slideUp();
	jQuery(listObj[idx]).children('a').addClass('on');
	jQuery(listObj[idx]).find('div.lfmenu_depth2').slideDown();
}

function slideLeftMenu(obj,isCategory){
	var o=jQuery(obj);
	var idx=jQuery('li.lf_dep1').index(o.parent(".lf_dep1"));
	var curOn;
	var listObj=jQuery('ul li.lf_dep1');
	var ctgr_idx=0;

	if(isCategory){

		listObj.each(function(){
			if( jQuery(this).find('div.lfmenu_depth2').hasClass('category_depth2')){
				ctgr_idx=ctgr_idx+1;
				if(jQuery(this).children('a').hasClass('on')){
					curOn=jQuery(this).index();
				}
			}
		});

		if(curOn==idx){
			jQuery(listObj[idx]).children('a').removeClass('on');
			jQuery(listObj[idx]).children('div.lfmenu_depth2').slideUp();
		}else{
			slideLeftAction(idx,curOn);
		}


	}else{


		if(jQuery(listObj[idx]).children('a').hasClass('on')){
			jQuery(listObj[idx]).children('a').removeClass('on');
			jQuery(listObj[idx]).children('div.lfmenu_depth2').slideUp();
		}else{
			slideLeftAction(idx,curOn);
		}
	}
}

function layerOverNavi(o){
	jQuery(o).find('.depth2').show();
}

function layerOutNavi(o){
	jQuery(o).find('.depth2').hide();
}

function quickLayerOpen(){
	jQuery('.layer_bg').css({
		height:jQuery(document).height()+'px',
		opacity:0.6
	});
	jQuery('.layer_bg').fadeIn(200);
	setTimeout(function(){
		jQuery('.quickview_layer').fadeIn();
	},200);
}

function quickLayerClose(){
	jQuery('.quickview_layer').fadeOut();
	setTimeout(function(){
		jQuery('.layer_bg').fadeOut();
	},100);
}

function openLayer(oid,w,h){
	setTimeout(function(){
		jQuery('.layer_bg').css({
			height:jQuery(document).height()+'px',
			opacity:0.6
		});
		jQuery('.layer_bg').fadeIn();

	},500);

	o=jQuery('#'+oid);
	o.css({
		width:w+'px',
		height:h+'px',
		marginLeft:-1*(w/2+15)+'px',
		marginTop:-1*(h/2+15)+'px'
	});
    setTimeout(function(){
        o.fadeIn();
    },500);
}

function closeLayer(o,t){
	jQuery('#'+o).fadeOut();
	if (t==1 && (o=='notice_layer_pop' || (o!='notice_layer_pop' && jQuery('#notice_layer_pop').css('display')!='block'))) {
		setTimeout(function(){
			jQuery('.layer_bg').fadeOut();
		},100);
	}
	return false;
}


function blurAction(obj,moveId,dir,obj2){
	if(dir == 0){ /* just use the tab key */
		if(tabval == 1){
			jQuery(obj).attr('tabIndex','0');
			return;
		}else{
			jQuery('#'+moveId).attr('tabIndex','-1');
			jQuery('#'+moveId).focus();
			if(obj2){;
				jQuery(obj).attr('tabIndex','0');
			}
			return false;
		}
	}else{ /* just use the tab key */
		if(tabval == 0){
			jQuery(obj).attr('tabIndex','0');
			return;
		}else{
			jQuery('#'+moveId).attr('tabIndex','-1');
			jQuery('#'+moveId).focus();
			if(obj2){
				jQuery(obj).attr('tabIndex','0');
			}
			return false;
		}
	}

}


(function($){
	$.fn.adislider=function(options){
		var obj=$(this);
		var config=$.extend({
			slidewrap:null,
			useArrow:false,
			autoRolling:false,
			controlEle:null,
			moveValue:0,
			loopStyle:false
		},options);

		if($(this).find(options.slidewrap).find(options.slideBox).length <= 1){
			return false;
		}

		this.each(function(){
			var _setTimeId;
			var _commonMethod={
				loopActionInit:
					function(){
						var clone_box=obj.find(config.slidewrap).find(config.slideBox).eq(0).clone();
						obj.find(config.slidewrap).append(clone_box);
					},

				actionSliding:
					function(o,idx,val){
						o.stop();
						if($(config.titleElement).attr('id')!=undefined ){
							changeTitle(idx);
						}
						o.animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
					},
				changeCtrl:
					function(idx){
						_sliderObj.controller.find(config.controlObj).each(function(){
							$(this).removeClass('on');
						});
						_sliderObj.controller.find(config.controlObj).eq(idx).addClass('on');
					},
				autoRolling:
					function(time){
						_setTimeId=setInterval(function(){

							if(_sliderObj.nowidx == _sliderObj.contentsLength-1){
								if(config.useArrow){
									$(_sliderObj.leftBtn).addClass('disable');
									$(_sliderObj.rightBtn).removeClass('disable');
								}
								_sliderObj.nowidx=0;
								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
							}else{

								_sliderObj.nowidx=_sliderObj.nowidx+1;

								if(config.useArrow){
									if(_sliderObj.nowidx==_sliderObj.contentsLength-1){
										$(_sliderObj.rightBtn).addClass('disable');
									}else{
										$(_sliderObj.leftBtn).removeClass('disable');
										$(_sliderObj.rightBtn).removeClass('disable');
									}
								}

								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
							}
						},time);
					},
				autoRollingStop:
					function(){
						clearInterval(_setTimeId);
					},
				loopActionSliding:
					function(o,idx,fakeidx,val){
						o.stop();
						if(!fakeidx) o.css({left:0});
						if($(config.titleElement).attr('id')!=undefined ) changeTitle(idx);

						if(idx==_sliderObj.controller.find(config.controlObj).length-1){
							o.css({left:(-1*val*fakeidx)+'px'}).animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
						}else if(idx==0){
							o.animate({left:(-1*val*fakeidx)+'px'},config.speed,config.easing);
						}else{
							o.animate({left:(-1*val*idx)+'px'},config.speed,config.easing);
						}
					},
				loopAutoSliding:
					function(time){
						_setTimeId=setInterval(function(){
							var fakeidx=_sliderObj.contentsLength-1;
							if(_sliderObj.nowidx==fakeidx-1){
								_sliderObj.nowidx=0;
								_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
								_commonMethod.changeCtrl(_sliderObj.nowidx);
							}else if(_sliderObj.nowidx==0){
								_sliderObj.nowidx=_sliderObj.nowidx+1;
								_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);
								_commonMethod.changeCtrl(_sliderObj.nowidx);
							}else{
								_sliderObj.nowidx=_sliderObj.nowidx+1;
								_commonMethod.changeCtrl(_sliderObj.nowidx);
								_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
							}

						},time);
					}
			}
			/* __commonMethod Object */

			if(config.loopStyle) _commonMethod.loopActionInit();

			var _sliderObj={
				slider:obj.find(config.slidewrap),
				controller:obj.find(config.controlWrap),
				nowidx:0,
				leftBtn:config.useArrow ? obj.find(config.leftMove) : false,
				rightBtn:config.useArrow ? obj.find(config.rightMove) : false,
				contentsLength:obj.find(config.slideBox).length
			}
			/* _sliderObj Object */

			/* loopstyle initial */

			if(config.autoRolling && config.loopStyle){
				_commonMethod.loopAutoSliding(5000);
				if(config.autoControl){
					obj.find(config.autoControl).bind('click',function(){
						if($(this).hasClass('pause')){
							_commonMethod.autoRollingStop();
							$(this).attr('class','play');
						}else{
							_commonMethod.loopAutoSliding(5000);
							$(this).attr('class','pause');
						}
						return false;
					});
				}else{
					obj.hover(function(){
						_commonMethod.autoRollingStop();
					},function(){
						_commonMethod.loopAutoSliding(5000);
					});
				}
			}
			/* ------------------------------- loopstyle and auto rolling -------------------------------*/


			if(config.autoRolling && !config.loopStyle){
				_commonMethod.autoRolling(5000);
				if(config.autoControl){
					obj.find(config.autoControl).bind('click',function(){
						if($(this).hasClass('pause')){
							_commonMethod.autoRollingStop();
							$(this).attr('class','play');
						}else{
							_commonMethod.autoRolling(5000);
							$(this).attr('class','pause');
						}
						return false;
					});
				}else{
					obj.hover(function(){
						_commonMethod.autoRollingStop();
					},function(){
						_commonMethod.autoRolling(5000);
					});
				}

			}
			/* ------------------------------- not loopstyle and auto rolling -------------------------------*/

			$(_sliderObj.leftBtn).bind('click',function(){
				if(config.loopStyle){
					var fakeidx=_sliderObj.contentsLength-1;
					if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.controller.find(config.controlObj).length-1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,fakeidx,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.nowidx-1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else{
						_sliderObj.nowidx=_sliderObj.nowidx-1;
						_commonMethod.changeCtrl(_sliderObj.nowidx);
						_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
					}
				}else{
					if(_sliderObj.nowidx == 0) return false;
					if(_sliderObj.nowidx == 1) $(this).addClass('disable');
					$(_sliderObj.rightBtn).removeClass('disable');
					_sliderObj.nowidx=_sliderObj.nowidx-1;
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
				}
				return false;
			});

			$(_sliderObj.rightBtn).bind('click',function(){
				if(config.loopStyle){
					var fakeidx=_sliderObj.contentsLength-1;
					if(_sliderObj.nowidx==fakeidx-1){
						_sliderObj.nowidx=0;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else if(_sliderObj.nowidx==0){
						_sliderObj.nowidx=_sliderObj.nowidx+1;
						_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);
						_commonMethod.changeCtrl(_sliderObj.nowidx);
					}else{
						_sliderObj.nowidx=_sliderObj.nowidx+1;
						_commonMethod.changeCtrl(_sliderObj.nowidx);
						_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
					}
				}else{
					if(_sliderObj.nowidx == _sliderObj.contentsLength-1) return false;
					if(_sliderObj.nowidx == _sliderObj.contentsLength-2) $(this).addClass('disable');
					$(_sliderObj.leftBtn).removeClass('disable');
					_sliderObj.nowidx=_sliderObj.nowidx+1;
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
				}
				return false;
			});

			$(obj.find(config.controlWrap).find(config.controlObj)).bind('click',function(){
				if(_sliderObj.nowidx == $(this).index()) return false;

				if(config.loopStyle && _sliderObj.nowidx==_sliderObj.controller.find(config.controlObj).length-1 && $(this).index()==0){
					_sliderObj.nowidx=$(this).index();
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){

						}else{
							obj.find(config.autoControl).trigger('click');
						}
					}

				}else if(config.loopStyle && _sliderObj.nowidx==0 && $(this).index()==_sliderObj.controller.find(config.controlObj).length-1){
					_sliderObj.nowidx=$(this).index();
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,_sliderObj.controller.find(config.controlObj).length,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){

						}else{
							obj.find(config.autoControl).trigger('click');
						}
					}

				}else if(config.loopStyle && _sliderObj.nowidx==0){
					_sliderObj.nowidx=$(this).index();
					_commonMethod.loopActionSliding(_sliderObj.slider,_sliderObj.nowidx,null,config.moveValue);
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){

						}else{
							obj.find(config.autoControl).trigger('click');
						}
					}
				}else{
					_sliderObj.nowidx=$(this).index();
					_commonMethod.changeCtrl(_sliderObj.nowidx);
					if(config.autoRolling){
						if(obj.find(config.autoControl).hasClass('play')){

						}else{
							obj.find(config.autoControl).trigger('click');
						}
					}
					if(!config.loopStyle){
						if(_sliderObj.nowidx == 0 && config.useArrow){
							$(_sliderObj.leftBtn).addClass('disable');
							$(_sliderObj.rightBtn).removeClass('disable');
						}else if(_sliderObj.nowidx == _sliderObj.contentsLength-1 && config.useArrow){
							$(_sliderObj.rightBtn).addClass('disable');
							$(_sliderObj.leftBtn).removeClass('disable');
						}else if(_sliderObj.contentsLength-1>_sliderObj.nowidx>0 && config.useArrow){
							$(_sliderObj.leftBtn).removeClass('disable');
							$(_sliderObj.rightBtn).removeClass('disable');
						}
					}
					_commonMethod.actionSliding(_sliderObj.slider,_sliderObj.nowidx,config.moveValue);
				}
				return false;
			});

			$(obj.find(config.controlWrap).find(config.controlObj)).bind('mousedown',function(){
				if(_sliderObj.nowidx == $(this).index()) return false;
				$(this).css({marginTop:'1px'});
			}).bind('mouseup',function(){
				$(this).css({marginTop:'0px'});
			});

			function changeTitle(idx){
				$(config.titleElement).text(config.titleList[idx]);
				//var _txt=obj.find(config.slideBox).eq(idx).find('.visual_title').text();
				//obj.find('.visual_util h3').text(_txt);
			}

		});
	}
	openMiPopup = function(popData){
		var html = '<div id="overlay" style="height:'+$(window).height()+'px;"></div>';
		html += '<div id="mi_adidas_pop">';
		html += '	<a href="#" class="close"></a>';
		html += '	<h1>'+popData.title+'</h1>';
		html += '	<div class="desc">'+popData.desc+'</div>';
		html += '	<div class="btn_area">';
		html += '		<a href="#"><span>'+popData.btnText+'</span></a>	';
		html += '	</div>';
		html += '</div>';
		$('body').prepend(html);

		var popWidth = popData.width !== undefined ? popData.width : 350;
		var popHeight = popData.height !== undefined ? popData.height : 220;

		$('#mi_adidas_pop').css({
			width : popWidth,
			height : popHeight,
			marginTop : (popHeight+100)/2*-1+'px',
			marginLeft :(popWidth+90)/2*-1+'px'
		});

		setTimeout(function(){
			$('#mi_adidas_pop').show();
		},10);

		$('#mi_adidas_pop .close').bind('click',closeMiPop);
		$('#overlay').bind('click',closeMiPop);
		$('#mi_adidas_pop .btn_area a').bind('click',closeMiPop);

		function closeMiPop(){
			$('#mi_adidas_pop').remove();
			$('#overlay').remove();
			return false;
		}
	};

	/**
	* Swiper
	* Image Slider
	* @param {Object} options
			 width
			 loop
			 auto
			 duration
			 easing
			 autoDuration

	*/
	$.fn.Swipers = function(_options){

		var wrapperElem = $(this);
		var sliderElem = wrapperElem.children();
		var itemElems = sliderElem.children();

		var defaultOptions = {
			width : $(itemElems[0]).get(0).clientWidth,
			height : $(itemElems[0]).get(0).clientHeight,
			loop : false,
			auto : false,
			autoTime : _options.auto ? 3000 : false,
			dragable : false,
			easing : false,
			duration : 800,
			autoDuration : 800
		};
		var options = $.extend(defaultOptions,_options);
		if(options.auto && !options.loop){
			options.loop = true;
		}

		var index = 0;
		var prevIdx = -1;
		var length = itemElems.length;
		var moveValue = !!options.moveValue ? options.moveValue : options.width;

		var autoTimer;
		var isAnimating = false;

		function init(){

			if(options.loop){
				sliderElem.prepend($(itemElems[itemElems.length-1]).clone());
				sliderElem.append($(itemElems[0]).clone());
				itemElems =  sliderElem.children();
			}

			if(options.easing && !$.easing[options.easing]){
				options.easing = false;
			}

			wrapperElem.css({
				width : options.width,
				height : options.height,
				position : 'relative',
				overflow : 'hidden'
			});

			sliderElem.css({
				width : options.loop ? (itemElems.length + 2) * moveValue : itemElems.length * moveValue,
				height : options.height,
				position : 'absolute',
				overflow : 'hidden',
				left : options.loop ? options.width * -1 : 0
			});

			itemElems.css({
				width : options.width,
				height : options.height,
				float : 'left'
			});

			if(options.auto){
				autoTimer = setInterval(function(){
					checkAnimate(index+1,true);
				},options.autoTime);
			}

			if(!!options.init){
				options.init.call(wrapperElem.get(0) , length);
			}
		}

		function setIndex(idx){
			prevIdx = index;
			index = idx;
		}

		function checkAnimate(num,isAuto){
			var duration = !isAuto ? defaultOptions.duration : (defaultOptions.autoDuration || defaultOptions.duration);
			var animData = {
				isAuto : isAuto,
				duration : duration ? duration : undefined
			};

			if(options.loop){
				if(num < 0){

					setIndex(length-1);
					sliderElem.css({
						left : (length+1) * moveValue * -1
					});
					animData.num = length;
				}else if(num >= length){

					setIndex(0);
					sliderElem.css({
						left : 0
					});
					animData.num = 1;
				}else{
					animData.num = num+1;
					setIndex(num);
				}

			}else{
				// if(isAuto){
					if(num < 0 || num > length-1){
						return;
					}else{
						animData.num = num;
					}
				// }else{
					// if(num < 0 || num > length-1){
						// return false;
					// }
				// }

				setIndex(num);
			}

			animate(animData);

		}

		function animate(animOptions){

			var duration = animOptions.duration;
			var num = animOptions.num;
			var easing = animOptions.isAuto ? 'easeOutSine' : options.easing;

			if(options.autoTime && !animOptions.isAuto){
				clearInterval(autoTimer);
			}

			sliderElem.stop().animate({
				left : moveValue * num * -1
			},duration,easing);

			if(!!options.callback){
				options.callback.call($(itemElems[index]),index,prevIdx);
			}

			setTimeout(function(){
				isAnimating = false;
				if(options.autoTime && !animOptions.isAuto){
					clearInterval(autoTimer);
					autoTimer = setInterval(function(){
						checkAnimate(index+1,true);
					},options.autoTime);
				}
			},duration);
		}

		init();

		return {
			prev : function(){
				checkAnimate(index-1);
				return false;
			},
			next : function(){
				checkAnimate(index+1);
				return false;
			},
			move : function(_index){
				if(_index !== index){
					checkAnimate(_index);
				}
				return false;
			}
		}
	}

	/* Module for products slider */
	$.fn.productsSlider = function(selector){
		var elemContainer = $(selector);
		var elemSliderContainer = elemContainer.find('.products-slide-wrapper');
		var elemSlider = elemSliderContainer.find('>ul');
		var viewIndex = 0;
		var pageIndex = 0;
		var viewItems = 4;
		var moveVal = -240;
		var length = elemSlider.find('li').length;

		if(length > 4){
			init();
		}

		function init(){
			elemContainer.append((function(){
				var htmlString = '<div class="num">';
				var len = Math.floor(length / viewItems) + (Math.floor(length % viewItems) !== 0 ? 1 : 0);
				for(var i = 0; i < len; i++){
					if(i == 0){
						htmlString += '<a href="javascript:void(0)" class="on"><span></span></a>';
					}else{
						htmlString += '<a href="javascript:void(0)"><span></span></a>';
					}
				}
				return htmlString;
			})());

			elemSliderContainer.prepend('<a href="javascript:void(0)" class="prev disabled"><span class="spt_bg"></span></a><a href="javascript:void(0)" class="next"><span class="spt_bg"></span></a>');
		}

		function animate(val , speed){
			elemSlider.stop().animate({
				left : val
			} , speed , 'easeOutCubic');
		}

		function checkSlider(val){
			if(val < 0 || val + viewItems > length){
				return false;
			}
			return true;
		}

		function setNum(){
			elemContainer.find('.num a').removeClass('on');
			elemContainer.find('.num a').eq(pageIndex).addClass('on');
		}

		elemContainer.find('.prev').bind('click',function(){
			if(viewIndex == 0){
				return;
			}

			var speed = 1000;
			if(checkSlider(viewIndex -4)){
				pageIndex -= 1;
				viewIndex -= 4;
			}else{
				speed = 500;
				viewIndex = 0;
				pageIndex -= 1;
			}
			setNum();
			animate(viewIndex * moveVal , speed);
		});

		elemContainer.find('.next').bind('click',function(){
			if(viewIndex + viewItems == length){
				return;
			}

			var speed = 1000;
			if(checkSlider(viewIndex + 4)){
				viewIndex += 4;
				pageIndex += 1;
			}else{
				speed = 500;
				viewIndex = length - viewItems;
				pageIndex += 1;
			}
			setNum();
			animate(viewIndex * moveVal , speed);
		});

		elemContainer.find('.num a').bind('click',function(){
			if($(this).hasClass('on')){
				return false;
			}
			var speed = 1000;
			if(checkSlider($(this).index() * viewItems)){
				viewIndex = $(this).index() * viewItems;
			}else{
				speed = 500;
				viewIndex = length - viewItems;
			}

			pageIndex = $(this).index();

			setNum();
			animate(viewIndex * moveVal , speed);
		});
	};



	$(document).ready(function(){

		$.fn.cmtSelectInit();
		$.fn.cmtInputInit();

		/* accessibility */
		$(document).bind('keydown',function(e){
			var keycode=e.keyCode || e.which;

			if(keycode == 9 && e.shiftKey) {
				tabval=1;
			}else{
				tabval=0;
			}
		});

		$('a').focus(function(){
			$(this).addClass('focus_obj');
		});
		$('a').blur(function(){
			$(this).removeClass('focus_obj');
		});


		$('.country_selector>ul>li>a').each(function(){
			$(this).focus(function(){
				$(this).parent('li').addClass('focus_obj');
			});
			$(this).blur(function(){
				$(this).parent('li').removeClass('focus_obj');
				setTimeout(function(){
					if(!$('.country_selector>ul>li').hasClass('focus_obj')){
						$('.country_selector>.btn').removeClass('open');
					}
				},50)

			});
		});

		/* //accessibility */

		$(document).click(function(event){
			$('.selectbox-ctm').removeClass('open');
		});

		$('.topbnn_toggle').click(function(){

			var heightVal = 0;
			if($(this).hasClass('open')){
				$(this).removeClass('open');
				fn_closeBanner();
			}else{
				$(this).addClass('open');
				var imgSrc=$('.top_bnn').find('img').attr('src');
				var imgObj = new Image();
				imgObj.onload = function(){
					heightVal = this.height;
					fn_setCookie('top_bnn','open',1);
					$('.top_bnn').animate({height:heightVal});
				}
				imgObj.src=imgSrc;
			}

			return false;
		});

		$('.country_selector>.btn').bind('click',function(event){

			if(!$('.country_selector').hasClass('open')){
				$('.country_selector ul').show();
				setTimeout(function(){
					$('.country_selector').addClass('open');
				},10);

			}else{
				$('.country_selector').removeClass('open');
				setTimeout(function(){
					$('.country_selector ul').hide();
				},100);
			}
		});

		$('.country_selector>ul').bind('mouseleave',function(){
			$('.country_selector').removeClass('open');
			setTimeout(function(){
				$('.country_selector ul').hide();
			},100);
		});

		(function(){
			var timer,
				index = false,
				prevIdx = false,
				liElems = $('#header-20160315 .gnb_menu>ul>li'),
				layerElems = $('#header-20160315 .gnb_menu>ul>li .depth2_contents');

			$('#header-20160315 .gnb_menu>ul>li').hover(function(){

				clearTimeout(timer);

				if(prevIdx && prevIdx == $(this).index()){

				}else{
					liElems.removeClass('on');
					layerElems.hide();
				}

				index = $(this).index();

				$(this).addClass('on');
				$(this).find('.depth2_contents').show();
			},function(){
				var liE = $(this);
				var layerE = $(this).find('.depth2_contents');
				timer = setTimeout(function(){
					liE.removeClass('on');
					layerE.hide();
				},500);

				prevIdx = index;
				index = false;

			});
		})();

		$('#header-20160315 .gnb_menu .depth3_wrapper').hover(function(){
			$(this).addClass('on');
		},function(){
			$(this).removeClass('on');
		});

		$('.selectbox_layer').bind('click',function(){
			if( $(this).hasClass('open') ){
				$(this).removeClass('open');
			}else{
				$(this).addClass('open');
			}

			return false;
		});

		/* Receiving Alert selectbox */
		$('.selectbox_layer li').bind('click',function(){
			if($(this).hasClass('on')){
				$(this).parent().parent().removeClass('open');
				return false;
			}

			var text = $(this).text();
			var parentObj = $(this).parent();
			parentObj.siblings('a').html(text+'<span class="spt_bg btn"></span>');
			parentObj.parent().removeClass('open');

			parentObj.find('li').removeClass('on');
			$(this).addClass('on');
			return false;
		});

		$('.modal_pop_layer').each(function(){
			var obj = $(this);
			obj.find('.popup .close , .overlay').bind('click',function(){
				obj.hide();
				$('body').css({
					overflow:'',
					paddingRight : 0
				});
				return false;
			});
		});

		$.fn.openModalPopup = function(){
			$('body').css({
				overflow:'hidden',
				paddingRight : 20
			});

			$(this).show();

			if($(this).data('events') && $(this).data('events').scroll){
				return;
			}

			$(this).bind('scroll',function(event){
				$this = $(this);

				if($this.offset().top >= $this.find('.popup').offset().top){
					$this.find('.close').css({
						left : $this.find('.popup').offset().left + $this.find('.popup').width()
					}).addClass('fixed');
				}else{
					$this.find('.close').css({
						right : '-50px',
						left  : 'auto'
					}).removeClass('fixed');
				}
			});
		};

		$.fn.initPhotoReviews = function(){

			$('.reviews_list .box .photos>a').each(function(){
				if(!!$(this).data('events')){
					if(!!$(this).data('events').click){
						return;
					}
				}

				$(this).bind('click',function(){
					var $this = $(this);
					var x = $this.offset().left+10;
					var y = $this.offset().top+10;
					var img = new Image();
					img.onload = function(){
						var isHeight;
						var width;

						if(this.height - this.width > 0){
							width = 538 * (this.width/this.height);
						}else{
							width = 538;
						}

						$('body').find('.photo_review_layer').remove();

						$('body').append('<div class="photo_review_layer" style="top:'+y+'px;left:'+(x+width+40)+'px;"><a href="javascript:void(0)" class="close spt_bg"></a><div class="cont"><img src="'+this.src+'" alt="" style="width:'+width+'px;"/></div></div>');
						$('body').find('.photo_review_layer>.close').bind('click',function(){
							$(this).parent().remove();
						});


					};
					img.src = $(this).find('img').attr('src');
				});
			});
		};

		$('.product-review-write .rating_star a').bind('mouseover',function(){
			var index = $(this).index();
			var i = 0;

			$('.product-review-write .tr_stars .status').text($(this).attr('title'));

			for(;i < 5; i++){
				if(index >= i){
					$('.product-review-write .rating_star a').eq(i).addClass('on');
				}else{
					$('.product-review-write .rating_star a').eq(i).removeClass('on');
				}

			}
		});

		$('.product-review-write .rating_radio').each(function(){
			$(this).find('.radio_container>a').bind('click',function(){
				if($(this).hasClass('on')){
					return;
				}
				$(this).parent().find('a').removeClass('on');
				$(this).parent().siblings('.status').text($(this).attr('title'));
				$(this).addClass('on');
			});


			$(this).find('.radio_container>div').bind('click',function(){
				if($(this).hasClass('on')){
					return;
				}
				$(this).parent().find('div').removeClass('on');
				$(this).addClass('on');
			});

		});


		$.fn.cutString = function(options){

			var elemObj = $(this);
			var elem = $(this);
			var tempText = options.text;
			var isOverLine = false;
			var contentArray = options.text.split('<br/>');
			var textLength = 0;


			for(var i = 0; i<contentArray.length; i++){
				if(contentArray[i] !== ''){
					textLength += contentArray[i].length;
				}
			}

			if(textLength >= options.cutLength){
				isOverLine = true;
				tempText = options.text.substring(0,options.cutLength);
				tempText += '...'
			}

			if(!isOverLine){
				$(this).html(options.text);
				return;
			}

			var aElem = $('<a href="javascript:void(0)" class="more_read">'+(options.buttonName != undefined ? options.buttonName.open : 'more view') +'</a>');
			aElem.bind('click',toggleContent);

			elemObj.html(tempText);
			elemObj.append(aElem);

			function toggleContent(){
				if($(this).hasClass('shortened')){
					elemObj.html(tempText);
					$(this).text((!!options.buttonName ? options.buttonName.open : '더보기')).removeClass('shortened');
					elemObj.append(this);
				}else{
					elemObj.html(options.text);
					$(this).text((!!options.buttonName ? options.buttonName.close : '줄이기')).addClass('shortened');
					elemObj.append(this);
				}
				aElem.bind('click',toggleContent);
			}
		};

		(function(){
			$('.cont758 .prodlist>ul>li').each(function(){
				if($(this).find('.othercolor-products-list').length > 0){
					var $this = $(this);
					var timer;
					var sliderContainerElem = $(this).find('.othercolor-products-list');

					sliderContainerElem.find('.slider_wrap li').bind('click',function(){
						return false;
					});

					sliderContainerElem.find('.slider_wrap li').bind('mouseover',function(){
						var img170 = $(this).find('a').attr('data-170');
						$this.find('.img>a>img').attr('src',img170);
					});

					sliderContainerElem.bind('mouseleave',function(){
						var img170 = $(this).find('a').attr('data-170');
						$this.find('.img>a>img').attr('src',sliderContainerElem.find('.slider_wrap li').eq(0).find('a').attr('data-170'));
					});

					if(sliderContainerElem.find('.slider_wrap li').length > 4){
						var prevBtn = sliderContainerElem.find('.prev');
						var nextBtn = sliderContainerElem.find('.next');
						var sliderElem = sliderContainerElem.find('.slider_wrap ul');

						var index = 0;
						var viewStep = 0;
						var viewLength = 4;
						var length = sliderElem.find('li').length;
						var moveVal = 38;

						prevBtn.bind('click',function(){
							if($(this).hasClass('disable')){
								return false;
							}
							nextBtn.removeClass('disable');

							viewStep -= 1;

							sliderElem.animate({
								left : viewStep*moveVal*-1
							},300);

							if(viewStep <= 0){
								$(this).addClass('disable');
							}
							return false;
						});

						nextBtn.bind('click',function(){
							if($(this).hasClass('disable')){
								return false;
							}

							prevBtn.removeClass('disable');

							viewStep += 1;

							sliderElem.animate({
								left : viewStep*moveVal*-1
							},300);

							if(length <= viewStep + viewLength){
								$(this).addClass('disable');
							}

							return false;
						});

					}


					$(this).bind('mouseenter',function(){
						timer = setTimeout(function(){
							sliderContainerElem.fadeIn(100);
						},100);
					});

					$(this).bind('mouseleave',function(){
						sliderContainerElem.fadeOut(200);
						clearTimeout(timer);
						$this.find('.img>a>img').attr('src',sliderContainerElem.find('.slider_wrap li').eq(0).find('a').attr('data-170'));
					});
				}
			});
		})();
	});

})(jQuery);
