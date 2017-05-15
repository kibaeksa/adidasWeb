<%@page language="java" contentType="text/html; charset=UTF-8" %>
<style type="text/css">
	.prm5314{}
	.prm5314 .btn_spt{
		display: block;
		background:url('http://image.adidas.co.kr${param.imgUrl}btn.png?v=160509') 0 0 no-repeat;
	}

	.prm5314 .fnc_training .navi{
		width:886px;
		height: 104px;
		position: relative;
		overflow: hidden;
		padding: 0 32px;
	}

	.prm5314 .fnc_training .navi .navi_slider{
		width: 886px;
		height: 104px;
		position: relative;
		overflow: hidden;
		z-index: 8;
	}

	.prm5314 .fnc_training .navi .navi_slider ul{
		width: 100000px;
		height: 104px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.prm5314 .fnc_training .navi .navi_slider ul li{
		width: 177px;
		height: 104px;
		position: relative;
		float: left;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li a{
		width: 177px;
		height: 104px;
		display: block;
		background-position:-290px 0;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li:nth-child(odd) a{
		background-position:-100px 0;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li.active a{
		background:url('http://image.adidas.co.kr${param.imgUrl}navi.png?v=161027') 0 0 no-repeat;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b1 a{
		background-position:right 0;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b1.on a{
		background-position:0 0;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b2 a{
		background-position:right -109px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b2.on a{
		background-position:0 -109px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b3 a{
		background-position:right -220px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b3.on a{
		background-position:0 -220px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b4 a{
		background-position:right -329px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b4.on a{
		background-position:0 -329px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b5 a{
		background-position:right -439px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b5.on a{
		background-position:0 -439px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b6 a{
		background-position:right -549px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b6.on a{
		background-position:0 -549px;
	}

		.prm5314 .fnc_training .navi .navi_slider ul li#b7 a{
		background-position:right -655px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li#b7.on a{
		background-position:0 -655px;
	}

	.prm5314 .fnc_training .navi .navi_slider ul li.on .line{
		width: 165px;
		height: 92px;
		display: block;
		border:6px solid #f7010f;
		position: absolute;
		top: 0;
		left: 0;
	}

	.prm5314 .fnc_training .navi .prev,
	.prm5314 .fnc_training .navi .next{
		position: absolute;
		top: 0;
		left: 0;
		width: 32px;
		height: 104px;
		z-index: 10;
	}

	.prm5314 .fnc_training .navi .next{
		left: auto;
		right: 0;
		background-position:-50px 0;
	}

	.prm5314 .fnc_training .cont{
		position: relative;		
	}

	.prm5314 .fnc_training .cont .box{
		display: none;
	}

</style>


<div style="position:relative;" class="prm5314">
	<div class="visual">
		<img src="http://image.adidas.co.kr${param.imgUrl}visual.jpg?v=161026" alt="" />
	</div>

	<div class="fnc_training">
		<div class="navi">
			<a href="javascript:void(0)" class="btn_spt prev"></a>
			<div class="navi_slider" data-position="2">
				<ul>
					<li id="b1" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b2" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b3" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b4" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b5" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b6" class="active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
					<li id="b7" class="on active">
						<a href="javascript:void(0)" class="btn_spt"></a>
						<span class="line"></span>
					</li>
				</ul>	
			</div>
			<a href="javascript:void(0)" class="btn_spt next"></a>
		</div>	

		<div class="cont">
			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160407.jpg?v=160610" alt="" border="0" usemap="#fn_t_map1" />
				<map name="fn_t_map1" id="fn_t_map1">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(0);"/>

					<area shape="rect" coords="53,980,134,1002" href="/PF020401.action?PROD_CD=AJ4892" alt="TF POWER SS"/>
					<area shape="rect" coords="53,1197,134,1221" href="/PF020401.action?PROD_CD=AJ6104" alt="TF BASE TIGHT"/>
					<area shape="rect" coords="738,976,820,997" href="/PF020401.action?PROD_CD=AF5464"/>
					<area shape="rect" coords="738,1168,820,1190" href="/PF020401.action?PROD_CD=AK0940" alt="KASANE SHROTS"/>
				</map>
			</div>

			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160509.jpg?v=2" alt="" border="0" usemap="#fn_t_map2" />
				<map name="fn_t_map2" id="fn_t_map2">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(1);"/>

					<area shape="rect" coords="32,901,95,919" href="/PF020401.action?PROD_CD=AJ4946" alt="TF POWER SS"/>
					<area shape="rect" coords="32,1224,95,1242" href="/PF020401.action?PROD_CD=AF5464" alt="TF BASE TIGHT"/>
					<area shape="rect" coords="762,900,825,918" href="/PF020401.action?PROD_CD=AJ5505"/>
					<area shape="rect" coords="764,1086,825,1104" href="/PF020401.action?PROD_CD=AJ4799" alt="KASANE SHROTS"/>
					<area shape="rect" coords="764,1278,825,1296" href="/PF020401.action?PROD_CD=AJ4922" alt="KASANE SHROTS"/>
				</map>
			</div>

			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160610.jpg?v=2" alt="" border="0" usemap="#fn_t_map3" />
				<map name="fn_t_map3" id="fn_t_map3">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(2);"/>

					<area shape="rect" coords="32,950,95,970" href="/PF020401.action?PROD_CD=AJ4937" alt="TF CHILL GFX SS"/>
					<area shape="rect" coords="32,1330,95,1350" href="/PF020401.action?PROD_CD=AJ5044" alt="TF BASE ST"/>
					<area shape="rect" coords="762,954,825,974" href="/PF020401.action?PROD_CD=AO2920" alt="CLIMACHILL TEE"/>
					<area shape="rect" coords="764,1147,825,1167" href="/PF020401.action?PROD_CD=AI3985" alt="CLIMACHILL SHO"/>
					<area shape="rect" coords="764,1340,825,1360" href="/PF020401.action?PROD_CD=AF5464" alt="adipure 360.3 M"/>
				</map>
			</div>

			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160712.jpg?v=2" alt="" border="0" usemap="#fn_t_map4" />
				<map name="fn_t_map4" id="fn_t_map4">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(3);"/>

					<area shape="rect" coords="33,945,104,965" href="/PF020401.action?PROD_CD=S94476" alt="LIFTER GFX TEE"/>
					<area shape="rect" coords="33,1309,104,1329" href="/PF020401.action?PROD_CD=AY7903" alt="A2G HIGH END"/>
					<area shape="rect" coords="763,952,834,972" href="/PF020401.action?PROD_CD=AF5464" alt="adipure 360.3 M"/>
					<area shape="rect" coords="763,1146,834,1166" href="/PF020401.action?PROD_CD=AY3673" alt="TF CHILL SS"/>
					<area shape="rect" coords="763,1320,834,1340" href="/PF020401.action?PROD_CD=AY8367" alt="TF CHILL SHORT"/>
				</map> 
			</div>

			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160809.jpg?v=2" alt="" border="0" usemap="#fn_t_map5" />
				<map name="fn_t_map5" id="fn_t_map5">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(4);"/>

					<area shape="rect" coords="33,945,104,965" href="/PF020401.action?PROD_CD=AF5464" alt="adipure 360.3 M"/>
					<area shape="rect" coords="33,1309,104,1329" href="/PF020401.action?PROD_CD=AY3668" alt="TF POWER SS"/>
					<area shape="rect" coords="763,952,834,972" href="/PF020401.action?PROD_CD=AI3326" alt="TF POWER TIGHT"/>
					<area shape="rect" coords="763,1146,834,1166" href="/PF020401.action?PROD_CD=S94454" alt="GRADIENT TEE"/>
					<area shape="rect" coords="763,1339,834,1359" href="/PF020401.action?PROD_CD=S94499" alt="A2G CHALK"/>
				</map> 
			</div>

			<div class="box">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_160930.jpg?v=2" alt="" border="0" usemap="#fn_t_map6" />
				<map name="fn_t_map6" id="fn_t_map6">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(5);"/>

					
				</map> 
			</div>

			<div class="box" style="display: block;">
				<img src="http://image.adidas.co.kr${param.imgUrl}cont_161026.jpg?v=2" alt="" border="0" usemap="#fn_t_map7" />
				<map name="fn_t_map7" id="fn_t_map7">
					<area shape="rect" coords="35,238,915,685" href="javascript:void(0)" onclick="viewVideo(6);"/>

					<area shape="rect" coords="10,955,97,974" href="/PF020401.action?PROD_CD=B43036" alt="adipure 360.3 M"/>
					<area shape="rect" coords="10,1145,97,1164" href="/PF020401.action?PROD_CD=AY3759" alt="TF POWER SS"/>
					<area shape="rect" coords="10,1355,97,1374" href="/PF020401.action?PROD_CD=S94504" alt="TF POWER TIGHT"/>
					<area shape="rect" coords="762,966,849,985" href="/PF020401.action?PROD_CD=AZ1288" alt="GRADIENT TEE"/>
					<area shape="rect" coords="762,1144,849,1163" href="/PF020401.action?PROD_CD=AF5464" alt="A2G CHALK"/>
					<area shape="rect" coords="762,1350,849,1369" href="/PF020401.action?PROD_CD=AY3768" alt="A2G CHALK"/>
				</map> 
			</div>

		</div>
	</div>
	

</div>
<script type="text/javascript">	
	var viewVideo;
	;(function($){	
		var videoAry = [
			'<iframe name="f29fbbc602a8e88" width="950px" height="533.984px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="fb:video Facebook Social Plugin" src="http://www.facebook.com/v2.5/plugins/video.php?app_id=&amp;autoplay=true&amp;hd=true&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df262fe43f679904%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%252Ff18b908184a8c1%26relation%3Dparent.parent&amp;container_width=950&amp;href=https%3A%2F%2Fwww.facebook.com%2FMenshealthkorea%2Fvideos%2Fvb.403600426392425%2F993000520785743%2F%3Ftype%3D2%26theater&amp;locale=ko_KR&amp;sdk=joey&amp;width=950" style="border: none; visibility: visible; width:950px; height:533.984px;" class=""></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/JDPyR_6aBy8?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/G1q91YhugS8?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/fRhect0sxYo?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/e4J5IR8lNOY?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/XGPWacb9y-0?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>',
			'<iframe width="950" height="533.984" src="https://www.youtube.com/embed/xTSsY8yiq50?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'
		];

		var index = 0;
		var length = $()

		var naviBtn = $('.fnc_training .navi_slider>ul>li');
		var contBox = $('.fnc_training .cont>.box');

		naviBtn.bind('click',function(){
			console.log(!$(this).hasClass('active'));

			if( !$(this).hasClass('active') || $(this).hasClass('on') ){
				return false;
			}

			index = $(this).index();

			naviBtn.removeClass('on');
			contBox.hide();

			$(this).addClass('on');
			contBox.eq(index).show();
		});

		viewVideo = function(videoIdx){
			if(videoAry[videoIdx] == undefined){
				alert('준비중입니다.');
				return false;
			}
			var overlay = '<div id="overlay" style="width:100%;height:'+$(window).height()+'px;position:fixed;top:0;left:0;z-index:10000;background:#000;opacity:0.5;-ms-filter: alpha(opacity=50);filter: alpha(opacity=50);"></div>';
			var video_box = '<div id="video_box" style="width:950px;height:533.984px;position:fixed;top:50%;left:50%;margin:-250px 0 0 -475px;z-index:10001;background:#000;">';
			video_box += '<a id="close_video" href="#" style="position:absolute; right:0px; top:-50px"><img src="http://image.adidas.co.kr/images/adidas/event/sports16/sports16_btn_close.gif" alt="닫기" /></a>';
				video_box += videoAry[videoIdx];
			video_box += '</div>';

			$('body').prepend(overlay);
			$('body').prepend(video_box);
			
			$('#overlay').click(function(){
				$('#overlay').remove();
				$('#video_box').remove();
			});

			$('#close_video').click(function(){
				$('#overlay').remove();
				$('#video_box').remove();
				return false;
			});

			return false;
		};

		(function(){
			var viewIndex = $('.navi_slider').attr('data-position');
			var viewCount = 5;			
			var index;
			var length = $('.navi_slider li').length;
			var viewLimited = length - viewCount;
			var moveValue = -177;

			$('.navi_slider li').each(function(){
				if($(this).hasClass('on')){
					index =  $(this).index();
				}
			});			

			if(viewIndex != undefined){
				$('.navi_slider ul').css({
					left : moveValue * viewIndex
				});
			}

			$('.fnc_training .prev').bind('click',function(){
				if(viewIndex > 0){
					viewIndex -= 1;
				}else{
					return;
				}

				$('.navi_slider ul').stop().animate({
					left : moveValue * viewIndex
				});

			});

			$('.fnc_training .next').bind('click',function(){
				if(viewIndex < viewLimited){
					viewIndex += 1;
				}else{
					return;
				}

				$('.navi_slider ul').stop().animate({
					left : moveValue * viewIndex
				});
			});

		})();

		
	
	})(jQuery);
</script>