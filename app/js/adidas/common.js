//확대보기
function smartView(prodCd,brand, frmNm, srchGb){		

		$("SV_PROD_CD").value = prodCd;
		$("SV_COMMAND").value = 'LIST_2';
		var param = $("frmSmartView").serialize(true);
		var url = "/PF020201.action";
	
		var onSuccess = function(req){
			var json = req.responseJSON;
			JsonUtil.alert(json);
			
			var arr_view = json.prodview.list;
			var arr_color = json.prodcolor.list;
			var arr_size = json.prodsize.list;
			
			var listHTML = "";

			//quick view
			listHTML += "	<div class='leftarea'>";
			listHTML += "		<img src='//image.adidas.co.kr"+"/upload/prod/basic/320/"+arr_view[0].IMG_NM_320+"' alt='' style='margin-bottom:15px'/>";			
			if(arr_view[0].ONLINE_ONLY_YN == "Y"){
				if(arr_view[0].BRAND_AUTH == "1"){
					listHTML += "		<span class='oo_label size320'><img src='//image.adidas.co.kr/images/adidas/common/bg_oo_label_ss.jpg' alt='온라인단독 상품' /></span>";
				} else {
					listHTML += "		<span class='oo_label size320'><img src='//image.adidas.co.kr/images/adidas/common/bg_oo_label_sp.jpg' alt='온라인단독 상품' /></span>";
				}
			}
			
			if(arr_view[0].CLEARANCE_YN == "Y"){
				listHTML += "		<span class='oo_label size320'><img alt='아울렛 상품' src='//image.adidas.co.kr/images/adidas/common/bg_label_olt.jpg' /></span>";
			}
			
			if(arr_view[0].BRAND_AUTH == "1"){
				listHTML += "	<div class='logo ss spt_bg'></div>";
			}else if(arr_view[0].BRAND_AUTH == "2"){
				listHTML += "	<div class='logo sp spt_bg'></div>";
			}else if(arr_view[0].BRAND_AUTH == "SLVR"){
				listHTML += "	<div class='logo slvr spt_bg'></div>";
			}else if(arr_view[0].BRAND_AUTH == "PDS"){
				listHTML += "	<div class='logo pds spt_bg'></div>";
			}
			
			listHTML += " <div class=\"btn_area\">";
			var s_only_buynow_yn = typeof(arr_view[0].ONLY_BUYNOW_YN) == "undefined" ?  "N" : arr_view[0].ONLY_BUYNOW_YN ;
			if (s_only_buynow_yn != "Y") {
				if(typeof(srchGb) != "undefined" && (srchGb == 'srch' || srchGb == 'SPST')) {
					listHTML += " <a href='javascript:fn_cart(\""+arr_view[0].PROD_CD+"\", \""+frmNm+"\", \""+srchGb+"\");' class=\"basket spt_bg\">장바구니</a>";
				} else {
					listHTML += " <a href='javascript:fn_cart(\""+arr_view[0].PROD_CD+"\", \""+frmNm+"\");' class=\"basket spt_bg\">장바구니</a>";
				}
			}
			listHTML += "	  <a href=\"javascript:fn_prod(\'"+arr_view[0].PROD_CD+"\');\" class=\"view spt_bg\">상품상세정보 보기</a>";

			listHTML += "	</div>";
			listHTML += " </div>";
			
			listHTML += "	<div class='rightarea'>";
			listHTML += "		<span class='layer_close' onclick='quickLayerClose();'><img src='//image.adidas.co.kr/images/adidas/common/btn_layer_close.gif' alt='닫기'/></span>";
			listHTML += "		<div class='view_top'>";
			listHTML += "			<h2><a href=\"javascript:fn_prod(\'"+arr_view[0].PROD_CD+"\')\" >"+arr_view[0].PROD_NM_KOR+"</a></h2>";
			listHTML += "			<div class='pop_level spt_bg'>";
			listHTML += "				<div class='spt_bg point"+arr_view[0].EVAL_RATING_VIEW+"'></div>";
			listHTML += "			</div>";
			listHTML += "			<a href=\"javascript:fn_prod_eval(\'"+arr_view[0].PROD_CD+"\')\" class='go_review'>상품평 전체보기</a>";
			listHTML += "		</div>";
			
			listHTML += "		<div class='view_bottom'>";
			listHTML += "			<div class='view_prodinfo1'>";
			listHTML += "				<dl>";
			listHTML += "					<dt class='arial'>";
			listHTML += "						<strong>COLOR</strong>";
			listHTML += "						<span>"+arr_view[0].COLOR_NM+"("+arr_view[0].PROD_CD+")</span>";
			listHTML += "					</dt>";
			listHTML += "					<dd>";
			listHTML += "						<ul>";

			for(var i=0; i<arr_color.size(); i++){
				if(arr_view[0].PROD_CD==arr_color[i].PROD_CD){
					listHTML += "					<li><a class='on'><img src='//image.adidas.co.kr"+"/upload/prod/basic/55/"+arr_color[i].IMG_NM_55+"' alt=''/>";
				}else{
					listHTML += "					<li><a href='javascript:smartView(\""+arr_color[i].PROD_CD+"\",\""+brand+"\", \""+frmNm+"\");'><img src='//image.adidas.co.kr"+"/upload/prod/basic/55/"+arr_color[i].IMG_NM_55+"' alt=''/>";
				}
				if(arr_color[i].ONLINE_ONLY_YN == "Y"){
					if(arr_color[i].BRAND_AUTH == "1"){
						listHTML += "		<span class='oo_label size55'><img src='//image.adidas.co.kr/images/adidas/common/bg_oo_label_ss_50.jpg' alt='온라인단독 상품' /></span>";
					} else {
						listHTML += "		<span class='oo_label size55'><img src='//image.adidas.co.kr/images/adidas/common/bg_oo_label_sp_50.jpg' alt='온라인단독 상품' /></span>";
					}
				}
				if(arr_color[i].CLEARANCE_YN == "Y"){
					listHTML += "		<span class='oo_label size55'><img alt='아울렛 상품' src='//image.adidas.co.kr/images/adidas/common/bg_label_olt.jpg' /></span>";
				}
				
				listHTML += "					</a></li>";
			}
			
			listHTML += "						</ul>";
			listHTML += "					</dd>";
			listHTML += "				</dl>";
			listHTML += "			</div>";
			listHTML += "			<div class='view_prodinfo2'>";
			listHTML += "				<dl>";
			listHTML += "					<dt class='arial'>";
			listHTML += "						<strong>SIZE</strong>";
			if(arr_view[0].FIT_CD!=""){
				listHTML += "					<span><img src='//image.adidas.co.kr/images/adidas/common/bg_size_label"+arr_view[0].FIT_CD+".gif' alt=''/></span>";
			}
			listHTML += "					</dt>";
			listHTML += "					<dd>";
			listHTML += "						<ul>";
			for(var j=0; j<arr_size.size(); j++){
				if(arr_size[j].REAL_INVNTRY_QTY==0){
					listHTML += "					<li><span>"+arr_size[j].OPTION_NM+"</span></li>";
				}else{
					listHTML += "					<li><a>"+arr_size[j].OPTION_NM+"</a></li>";
				}
			}
			listHTML += "						</ul>";
			listHTML += "					</dd>";
			listHTML += "				</dl>";
			listHTML += "			</div>";
			listHTML += "		</div>";
			listHTML += "		<div class='view_price'>";
			listHTML += "			<div class='price'>";
			if(arr_view[0].SALE_YN=="Y"){
				listHTML += "			<span class='line_through'>"+arr_view[0].NORML_PRICE+"원</span>";
				listHTML += "			<span class='sale'><em>"+arr_view[0].SALES_PRICE+"</em> 원</span>";
			}else{
				listHTML += "			<span><em>"+arr_view[0].NORML_PRICE+"</em> 원</span>";
			}
			listHTML += "			</div>";
			
			if(parseInt(arr_view[0].P_PRE_SALES_PRICE) > parseInt(arr_view[0].P_SALES_PRICE) && parseInt(arr_view[0].P_PRE_SALES_PRICE) != parseInt(arr_view[0].P_NORML_PRICE)){
			listHTML += "<div class=\"sale_info_qly\">";
			listHTML += "	<span class=\"btn\">이전판매가격</span>";
			listHTML += "	<div class=\"cont\">";
			listHTML += "		<h6>이전 판매가격 정보</h6>";
			listHTML += "		<dl>";
			listHTML += "			<dt>최초 출시가</dt>";
			listHTML += "			<dd>"+arr_view[0].NORML_PRICE+"원</dd>";
			listHTML += "		</dl>";
			listHTML += "		<dl>";
			listHTML += "			<dt>이전 할인 판매가</dt>";
			listHTML += "			<dd>"+arr_view[0].PRE_SALES_PRICE+"원</dd>";
			listHTML += "		</dl>";
			listHTML += "		<dl class=\"result\">";
			listHTML += "			<dt>현재 판매가</dt>";
			listHTML += "			<dd><strong>"+arr_view[0].SALES_PRICE+"원</strong></dd>";
			listHTML += "		</dl>";
			listHTML += "	</div>";
			listHTML += "</div>";
			}
			
			listHTML += "		</div>";
			listHTML += "	</div>";
			jQuery("#quickview").html("");
			jQuery("#quickview").html(listHTML);

			//퀵뷰 레이어에 있는 할인안내 
			jQuery('.sale_info_qly').hover(function(){
				jQuery(this).addClass('open');
				jQuery(this).find('.cont').show();
			},function(){
				jQuery(this).removeClass('open');
				jQuery(this).find('.cont').hide();
			});

		};
		var onFailure = function(){		    
		};
	
		cfn_ajaxRequest(url, param, onSuccess, onFailure);
		quickLayerOpen();
}
//상품평바로가기
function fn_prod_eval(arg){
	var url = "http://" + location.host + "/PF020401.action?PROD_CD="+arg+"&eval=yes#tab2";
	jQuery("#frmProdEval").attr('action',url).submit();
}
//상품상세바로가기
function fn_prod(arg){
	var url = "http://" + location.host + "/PF020401.action?PROD_CD="+arg;
	jQuery("#frmProdEval").attr('action',url).submit();
}
//상품상세바로가기_miadidas
function fn_prod_mi(arg){
	var url = "http://" + location.host + "/PF020701.action?PROD_CD="+arg;
	jQuery("#frmProdEval").attr('action',url).submit();
}
//상품상세바로가기_miadidas
function fn_prod_mi_u(prod_cd, recipe, update){
	var url = "http://" + location.host + "/PF020701.action?PROD_CD="+prod_cd+"&recipe="+recipe+"&update="+update;
	top.location.href = url;
}

