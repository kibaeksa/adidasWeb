//쿠키설정
function fn_setCookie(name, value, expiredays){
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//쿠키조회
function fn_getCookie(name){
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
}

//레이어 오픈
function openLayer(oid,w,h){	
	setTimeout(function(){
		jQuery('.layer_bg').css({
			height:jQuery(document).height()+'px',
			opacity:0.6		
		});
		jQuery('.layer_bg').fadeIn();
		
	},500);

	var o=jQuery('#'+oid);
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

//레이어 닫기
function closeLayer(o,t){
	jQuery('#'+o).fadeOut();
	if (t==1 && (o=='notice_layer_pop' || (o!='notice_layer_pop' && jQuery('#notice_layer_pop').css('display')!='block'))) {			
		setTimeout(function(){
			jQuery('.layer_bg').fadeOut();
		},100);
	}
	return false;
}

//상품평바로가기
function fn_prod_eval(arg){
	var url = "http://" + location.hostname + "/RPF020401.action?PROD_CD="+arg+"&eval=yes#tab2";
	top.location.href = url;
}

//상품상세바로가기
function fn_prod_c(arg){
	var url = "http://" + location.hostname + "/RPF020401.action?PROD_CD="+arg;
	top.location.href = url;
}