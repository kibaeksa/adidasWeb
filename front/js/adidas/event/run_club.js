	// 아디클럽
	function viewDiv(flag){
		document.location.href = "/PF080101.action?showDiv="+flag;
	}
	// MY 아디클럽
	function fn_mypage() {
		if(SS_MEM_ID != "null" && SS_MEM_TYPE=="R") {
			document.location.href = "/PF060100.action";
		} else { 
			fn_logIn(1);
		}
	}
	// 재발급 신청
	function fn_card() {
		if(SS_MEM_ID != "null" && SS_MEM_TYPE=="R") {
			window.open('/PF060903.action','popup','width=480,height=545,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,left=150,top=100');	
		} else { 
			alert("로그인 후 재발급 신청이 가능합니다.");
		} 
	}
	// 스마트폰 소지여부 확인하기
	function fn_myinfo() {
		if(SS_MEM_ID != "null" && SS_MEM_TYPE=="R") {
			document.location.href = "/PF060401.action";
		} else { 
			alert("로그인 후 확인이 가능합니다.");
		} 
	}
	// 회원 가입하기
	function fn_join() {
		if(SS_MEM_ID != "null" && SS_MEM_TYPE=="R") {
			alert("이미 로그인 중입니다.");
		} else { 
			document.location.href = "/PF0601001.action";
		} 
	}
	// KOREAN / ENGLISH
	function fn_adiclub(flag) {
		if (flag=="KOREAN")
			document.location.href = "PF080101.action?showDiv="+jQuery("#showDiv").val();
		else
			document.location.href = "PF080101Eng.action?showDiv="+jQuery("#showDiv").val();
	}
	
	// 아디클럽 러닝
	function fn_runclub() {
		document.location.href = "/PF080501.action";
	}

	// 러닝 마일리지 샵 바로가기
	function fn_goMlgShop(){
		document.location.href = "/PF080507.action";
	}

	// 러닝 혜택 바로가기
	function fn_goRunBnft(){
		document.location.href = "/PF080507.action?command=runBnft";
	}
	
	// 러닝 마일리지 적립 방법 바로가기
	function fn_goMlgSaveInfo(){
		document.location.href = "/PF080507.action?command=runMlgSvMthd";
	}
	
	// 러닝 마일리지 적립 제품 바로가기
	function fn_goMlgSaveProd(){
		document.location.href = "/PF080507.action?command=runMlgSvProd";
	}
	
	// 러닝 FAQ 바로가기
	function fn_goRunFaq(pShowDiv, pDtlDiv){
		var goQnaDiv = '';
		var goDtlDiv = '';
		if(typeof(pShowDiv) != "undefined") {
			goQnaDiv = pShowDiv;
		}
		if(typeof(pDtlDiv) != "undefined") {
			goDtlDiv = pDtlDiv;
		}
		document.location.href = "/PF080507.action?command=runFaq&showDiv="+goQnaDiv+"&dtlDiv="+goDtlDiv;
	}
	
	function fn_goDblMlgProd() {
		document.location.href = "/PF050101.action?S_PROD_NM=%EC%95%84%EB%94%94%ED%81%B4%EB%9F%BD+%EB%9F%AC%EB%8B%9D+%EB%8D%94%EB%B8%94+%EB%A7%88%EC%9D%BC%EB%A6%AC%EC%A7%80+%EC%A0%9C%ED%92%88";
	}
	
	// 러닝레터 및 SMS 수신거부
	function fn_rejectMail(){
		var url = "/PF080501.action";
		var param = "command=updateRjctEmailSms";

		var onSuccess = function(req){
			var json = req.responseJSON;
			JsonUtil.alert(json);
			if(JsonUtil.isError(json)){
				var result = json.result;
				var point = json.LIKE_POINT;
				
				if(Number(json.key) == -3) {	// 로그아웃 상태인경우
					fn_logIn('0');
				}
			}
		};
	
	    var onFailure = function(){
	    	alert("러닝레터 및 SMS 수신거부 처리 중 오류가 발생하였습니다.");
	    };
	    
		cfn_ajaxRequest(url, param, onSuccess, onFailure);
	}
	
	// 더블 러닝 마일리지 제품 보러가기
	function fn_goBadgeProd(){
		document.location.href = "/PF050101.action?S_PROD_NM=%EC%95%84%EB%94%94%ED%81%B4%EB%9F%BD+%EB%9F%AC%EB%8B%9D+%EB%8D%94%EB%B8%94+%EB%A7%88%EC%9D%BC%EB%A6%AC%EC%A7%80+%EC%A0%9C%ED%92%88";
	}

	// 마일리지 내역 레이어 열기
	function openMlgLayer() {
		fn_search(1);
	}

	//마일리지 내역 레이어 닫기
	function closeMlgLayer() {
		jQuery("#div_dim").hide();
		jQuery("#div_mlg_list").hide();
	}

	function fn_frgiftCncl(pSeqNo) {
		if(execIngTf) {
			alert("처리중입니다.");
			return;
		}
		
		execIngTf = true;
		
		$("command").value = 'updateCnclMlgShop';
		$("SEQ_NO").value = pSeqNo;
		var param = "command=updateCnclMlgShop&SEQ_NO=" + pSeqNo;
		var url = "/PF080507.action";
		
		var onSuccess = function(req){
			var json = req.responseJSON;
			JsonUtil.alert(json);

			if(Number(json.key) == -3) {	// 로그아웃 상태인경우 
				fn_logIn(0);
			} else if(Number(json.key) == 0) {	// 정상처리 
				location.reload();
			}
			
			execIngTf = false;
		};

		var onFailure = function(){
			alert("error");
			execIngTf = false;
		};				

		cfn_ajaxRequest(url, param, onSuccess, onFailure);		
	}
	
	function fn_search(page) {
		
		if(cfn_isUndefined(page)) {
	   		$("S_PAGE").value = 1;
	  	} else {
	  	 	$("S_PAGE").value = page;
	  	}
		
		var url = "/PF080507.action";
		var param = "?command=VIEW_1";
		param += "&PAGE_CUR=" + $("S_PAGE").value;

		var onSuccess = function(req){
			var json = req.responseJSON;
			JsonUtil.alert(json);
			
			if(Number(json.key) == -3) {	// 로그아웃 상태인경우
				jQuery("#div_dim").hide();
				jQuery("#div_mlg_list").hide();
				fn_logIn(1);
				return;
			}

			if(typeof(json.adimtList) == "undefined") {
				alert("아디클럽 러닝 회원이 아닙니다.");
				return;
			} 

			arr_list = json.adimtList.list;	
			arr_cnt = arr_list.size();

			jQuery("#div_mlg_list").html("");

			var listHtml = "";
			
	        listHtml += "<h4 class=\"title2\"><img src=\""+V_IMG_PATH+"/images/adidas/club/2015rc/title_layer2.png\" alt=\"나의 러닝 마일리지 누적/차감 내역\" /></h4> \n";
			listHtml += "<div class=\"point_box2\"> \n";
			listHtml += "	<div> \n";
			listHtml += "		<dl> \n";
			listHtml += "			<dt>적립 예정 마일리지</dt> \n";
			listHtml += "			<dd>"+ json.WAIT_ADIMETER +"</dd> \n";
			listHtml += "		</dl> \n";
			listHtml += "		<dl> \n";
			listHtml += "			<dt>잔여 마일리지 </dt> \n";
			listHtml += "			<dd class=\"color_ty1\">"+ json.AVAIL_ADIMETER +"</dd> \n";
			listHtml += "		</dl> \n";
			listHtml += "	</div> \n";
			listHtml += "</div> \n";
			listHtml += "<div class=\"data_table\"> \n";
			listHtml += "	<table summary=\"일자, 구분, 내용, 구매금액, 러닝마일리지\"> \n";
			listHtml += "		<caption>나의 러닝 마일리지 누적/차감 내역</caption> \n";
			listHtml += "		<colgroup> \n";
			listHtml += "			<col style=\"width:10%\" /> \n";
			listHtml += "			<col style=\"width:15%\" /> \n";
			listHtml += "			<col style=\"width:*\" /> \n";
			listHtml += "			<col style=\"width:15%\" /> \n";
			listHtml += "			<col style=\"width:20%\" /> \n";
			listHtml += "		</colgroup> \n";
			listHtml += "		<thead> \n";
			listHtml += "		<tr> \n";
			listHtml += "			<th scope=\"col\">일자</th> \n";
			listHtml += "			<th scope=\"col\">구분</th> \n";
			listHtml += "			<th scope=\"col\">내용</th> \n";
			listHtml += "			<th class=\"text_right\" scope=\"col\">구매금액</th> \n";
			listHtml += "			<th class=\"text_right\" scope=\"col\">러닝마일리지</th> \n";
			listHtml += "		</tr> \n";
			listHtml += "		</thead> \n";
			listHtml += "		<tbody> \n";
			
			if(arr_cnt > 0){
				for(var i=0; i<arr_cnt; i++){
					listHtml += "		<tr> \n";
					listHtml += "			<td class=\"text_center\">" + arr_list[i].SAVE_DY_DISP + "</td> \n";
					listHtml += "			<td class=\"text_center\">" + arr_list[i].SAVE_TYPE_NM + "</td> \n";

					listHtml += "			<td>" + arr_list[i].SAVE_DESC;
			        if(arr_list[i].SAVE_TYPE == '09') {
			        	if(V_CUR_WEEK == arr_list[i].APPL_WEEK) {
							listHtml += "<a href=\"javascript:fn_frgiftCncl('" + arr_list[i].SEQ_NO + "');\"><img src=\""+V_IMG_PATH+"/images/adidas/club/2015rc/btn_cencle.png\" alt=\"신청취소\" /></a>";
			        	} else {
					        if(arr_list[i].SEND_ST == "01") {
								listHtml += "<img src=\""+V_IMG_PATH+"/images/adidas/club/2015rc/btn_ing.png\" alt=\"발송중\" />";
					        } else if(arr_list[i].SEND_ST == "03") {
								listHtml += "<img src=\""+V_IMG_PATH+"/images/adidas/club/2015rc/btn_complete.png\" alt=\"발송완료\" />";
					        }
			        	}
			        }					
					listHtml += "</td> \n";
					
					listHtml += "			<td class=\"text_right\"><em>" + toCurrency(arr_list[i].SALES_AMT) + "</em>원</td> \n";
					listHtml += "			<td class=\"text_right\">" + toCurrency(arr_list[i].ADIMETER) + "</td> \n";
					listHtml += "		</tr> \n";
				}
			}
			listHtml += "		</tbody> \n";
			listHtml += "	</table> \n";
			listHtml += "</div> \n";
			listHtml += "<div class=\"paging3\"> \n";
			listHtml += json.pageeval;
			listHtml += "</div> \n";
			listHtml += " \n";
			listHtml += "<a class=\"close\" href=\"javascript:closeMlgLayer();\"><img src=\""+V_IMG_PATH+"/images/adidas/club/2015rc/btn_close.png\" alt=\"마일리지내역 레이어팝업 닫기\" /></a> \n";			
			
			jQuery("#div_mlg_list").html(listHtml);
			jQuery("#div_dim").show();
			jQuery("#div_mlg_list").show();
		};
		
	    var onFailure = function(){
	    	alert("error");
			jQuery("#div_dim").hide();
			jQuery("#div_mlg_list").hide();
	    };
	    
		cfn_ajaxRequest(url, param, onSuccess, onFailure);
	}
	