//장바구니 등록
function fn_cart(prodCd, pFrmNm, srchGb){
	
	var memType = $("SS_MEM_TYPE").value;	
	var process = true;
	
	/*
	20130917 비회원 장바구니 등록 가능으로 변경
	if(memType != null) {
		if(!(memType == "R")) {
			process = false;
			fn_logIn();
		}
	}else {
		process = false;
		fn_logIn();
	}	*/
	
	if(prodCd == V_HD_LIMIT_PROD_CD) {
		process = false;
		alert("본 상품은 바로구매만 가능합니다.");
		fn_prod(prodCd);
		return;
	}
	
	if(process) {		
		$("PROD_CD").value = prodCd;
		if(typeof(srchGb) != "undefined" && srchGb == 'srch') {
			$("S_COMMAND1").value = 'INSERT';
		} else if(typeof(srchGb) != "undefined" && srchGb == 'SPST') {
			document.frmList.PROD_CD.value = prodCd;
			$("S_COMMAND").value = 'INSERT';
		} else {
			$("S_COMMAND").value = 'INSERT';
		}

		var param = $(pFrmNm).serialize(true);
		var url = "/PF020201.action";
		var onSuccess = function(req){			
			var json = req.responseJSON;			
			
			var msg = json.msg;
			if(json.stSize == 0) {
				if(confirm(msg)) {
					var url = "/PF030101.action";
					location.href=url;
				}else {
					for(var i=0;i<json.quick.list.size();i++) {
						if(json.quick.list[i].GUBUN == "cart") {
							V_HD_MEM_CART_CNT = json.quick.list[i].CNT;
							var v_itemText = "Item";
							if(parseInt(json.quick.list[i].CNT) > 1) {
								v_itemText = "Items";
							}
							document.getElementById("span_cart_cnt").innerHTML ="(<strong>"+json.quick.list[i].CNT+"</strong> <em>"+v_itemText+"</em>)";
							document.getElementById("strong_cart_cnt").innerHTML = json.quick.list[i].CNT+"개";
						}
					}							
				}
			}else {
				alert(msg);	
			}				
		};
		
		var onFailure = function(){			
		};

		
		cfn_ajaxRequest(url, param, onSuccess, onFailure);
	}	
}	

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

/* 회원쿠폰 발급 */
function fn_MemCpnIns(pCpnId){
	try {
		if(typeof(execIng) != "undefined" && execIng == true) {
			alert("처리중 입니다.");
			return;
		}
		execIng = true;
		
		var url = "/PF070202.action";
		var param = "?command=insertCpnPublMem";
		param += "&CPON_ID="+pCpnId;
		
		var onSuccess = function(req){
		    execIng = false;
			var json = req.responseJSON;				// 요청에 대한 대답을 json으로

			JsonUtil.alert(json);						// 메시지 처리
			
			if(JsonUtil.isError(json)){					// 정상 처리 라면
				if(Number(json.key) == -3) {	// 로그아웃 상태인경우
					fn_logIn(0);
				}
			}
		};

	    var onFailure = function(){
		    execIng = false;
		    JsonUtil.alert(json);						// 메시지 처리
	    };
		cfn_ajaxRequest(url, param, onSuccess, onFailure);
		
		
	} catch (e) {
		alert("스크립트오류가 발생했습니다.\n" + e.message);
	    execIng = false;
	}
}
