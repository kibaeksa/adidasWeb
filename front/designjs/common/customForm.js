(function($){

	function handleCheck(elem , value){
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

})(jQuery);
