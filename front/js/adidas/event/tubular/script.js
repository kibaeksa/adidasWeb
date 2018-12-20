/*
 Tubular event 2016.12.14
 */ 

(function($){
	var requestAnim = (function(){
	return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();		
	function addEvent(element , event , fn){
		if(window.addEventListener){
			element.addEventListener(event , fn , false);
		}else{
			element.attachEvent('on'+event , fn , false);
		}
	}

	// function addClass(element , className){
	// 	// 
	// 	var reg = new RegExp('(^'+className+'||'+className+'$||\\s+'+className+'\\s+)','g');
	// 	var classList = element.getAttribute('class');
	// 	console.log(typeof classList);
	// 	var isExist = classList.test(reg);
	// 	console.log(reg);
	// 	console.log(22);
	// 	console.log(isExist);
	// }

	// function removeClass(element , className){
	// 	var reg = new RegExp(className,'g');
	// 	var className = element.getAttribute('class');
	// 	var replaceClassName = className.replace(reg , '');
	// 	// element.setAttribute('class',replaceClassName);
	// }

	var elemsTeaserBoxes = document.getElementById('teaser-list').children;
	for(var i = 0; i < elemsTeaserBoxes.length; i++){
		addEvent(elemsTeaserBoxes[i] , 'mouseenter' , function(){
			for(var j = 0; j < elemsTeaserBoxes.length; j++){
				if(this !== elemsTeaserBoxes[j]){
					$(elemsTeaserBoxes[j]).addClass('blocked');
				}
			}
		});

		addEvent(elemsTeaserBoxes[i] , 'mouseleave' , function(){
			for(var j = 0; j < elemsTeaserBoxes.length; j++){
				if(this !== elemsTeaserBoxes[j]){
					$(elemsTeaserBoxes[j]).removeClass('blocked');
				}
			}
		});
	}





	function tubularSlider(){
		var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var width = 900;
		var minWindowWidth = 1000;
		var index = 1;
		var length = 4;

		var moveVal = 900;
		var defaultVal = width - ((windowWidth - width)/2);

		var elemSlider = document.getElementById('tubular-product-slider')
		var elemItems = elemSlider.children;

		var elemLabelSlider = document.getElementById('tubular-label-slider');
		var elemLabelItems = elemLabelSlider.children;

		var labelDefaultVal = (windowWidth - width)/2 + elemLabelItems[0].clientWidth + 60;

		var isAnimating  = false;

		function init(){
			for(var i = 0;i < elemLabelItems.length; i++){
				if(i == 0){
					elemLabelItems[i].gapLeft = 0;
				}else if(i == elemLabelItems.length - 1){
					elemLabelItems[i].gapLeft = elemLabelItems[i-1].gapLeft + elemLabelItems[i-1].clientWidth + 60;
				}else{
					elemLabelItems[i].gapLeft = elemLabelItems[i-1].gapLeft + elemLabelItems[i-1].clientWidth + 30;
				}
			}

			elemSlider.style.left = ((defaultVal * -1)) + 'px';
			elemLabelSlider.style.left = (labelDefaultVal - elemLabelItems[index].gapLeft)   + 'px';

		}

		function resize(){
			windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			defaultVal = width - ((windowWidth - width)/2);
			labelDefaultVal = (windowWidth - width)/2 + elemLabelItems[0].clientWidth + 60;
			if(index == 0){
				var val = (defaultVal - moveVal) * -1;
			}else{
				var val = (defaultVal + (moveVal * (index-1))) * -1;
			}

			elemSlider.style.left = val + 'px';
			elemLabelSlider.style.left = (labelDefaultVal - elemLabelItems[index].gapLeft)   + 'px';
		}

		function anim(elem , target){
			$(elem).animate({
				left : target
			});

			setNum();
			setContents();

			setTimeout(function(){
				isAnimating  = false;
			},710);
		}

		function setNum(){
			$(elemLabelSlider).find('div').removeClass('on').eq(index).addClass('on');
		}

		function setContents(){
			$('.product_infomation>.box').fadeOut(700);
			setTimeout(function(){
				$('.product_infomation>.box').eq(index).fadeIn(700);
			},710);
		}


		$('.products_display .prev').bind('click',function(){
			if(index == 0 || isAnimating){
				return;
			}

			isAnimating = true;

			index -= 1;

			if(index == 0 ){
				var val = (defaultVal - moveVal) * -1;
			}else{
				var val = (defaultVal + (moveVal * (index-1))) * -1;
			}
			var labelVal = (labelDefaultVal - elemLabelItems[index].gapLeft);

			anim(elemSlider , val);
			anim(elemLabelSlider , labelVal);
		});

		$('.products_display .next').bind('click',function(){
			if(index == length-1 || isAnimating){
				return;
			}

			isAnimating = true;

			index += 1;

			
			var val = (defaultVal + (moveVal * (index-1))) * -1;
			var labelVal = (labelDefaultVal - elemLabelItems[index].gapLeft);
			
			anim(elemSlider , val);
			anim(elemLabelSlider , labelVal);
		});

		$(elemLabelSlider).find('div').bind('click',function(){
			if($(this).hasClass('on') || isAnimating){
				return;
			}

			isAnimating = true;

			index = $(this).index();

			if(index == 0 ){
				var val = (defaultVal - moveVal) * -1;
			}else{
				var val = (defaultVal + (moveVal * (index-1))) * -1;
			}

			
			
			var labelVal = (labelDefaultVal - elemLabelItems[index].gapLeft);
			
			anim(elemSlider , val);
			anim(elemLabelSlider , labelVal);
		});


		init();
		addEvent(window , 'resize' , resize);

	}

	tubularSlider();

	(function render(){
		var scrollTop = $(window).scrollTop();
		var triggerPoint = scrollTop + $(window).height()*0.7;
		
		if(triggerPoint > $('#tubular .statement').offset().top){
			$('#tubular .statement p').eq(0).addClass('loaded');
			setTimeout(function(){
				$('#tubular .statement p').eq(1).addClass('loaded');
			},200);
		}

		if(scrollTop + $(window).height()*0.5 > $('#tubular .products_display').offset().top){
			$('#tubular .product_slider_wrap .item').addClass('loaded');
			$('#tubular .product_slider_label>div').addClass('loaded');
		}

		requestAnim(render);
	})();

})(jQuery);