(function($){

	$(function(){

		

		/******************************************************

			COMMON

		*******************************************************/

		/* Popup Close */

		$('.running .product_layer .close').click(function(e){

			e.preventDefault();

			$(this).parents('.product_layer').hide();

			$('.running .dimdeu').hide();

		});







		/******************************************************

			SUB7 (FAQ)

		*******************************************************/

		/* Tab */

		$('.running .cont5 .tabs2 li').click(function(e){

			e.preventDefault();

			var itemIdx = $(this).index();

			$(this).addClass('on').siblings().removeClass('on');

			$('.running .cont_list .contBox > div').eq(itemIdx).show().siblings().hide();

			$('.running .cont5 .faq_box li').removeClass('on').find('dd').hide();

		});



		/* Tab Contents Accordion */

		$(".faq_box dt").click(function(e){

			e.preventDefault();

			if($(this).parents("li").hasClass("on")){

				$(this).parents("li").removeClass("on").find("dd").hide()

			} else {

				$(this).parents("li").addClass("on").find("dd").show().parent().parent().siblings().removeClass('on').find('dd').hide();

			}

		});

		

		

		

		/******************************************************

			SUB4 ROLLING

		*******************************************************/

		

		/* Variable */

		var rollingSum = 0;

		var rollingVar = 0;

		var rollingBull = true;



		$.fn.rollingSet = function(){

			/* Setting */

			rollingSum = $('.running .product_list').length -1;

			$('.running .product_list').each(function(){

				$('.running .product .paging2 .number').append('<a href="#none"><img src="/images/adidas/club/2015rc/ico_paging.png" alt="페이지" /></a>');

			});

			$('.running .product .paging2 .number a').eq(0).addClass('on');

		};$.fn.rollingSet();

		

		/* Arrow Click Event */

		$('.running .product .paging2 > a').click(function(e){
			if(!rollingBull) return;



			e.preventDefault();

			if($(this).hasClass('prev')){

				if(rollingVar > 0){

					rollingVar--;

					rollingBull = false;

					$('.running .product_box').stop().animate({'left':'+=940px'},500, function(){

						rollingBull = true;

					});

				};

			}else{

				if(rollingVar < rollingSum){

					rollingVar++;

					rollingBull = false;

					$('.running .product_box').stop().animate({'left':'-=940px'},500, function(){

						rollingBull = true;

					});

				};

			};

			$('.running .product .paging2 .number > a').eq(rollingVar).addClass('on').siblings().removeClass('on');

		});





		/* Paging Click Event */

		$('.running .product .paging2 .number > a').click(function(e){

			if(!rollingBull) return;

			

			e.preventDefault();



			var itemIdx = $(this).index();

			

			$(this).addClass('on').siblings().removeClass('on');

			if(itemIdx < rollingVar){

				rollingBull = false;

				$('.running .product_box').stop().animate({'left':'+='+(rollingVar-itemIdx)*940+'px'},500, function(){

					rollingBull = true;

					rollingVar = itemIdx;

				});

			}else if(itemIdx > rollingVar){

				rollingBull = false;

				$('.running .product_box').stop().animate({'left':'-='+(itemIdx-rollingVar)*940+'px'},500, function(){

					rollingBull = true;

					rollingVar = itemIdx;

				});

			};

		});





		/******************************************************

			LAYER POPUP ROLLING

		*******************************************************/

		

		/* Variable */

		var LrollingSum = 0;

		var LrollingVar = 0;

		var LrollingBull = true;



		$.fn.LrollingSet = function(){

			/* Setting */

			LrollingSum = $('.running .product_list').length -1;
			$('.running .product_layer').each(function(ex){
				var btnWrap = $(this).find('.paging_layer');
				$(this).find('.layer_img_list li').each(function(ex){
					$(this).css('left',ex*303);
					btnWrap.append('<a href="#none"><img src="/images/adidas/club/2015rc/ico_paging.png" alt="상품 이미지"></a>');
					btnWrap.find('a').eq(0).addClass('on');

				});								
								
			});

			// $('.running .product_layer .layer_img_list li').each(function(ex){

			// 	$(this).css('left',ex*303);
			// 	$(this).parent().siblings('.paging_layer').append('<a href="#none"><img src="/images/adidas/club/2015rc/ico_paging.png" alt="상품 이미지"></a>');
			// 	//$('.running .product_layer .paging_layer').append('<a href="#none"><img src="/images/adidas/club/2015rc/ico_paging.png" alt="상품 이미지"></a>');

			// });

		};$.fn.LrollingSet();

		

		/* Paging Click Event */

		$('.running .product_layer .paging_layer a').click(function(e){

			if(!LrollingBull) return;

			

			e.preventDefault();



			var LitemIdx = $(this).index();

			

			$(this).addClass('on').siblings().removeClass('on');

			if(LitemIdx < LrollingVar){

				LrollingBull = false;

				$('.running .product_layer .layer_img_list li').stop().animate({'left':'+='+(LrollingVar-LitemIdx)*303+'px'},500, function(){

					LrollingBull = true;

					LrollingVar = LitemIdx;

				});

			}else if(LitemIdx > LrollingVar){

				LrollingBull = false;

				$('.running .product_layer .layer_img_list li').stop().animate({'left':'-='+(LitemIdx-LrollingVar)*303+'px'},500, function(){

					LrollingBull = true;

					LrollingVar = LitemIdx;

				});

			};

		});

	});

})(jQuery);