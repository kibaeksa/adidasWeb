jQuery(document).ready(function(){

	jQuery( ".datepicker1" ).datepicker({
		showOn: "button",
		buttonImage: "http://image.adidas.co.kr/images/adidas/mypage/ico_calendar.gif",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
		monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
		dayNamesMin:["일","월","화","수","목","금","토"]
	});

	jQuery.datepicker.setDefaults( jQuery.datepicker.regional[ "" ] );
	jQuery( ".datepicker1" ).datepicker( "option", "dateFormat",'yy-mm-dd');

});
