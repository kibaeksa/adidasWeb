var tabval=0;
var openMiPopup;

(function(){
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
	var videoWidth = width == undefined ? '100%' : width;
	var videoHeight = width == undefined ? '100%' : height;
	var popupStyle;

	if(width == undefined){
		popupStyle = 'width:100%;height:100%;top:0;left:0;margin:0;';
	}else{
		if(videoHeight == undefined){
			videoHeight = width * 0.55;
		}
		popupStyle = 'width:'+videoWidth+'px;height:'+videoHeight+'px;margin:-'+(videoHeight/2)+'px 0 0 -'+(videoWidth/2)+'px;';
	}


	var htmlString = '<div id="video-modal-popup">';
		htmlString += '	<div class="overlay"></div>';
		htmlString += '	<div class="popup" style="'+popupStyle+'">';
		if(width == undefined){
			htmlString += '		<a href="javascript:void(0)" class="close spt_bg" style="top:0;"></a>';
		}else{
			htmlString += '		<a href="javascript:void(0)" class="close spt_bg"></a>';
		}
		htmlString += '	</div>';
		htmlString += '</div">';

	jQuery('body').prepend(htmlString);
	jQuery('#video-modal-popup .overlay').click(function(){
		jQuery('#video-modal-popup').remove();
	});

	jQuery('#video-modal-popup .close').click(function(){
		jQuery('#video-modal-popup').remove();
	});

	setTimeout(function(){
		jQuery('#video-modal-popup').addClass('loaded');
		setTimeout(function(){
				jQuery('#video-modal-popup .popup').append('<iframe class="video" id="main_video" frameborder="0" allowfullscreen="1" title="YouTube video player" width="'+videoWidth+'" height="'+videoHeight+'" src="https://www.youtube.com/embed/'+ytbId+'?rel=0&autoplay=1"></iframe>');
		},100);

	},200);

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

	var initCustomForm = function(){

		var handleCheck = function(elem , value){
			if(value == undefined){
				return elem.is(':checked');
			}

			if(jQuery.fn.jquery == '1.4.2'){
				elem.attr('checked',value);
			}else{
				elem.prop('checked',value);
			}
		}

		/**
		* $.fn.cmtSelectInit
		* Initialize custom selectbox
		*/
		$.fn.cmtSelectInit = function(){
			$('.selectbox-ctm').each(function(){
				var elemContainer = $(this);
				var elemOpions = elemContainer.find('.select-contents').find('*[data-option-value],[data-option-value=""]');

				elemOpions.each(function(){
					var $this = $(this);
					var optionText = (function(){
						if($this.attr('data-option-text') == undefined){
							return $this.find('*').text()
						}else{
							return $this.attr('data-option-text');
						}
					})();

					var optionValue = $(this).attr('data-option-value');

					if($this.hasClass('selected')){
						elemContainer.find('>a').html(optionText);
						elemContainer.attr('data-value',optionValue);
					}
				});

				if(!$(this).attr('data-init')){
					$(this).attr('data-init' , true);
					elemContainer.bind('click',toggleSelecbox);
				}


				if(!elemOpions.eq(0).attr('data-init')){

					elemOpions.each(function(){
						$(this).attr('data-init',true);
					});

					elemOpions.bind('click',function(){
						var $this = $(this);

						if($(this).hasClass('disable') || $(this).hasClass('disabled') ){
							return false;
						}

						if(!!elemContainer.data('callback') && !!elemContainer.data('callback').before){
							var beforeCallbackResult = elemContainer.data('callback').before.call($(this),$this.attr('data-option-value'),$this.index());
							if(beforeCallbackResult === false){
								return;
							}
						}

						var optionText = (function(){
							if($this.attr('data-option-text') == undefined){
								return $this.find('*').text()
							}else{
								return $this.attr('data-option-text');
							}

						})();

						elemOpions.removeClass('selected');
						$this.addClass('selected');
						elemContainer.find('>a').html(optionText);
						elemContainer.attr('data-value',$this.attr('data-option-value'));

						if(!!elemContainer.data('callback') && !!elemContainer.data('callback').after){
							elemContainer.data('callback').after.call($this,$this.attr('data-option-value'),$this.index());
						}
					});
				}


				function toggleSelecbox(event){
					event.stopPropagation();
					if($(this).hasClass('disabled') || $(this).hasClass('disable')){
						return;
					}

					if($(this).hasClass('open')){
						$('.selectbox-ctm').removeClass('open');
						$(this).removeClass('open');
					}else{
						$('.selectbox-ctm').removeClass('open');
						$(this).addClass('open');
					}

					var offsetTop = $(this).find('.select-contents li.selected').length == 0 ? 0 : $(this).find('.select-contents li.selected').position().top + $(this).find('.select-contents').scrollTop();

					$(this).find('.select-contents').animate({
						scrollTop : offsetTop
					},0);


				}
			});
		};

		/**
		* $.fn.ctmSelectSetCallback
		* Initialize callback function to specific selectbox
		* @param {Object} callback
		*        before : function, : execute before click
		*        after : function   : execute after click
		*/
		$.fn.ctmSelectSetCallback = function(callback){
			$(this).data('callback',callback);
		}

		/**
		* $.fn.cmtInputInit
		* Initialize custom form (checkbox , radio)
		*/
		$.fn.cmtInputInit = function(){

			$this = $(this);
			$('.input-ctm').each(function(){

				if(!!$(this).attr('data-init')){
					return;
				}

				if($(this).find('input').is(':checked')){
					$(this).addClass('checked');
				}

				if($(this).find('input').is(':disabled')){
					$(this).addClass('disabled');
				}

				$(this).attr('data-init',true);

				$(this).bind('click',function(event){

					event.preventDefault();
					event.stopPropagation();

					if($(this).hasClass('disable') || $(this).hasClass('disabled')){
						return;
					}

					var inputElem = $(this).find('input');

					if(!!$(this).data('callback') && !!$(this).data('callback').before){
						var beforeCallbackResult = $(this).data('callback').before.call($(this));
						if(beforeCallbackResult === false){
							return;
						}
					}


					if($(this).find('input').is(':checked') && $(this).hasClass('checked')){

						if($(this).hasClass('input-check-ctm')){
							// $(this).removeClass('checked').find('input').attr('checked',false);
							$(this).removeClass('checked');
							handleCheck($(this).removeClass('checked').find('input') , false);
						}

					}else{
						if($(this).hasClass('input-radio-ctm')){
							// $('input[type="radio"][name="'+$(this).find('input[type="radio"]').attr('name')+'"]').attr('checked',false).parent().removeClass('checked');
							$('input[type="radio"][name="'+$(this).find('input[type="radio"]').attr('name')+'"]').parent().removeClass('checked');
							handleCheck($('input[type="radio"][name="'+$(this).find('input[type="radio"]').attr('name')+'"]') , false);
						}

						// $(this).addClass('checked').find('input').attr('checked',true);
						$(this).addClass('checked');
						handleCheck($(this).find('input') , true);
					}



					if(!!$(this).data('callback') && !!$(this).data('callback').after){
						$(this).data('callback').after.call($(this));
					}


					return false;
				});
			});
		};


		/**
		* $.fn.ctmInputSetCallback
		* Initialize callback function to specific form
		* @param {Object} callback
		*        before : function, : execute before click
		*        after : function   : execute after click
		*/
		$.fn.ctmInputSetCallback = function(callback){
			$(this).data('callback',callback);
		}

	};
	/* initCustomForm END */

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
	};

	/* Module for products slider */
	$.fn.productsSlider = function(selector){
		if(typeof selector == 'string'){
			var elemContainer = $(selector);
			var viewItems = 4;
			var moveVal = -240;
		}else{
			var elemContainer = $(selector.selector);
			var viewItems = selector.viewItems ? selector.viewItems : 4;
			var moveVal = selector.moveVal ? selector.moveVal : -240;
		}

		var elemSliderContainer = elemContainer.find('.products-slide-wrapper');
		var elemSlider = elemSliderContainer.find('>ul');
		var viewIndex = 0;
		var pageIndex = 0;


		var length = elemSlider.find('li').length;

		if(length > viewItems){
			init();
		}

		function init(){
			elemSliderContainer.append((function(){
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
			if(checkSlider(viewIndex - viewItems)){
				pageIndex -= 1;
				viewIndex -= viewItems;
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
			if(checkSlider(viewIndex + viewItems)){
				viewIndex += viewItems;
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

	if(!$.fn.cmtSelectInit){
		initCustomForm();
	}

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

		$('.techlist_list').bind('click',function(){

			if($(this).hasClass('open')){
				$('.techlist_list').removeClass('open');
				$('.techlist_cont').slideUp();
			}else{
				$('.techlist_list').removeClass('open');
				$('.techlist_cont').slideUp();
				$(this).addClass('open');
				$(this).siblings('.techlist_cont').slideDown();
			}
			return false;
		});

		$('.techlist_cont .close').bind('click',function(){
			$(this).parent().siblings('.techlist_list').removeClass('open');
			$(this).parent().slideUp();
			return false;
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


		/**
		* $.fn.ctmSelectSetCallback
		* Initialize callback function to specific selectbox
		* @param {Object} callback
		*        before : function, : execute before click
		*        after : function   : execute after click
		*/
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

		$('.filter_wrapper .filter_box').each(function(){
			var contentElem = $(this).find('.content');
			var outerHeight = contentElem.find('.content_inner').outerHeight();

			$(this).find('>.title').bind('click',function(){
				if($(this).parent().hasClass('not_toggle')){
					return false;
				}

				var animHeight = outerHeight;
				if($(this).parent().hasClass('open')){
					$(this).parent().removeClass('open');
					contentElem.animate({
						height : 0
					},300);
				}else{
					$(this).parent().addClass('open');
					contentElem.animate({
						height : $(this).siblings('.content').find('.content_inner').outerHeight()
					},300);
					setTimeout(function(){
						contentElem.css({
							height : 'auto'
						});
					},300);
				}

			});
		});

		$('.filter_box.product_category .content_inner>ul>li>a').bind('click',function(){
			if($(this).parent().hasClass('open')){
				$(this).parent().removeClass('open');
				$(this).siblings('div').slideUp();
			}else{
				$(this).parent().addClass('open');
				$(this).siblings('div').slideDown();
			}

		});

		(function(){

			$('.plp-wrapper .plp-contents .plp-products .plp-grid .item').each(function(){
				var index = 0;
				var length;
				var itemDisplayed = 3;
				var containerElem = $(this).find('.othercolor_slider');
				var sliderElem = $(this).find('.othercolor_slider ul');
				var imageElem = $(this).find('.img>a>img');

				var mainOverImage = imageElem.attr('data-over');
				var mainOutImage = imageElem.attr('data-out');

				if(mainOverImage != undefined){
					$(this).find('.img>a>img').hover(function(){
						$(this).attr('src',mainOverImage);
					},function(){
						$(this).attr('src',mainOutImage);
					});
				}


				if($(this).find('.othercolor_slider').length > 0 ){

					$(this).attr('data-othercolor-init',true);

					$(this).find('.othercolor_slider .slider_wrapper li img').hover(function(){
						imageElem.attr('src',$(this).attr('data-over'));
					},function(){
						// imageElem.attr('src',mainOutImage);
					});

					if($(this).find('.othercolor_slider li').length > itemDisplayed){
						length = $(this).find('.othercolor_slider li').length;

						$(this).find('.othercolor_slider').append('<a href="javascript:void(0)" class="prev plp_spt_bg disable"></a><a href="javascript:void(0)" class="next plp_spt_bg"></a>');

						$(this).find('.othercolor_slider .prev').bind('click',function(){
							if($(this).hasClass('disable')){
								return;
							}

							containerElem.find('.next').removeClass('disable');

							index--;

							sliderElem.stop().animate({
								left : index * -55
							});

							if(index == 0){
								$(this).addClass('disable');
							}
						});

						$(this).find('.othercolor_slider .next').bind('click',function(){
							if($(this).hasClass('disable')){
								return;
							}

							containerElem.find('.prev').removeClass('disable');

							index++;

							sliderElem.stop().animate({
								left : index * -55
							});

							if(length == index + itemDisplayed){
								$(this).addClass('disable');
							}
						});
					}

				}
			});

			$('.plp-wrapper .plp-contents .plp-products .plp-grid .item').bind('mouseenter',function(){
				var that = $(this);
				itemTimer = setTimeout(function(){
					that.addClass('hover');
				},0); //500
			});

			$('.plp-wrapper .plp-contents .plp-products .plp-grid .item').bind('mouseleave',function(){
				clearTimeout(itemTimer);
				$(this).removeClass('hover');
				$(this).find('.img>a>img').attr('src',$(this).find('.img>a>img').attr('data-out'));
				imageElem.attr('src',mainOutImage);
			});

			$('.filter_box.price_filter .input-radio-ctm').ctmInputSetCallback({
				after : function(){
					if($('.filter_box.price_filter .btn-ctm').hasClass('active')){
						return false;
					}

					$('.filter_box.price_filter .btn-ctm').css({
						display: 'block'
					});
					setTimeout(function(){
						$('.filter_box.price_filter .btn-ctm').addClass('active');
					},10);

				}
			})

		})();

	});
	/* ready END */

})(jQuery);
