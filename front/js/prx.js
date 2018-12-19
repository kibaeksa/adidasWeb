(function(){

	if(jQuery('html').hasClass('old_ie')){
		return false;
	}

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

				
	var parallaxElement = [];
	var elements = document.getElementsByTagName('*');
	var elementIndex = 0;
	var elementsLength = elements.length;

	var parallaxIndex = 0;

	for(; elementIndex < elementsLength; elementIndex++){
		var el = elements[elementIndex];	
		var attributes = el.attributes;

		var attributeIndex = 0;
		var attributeLength = el.attributes.length;

		var isParallaxElem = false;

		for(; attributeIndex < attributeLength; attributeIndex++){
			var attr = attributes[attributeIndex];
			if(attr.name == 'data-parallax'){
				if(attributeIndex > 0){
					var temp = attributes[0];
					attributes[0] = attr;
					attributes[attributeIndex] = temp;
				}
			}					
		}

		attributeIndex = 0;
		attributeLength = el.attributes.length;

		for(; attributeIndex < attributeLength; attributeIndex++){
			var attr = attributes[attributeIndex];

			if(attr.name == 'data-parallax'){
				isParallaxElem = true;
				parallaxElement.push({
					el : el,							
					y : (window.scrollY || document.documentElement.scrollTop) + el.getBoundingClientRect().top,
					originY : (window.scrollY || document.documentElement.scrollTop) + el.getBoundingClientRect().top,
					targetY : 0,
					pointTop : el.offsetHeight / 2,
					triggerP : 'center',
					speed : 1,
					isdone : false,
					isReverse : false
				});	
			}
			
			if(attr.name == 'data-parallax-addclass'){						
				parallaxElement[parallaxIndex].attrClass = attr.value;
			}

			if(attr.name == 'data-parallax-trigger-point'){						
				if(attr.value == 'top'){
					parallaxElement[parallaxIndex].triggerP  = 'top';
				}else if(attr.value == 'bottom'){
					parallaxElement[parallaxIndex].triggerP  = 'bottom';
				}
			}

			if(attr.name == 'data-parallax-speed'){						
				parallaxElement[parallaxIndex].speed = attr.value;
				parallaxElement[parallaxIndex].originY = parallaxElement[parallaxIndex].originY * parallaxElement[parallaxIndex].speed;
			}

			if(attr.name == 'data-parallax-addclass'){
				parallaxElement[parallaxIndex].addclass = attr.value;
				parallaxElement[parallaxIndex].isAddedClass = false;
			}

			if(attr.name == 'data-parallax-reverse'){
				parallaxElement[parallaxIndex].isReverse = true;	
			}

			if(attributeIndex == attributeLength-1 && isParallaxElem){						
				el.style.transform = 'translate3d(0,'+parallaxElement[parallaxIndex].y+'px,0)';
				isParallaxElem = false;
				parallaxIndex += 1;
			}

		}
	}

	function resize(){
		var i = 0;
		for(; i < parallaxElement.length; i++){
			var scrollY = window.scrollY || document.documentElement.scrollTop;					
			parallaxElement[i].originY = ((window.scrollY || document.documentElement.scrollTop) + 
										 parallaxElement[i].el.getBoundingClientRect().top) - parallaxElement[i].y;
			parallaxElement[i].originY = parallaxElement[i].originY * parallaxElement[i].speed;
		}
	}

	function update(){

	}

	(function render(){
		var i = 0;
		for(;i < parallaxElement.length; i++){
			var triggerPointValue = 0;
			var scrollY = window.scrollY || document.documentElement.scrollTop;
			if(parallaxElement[i].triggerP == 'center'){
				triggerPointValue = window.innerHeight/2 - (parallaxElement[i].el.offsetHeight/2);
			}else if(parallaxElement[i].triggerP == 'bottom'){
				triggerPointValue = window.innerHeight - (parallaxElement[i].el.offsetHeight/2);
			}

			if(parallaxElement[i].targetY != parallaxElement[i].y){
				parallaxElement[i].isDone = false;
			}

			parallaxElement[i].targetY = parallaxElement[i].originY - ((scrollY + triggerPointValue) * parallaxElement[i].speed);

			if(parallaxElement[i].isReverse){
				parallaxElement[i].targetY *= -1;
			}
			
			
			if(!parallaxElement[i].isLoaded){
				parallaxElement[i].isLoaded = true;
				parallaxElement[i].isDone = true;

				parallaxElement[i].y = parallaxElement[i].targetY;
				parallaxElement[i].el.style.transform = 'translate3d(0,'+parallaxElement[i].y+'px,0)';
			}else{

				parallaxElement[i].y = parallaxElement[i].y + (parallaxElement[i].targetY - parallaxElement[i].y) * 0.2;
				if(!parallaxElement[i].isDone){
					parallaxElement[i].el.style.transform = 'translate3d(0,'+parallaxElement[i].y+'px,0)';	
				}
			
				if(Math.abs(parallaxElement[i].targetY - parallaxElement[i].y) < 1){
					parallaxElement[i].isDone = true;
					parallaxElement[i].y = parallaxElement[i].targetY;
					parallaxElement[i].el.style.transform = 'translate3d(0,'+parallaxElement[i].y+'px,0)';	
				}

				if(parallaxElement[i].addclass !== undefined && !parallaxElement[i].isAddedClass){
					var elemScrollTop = jQuery(parallaxElement[i].el).offset().top - window.innerHeight * 0.9;
					if(elemScrollTop < scrollY){
						parallaxElement[i].isAddedClass = true;
						jQuery(parallaxElement[i].el).addClass(parallaxElement[i].addclass);
					}
				}

			}
		}

		requestAnimFrame(render);

	})();	

	window.addEventListener('resize',resize);

})();