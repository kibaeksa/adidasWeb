(function($){
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
					elemContainer.find('>a').text(optionText);
					elemContainer.attr('data-value',optionValue);
				}
			});

			if(!$(this).data('events')){
				elemContainer.bind('click',toggleSelecbox);
			}


			if(!elemOpions.eq(0).data('events')){

				elemOpions.bind('click',function(){
					var $this = $(this);
					if($(this).hasClass('disable')){
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
					elemContainer.find('>a').text(optionText);
					elemContainer.attr('data-value',$this.attr('data-option-value'));

					if(!!elemContainer.data('callback') && !!elemContainer.data('callback').after){
						elemContainer.data('callback').after.call($this,$this.attr('data-option-value'),$this.index());
					}
				});
			}


			function toggleSelecbox(event){
				event.stopPropagation();
				if($(this).hasClass('open')){
					$('.selectbox-ctm').removeClass('open');
					$(this).removeClass('open');
				}else{
					$('.selectbox-ctm').removeClass('open');
					$(this).addClass('open');
				}
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
			if(!!$(this).data('events')){
				return;
			}

			if($(this).find('input').is(':checked')){
				$(this).addClass('checked');
			}

			$(this).bind('click',function(event){

				event.preventDefault();
				event.stopPropagation();

				var inputElem = $(this).find('input');

				if(!!$(this).data('callback') && !!$(this).data('callback').before){
					var beforeCallbackResult = $(this).data('callback').before.call($(this));
					if(beforeCallbackResult === false){
						return;
					}
				}


				if($(this).find('input').is(':checked') && $(this).hasClass('checked')){

					if($(this).hasClass('input-check-ctm')){
						$(this).removeClass('checked').find('input').attr('checked',false);
					}

				}else{
					if($(this).hasClass('input-radio-ctm')){
						$('input[type="radio"][name="'+$(this).find('input[type="radio"]').attr('name')+'"]').attr('checked',false).parent().removeClass('checked');
					}

					$(this).addClass('checked').find('input').attr('checked',true);
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

})(jQuery);
