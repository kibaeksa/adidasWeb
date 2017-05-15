<style type="text/css">
	.evt_2995_tab{margin-bottom:2px;height:80px;}
	.evt_2995_tab li{width:474px;height:80px;float:left;margin-right:2px;}
	.evt_2995_tab li a{width:474px;height:80px;display:block;background:url('${param.imgUrl}tab.jpg') 0 0 no-repeat;text-indent:-5000px;}
	.evt_2995_tab li.btn1 a{background-position:0 -120px;}
	.evt_2995_tab li.btn2 a{background-position:-476px -120px;}
	.evt_2995_tab li.btn1 a.on{background-position:0 -200px;}
	.evt_2995_tab li.btn2 a.on{background-position:-476px -200px;}
	.evt_2995_tab li.btn2{margin-right:0;}

	.btn_history{display:block;width:950px;height:90px;background:url('${param.imgUrl}tab.jpg') 0 -300px no-repeat;text-indent:-5500px;}
	.btn_history.open{background-position:0 -390px;}
	.evt2995_history{height:2965px;overflow:hidden;position:absolute;top:954px;left:0;}
	.evt2995_history .close{position:absolute;top:0;right:0;}

	.evt2995_jc_tab{height:50px;margin:2px 0;}
	.evt2995_jc_tab li{width:236px;height:50px;float:left;margin-right:2px;}
	.evt2995_jc_tab li.m4{margin-right:0;}
	.evt2995_jc_tab li a{display:block;width:236px;height:50px;text-indent:-5000px;background:url('${param.imgUrl}tab.jpg') 0 0 no-repeat;}
	.evt2995_jc_tab li.m1 a{background-position:0 0;}
	.evt2995_jc_tab li.m2 a{background-position:-239px 0;}
	.evt2995_jc_tab li.m3 a{background-position:-477px 0;}
	.evt2995_jc_tab li.m4 a{background-position:-715px 0;}
	.evt2995_jc_tab li.m1 a.on{background-position:0 -52px;}
	.evt2995_jc_tab li.m2 a.on{background-position:-239px -52px;}
	.evt2995_jc_tab li.m3 a.on{background-position:-477px -52px;}
	.evt2995_jc_tab li.m4 a.on{background-position:-715px -52px;}

	.evt2995_jc_box{width:950px;height:555px;overflow:hidden;position:relative;}
	.evt2995_jc_box img{position:absolute;top:0;left:0;display:none;}

</style>
	
<script type="text/javascript">
	jQuery(document).ready(function(){

		var viewtab2995 = 0;
		var isHistoryOpen = true;
		var nowviewjc = 0;


		var param2995 = getParams();
		if(param2995["jersey"] == 1){
			jQuery('.evt_2995_tab li').each(function(){
				jQuery(this).find('a').removeClass('on');
			});
			jQuery('.evt_2995_tab li').eq(1).find('a').addClass('on');
			jQuery('#evt2995_wrap').css({height:'auto'});
			jQuery('#evt2995_1').hide();
			jQuery('#evt2995_2').show();
			viewtab2995 = 1;
		}

		jQuery('.evt_2995_tab li a').click(function(){
			var _idx = jQuery(this).parent().index();
			if(jQuery(this).hasClass('on')) return false;
			viewtab2995 = _idx;
			jQuery('.evt_2995_tab li').each(function(){
				jQuery(this).find('a').removeClass('on');
			});
			jQuery('.evt_2995_tab li').eq(_idx).find('a').addClass('on');
			if(_idx == 0){
				jQuery('#evt2995_2').hide();
				jQuery('#evt2995_1').show();
				if(isHistoryOpen) jQuery('#evt2995_wrap').css({height:'3819px'});
				else jQuery('#evt2995_wrap').css({height:'auto'});
				
			}else{
				jQuery('#evt2995_wrap').css({height:'auto'});
				jQuery('#evt2995_1').hide();
				jQuery('#evt2995_2').show();			
			}
			return false;
		});

		jQuery('.btn_history').click(function(){
			jQuery('#evt2995_wrap').css({height:'3819px'});
			jQuery('.evt2995_history').css({height:'2965px'});			
			isHistoryOpen = true;
			return false;
		});

		jQuery('.evt2995_jc_tab li a').click(function(){
			var _idx = jQuery(this).parent().index();
			if(_idx == nowviewjc) return false;
			nowviewjc = _idx;
			jQuery('.evt2995_jc_tab li').each(function(){
				jQuery(this).find('a').removeClass('on')
			});
			jQuery('.evt2995_jc_box img').each(function(){
				jQuery(this).fadeOut();
			});
			jQuery('.evt2995_jc_tab li').eq(_idx).find('a').addClass('on')
			jQuery('.evt2995_jc_box img').eq(_idx).fadeIn();
			return false;
		});

		jQuery('.evt2995_history .close').click(function(){
			jQuery('#evt2995_wrap').css({
				height:'auto'
			});			
			jQuery('.evt2995_history').css({height:0});
			isHistoryOpen = false;
			return false;
		});

	});


	function getParams() {
		var param = new Array();
	 
		var url = decodeURIComponent(location.href);
		url = decodeURIComponent(url);
	 
		var params;
		params = url.substring( url.indexOf('?')+1, url.length );

		params = params.split("&");

		var size = params.length;
		var key, value;
		for(var i=0 ; i < size ; i++) {
			key = params[i].split("=")[0];
			value = params[i].split("=")[1];
			param[key] = value;
		}

		return param;
	}


