(function($){
	$(document).ready(function(){
		/*
		$('.wld_vsl').each(function(){

			$(this).find('img').animate({				
				opacity:1
			},{
				duration:2000,
				queue:false
			}).animate({top:0},800);
			//$(this).find('img').animate({top:0},800);


			setTimeout(function(){
			
				$('.wld_vsl').find('.txt').animate({
					opacity:1
				},{
					duration:2000,
					queue:false
				});
				$('.wld_vsl').find('.txt').animate({top:'190px'},800,'easeInOutCubic');

			},150)			
			
		});	
		*/
		$('.lnk_animate').hover(function(){
			$(this).find('.bg').stop();
			$(this).find('.bg').animate({top:'100px'},400,'easeInOutExpo');
		},function(){
			$(this).find('.bg').stop();
			$(this).find('.bg').animate({top:'150px'},400,'easeInOutExpo');		
		})
	});

	$.fn.wrdSlider = function(v,v2){
		var $this = $(this);
		var $slider = $this.find('.slider_visual ul');
		var $control = $this.find('.slider_btn');
		var $control_btn = $this.find('.slider_btn').find('li').find('a');
		var $control_box = $this.find('.box');
		var idx = 0;
		var img_val = v2 ? v2 : 655;
		var btn_val = v ? v : 165;

		$this.each(function(){
			
			$control_btn.click(function(){
				var _idx = $(this).parent('li').index();
				var _timer;
				if(_idx == idx) return false;
				idx = _idx;
				$control_box.stop();
				$control_box.animate({
					left:btn_val * _idx +'px'
				},500,'easeInOutQuart');
				clearTimeout(_timer);
				_timer = setTimeout(function(){
					$slider.stop();
					$slider.animate({
						left:img_val * _idx * -1  +'px'
					},800,'easeInOutExpo');				
				},250);
				return false;
			});

		});
		
	}

})(jQuery);