</script>
<!-- contents -->
<div style="position:relative;width:950px;height:3819px;" id="evt2995_wrap">
	<div class="evt_2995_tab">
		<ul>
			<li class="btn1"><a href="#" class="on">worldcup history Match Balls</a></li>
			<li class="btn2"><a href="#">2014 FIFA worldcupFederation Jersey</a></li>
		</ul>
	</div>
	<div id="evt2995_1">
		<div class="evt2995_visual" style="margin-bottom:10px;"><img src="${param.imgUrl}Event1.jpg" alt="" usemap="#ly_box1"/></div>
		<a href="#" class="btn_history">한눈에 보는 FIFA월드컵 공인구 역사보기</a>
		<div class="evt2995_history">
			<img src="${param.imgUrl}history_ball.jpg" alt=""/>
			<a href="#" class="close"><img src="${param.imgUrl}btn_close.jpg" alt="레이어 닫기"/></a>
		</div>
	</div>
	<div id="evt2995_2" style="display:none;">
		<div class="evt2995_visual"><img src="${param.imgUrl}Event2.jpg" alt=""/></div>
		<div class="evt2995_jc_tab">
			<ul>
				<li class="m1"><a href="#" class="on"></a></li>
				<li class="m2"><a href="#"></a></li>
				<li class="m3"><a href="#"></a></li>
				<li class="m4"><a href="#"></a></li>
			</ul>
		</div>
		<div class="evt2995_jc_box">
			<img src="${param.imgUrl}bg_clothes1.jpg" alt="" style="display:block;" usemap="#jc_img1"/>
			<img src="${param.imgUrl}bg_clothes2.jpg" alt="" usemap="#jc_img2"/>
			<img src="${param.imgUrl}bg_clothes3.jpg" alt="" usemap="#jc_img3"/>
			<img src="${param.imgUrl}bg_clothes4.jpg" alt="" usemap="#jc_img4"/>
			<map name="jc_img1" id="jc_img1">
				<area shape="rect" coords="541,367,732,398" href="http://shop.adidas.co.kr/PF020401.action?PROD_CD=G87445" onclick="moveProdAction('G87445');return false" alt="독일저지 보러가기"/>
			</map>
			<map name="jc_img2" id="jc_img2">
				<area shape="rect" coords="541,392,732,423" href="http://shop.adidas.co.kr/PF020401.action?PROD_CD=G74569" onclick="moveProdAction('G74569');return false" alt="아르헨티나 저지 보러가기"/>
			</map>
			<map name="jc_img3" id="jc_img3">
				<area shape="rect" coords="541,374,732,405" href="http://shop.adidas.co.kr/PF020401.action?PROD_CD=G86985" onclick="moveProdAction('G86985');return false" alt="멕시코 저지 보러가기"/>
			</map>
			<map name="jc_img4" id="jc_img4">
				<area shape="rect" coords="541,392,732,423" href="http://shop.adidas.co.kr/PF020401.action?PROD_CD=G85279" onclick="moveProdAction('G85279');return false" alt="스페인 저지 보러가기"/>
			</map>
			<map name="ly_box1" id="ly_box1">
				<area shape="rect" coords="45,164,470,418" href="http://www.youtube.com/watch?v=PImQsVsXCrI&feature=youtu.be" alt="영상보러가기" target="_blank"/>
			</map>
		</div>
	</div>
 
</div>
<!-- //contents -->