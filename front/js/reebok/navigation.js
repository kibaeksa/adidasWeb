function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function startCateScrollScroll() {
    setTimeout("slideCateScroll()", 1);
}

function slideCateScroll() {
    var Sel_Height=350; 
        el = document.getElementById("shopping_live");
    if (el.heightPos == null || (el.isDone && el.isOn == false)) {
        el.isDone = false;
        el.heightPos = 0;
        el.heightTo = Sel_Height;
    } else if (el.isDone && el.isOn){
        el.isDone = false;
        el.heightTo = 0; 
    }


    if (Math.abs(el.heightTo - el.heightPos) > 1) {
        el.heightPos += (el.heightTo - el.heightPos) / 13;
        el.style.height = el.heightPos + "px";
        startCateScrollScroll();
    } else {
    if (el.heightTo == Sel_Height) {
        el.isOn = true;
    } else {
        el.isOn = false;
    }
        el.heightPos = el.heightTo;
        el.style.height = el.heightPos + "px";
        el.isDone = true;
    }
}

function fastShopping(){
	   if (document.getElementById("fastSearchCheck").value == "0") {
		   dqSearchAjaxCall();
		   document.getElementById("fastSearchCheck").value = "1";
		}
}

function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName]
	}
	else {
		return document[movieName]
	}
}

function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName]
	}
	else {
		return document[movieName]
	}
}

function shoppingLive(){
	var obj = document.getElementById("shopping_live");
	var obj2 = document.getElementById("fast_shopping");
	var obj3 = document.getElementById("ree_style");
	if(obj.style.display== 'none'){
	   obj.style.display= 'block';
	   obj2.style.display='none';
	   obj3.style.display='none'
	}
	else if(obj.style.display=='block') {
    obj.style.display='none';
	}
}

function shoppingLiveOff(){
	var obj = document.getElementById("shopping_live");
	obj.style.display = 'none';	
}

function reeStyle(){
	if(document.getElementById("ree_style").style.display=="none"){
	   document.getElementById("ree_style").style.display='block';
	   document.getElementById("shopping_live").style.display ='none';
	   document.getElementById("fast_shopping").style.display='none';
	   //topSearchInit();
	   //dqSearchAjaxCall();
	   if (document.getElementById("fastSearchCheck").value == "0") {
		   dqSearchAjaxCall();
		   document.getElementById("fastSearchCheck").value = "1";
		}
	}
	else{
		document.getElementById("ree_style").style.display='none';
	}
}
function topRank(){
	$("shoppingLiveSrchCmd").value = "topRank";

	var param = $("frmShoppingLiveSrch").serialize(true);
	var url = "/reeHeader.action";

	var onSuccess = function(req){
		var json = req.responseJSON;
		JsonUtil.alert(json);

		arr_searchWord = json.searchWord.list;
		var arr_bestLists = [5];
		arr_bestLists[0] = json.bestList1.list;
		arr_bestLists[1] = json.bestList2.list;
		arr_bestLists[2] = json.bestList3.list;
		arr_bestLists[3] = json.bestList4.list;
		arr_bestLists[4] = json.bestList5.list;

		// 인기검색어
		jQuery("#rank_leftarea_body").html("");			
		listHTML = "";
		listHTML += "<ol>";						
		if (arr_searchWord.length >= 5) {
			jQuery("#rank_leftarea_date").html(arr_searchWord[0].DATE);
			for(var i=0; i<5; i++){
				var searchWord = arr_searchWord[i].WORD;
				var updn = arr_searchWord[i].RANKING_UPDOWN;
				listHTML += "<li class='"+updn+"'><a href='RPF050101.action?S_PROD_NM=" + searchWord + "' onmousedown='javascript:fn_trkClickTrace(\"^상단내비^쇼핑라이브^인기검색어^" + searchWord + "\");'><strong class='spt_bg rank num" + (i+1) + "'>" + (i+1) + "</strong><span class='word'>" + searchWord + "</span></a></li>";
			}
		}			
		listHTML += "</ol>";			
		jQuery("#rank_leftarea_body").html(listHTML);

		// 인기검색어 베스트 상품
		for (var i=0;i<arr_bestLists.length;i++) {
			listHTML = "";
			if (arr_bestLists[i].length > 0) {					
				arr_bestList = arr_bestLists[i];					
				for(var j=0; j<arr_bestList.length; j++){
					PROD_CD = arr_bestList[j].PROD_CD;
					PROD_NM_KOR = arr_bestList[j].PROD_NM_KOR;
					FAST_IMG_NM = arr_bestList[j].FAST_IMG_NM;
					ONLINE_ONLY_YN = arr_bestList[j].ONLINE_ONLY_YN;
					listHTML += "<li>";
					if(ONLINE_ONLY_YN=="Y"){
						listHTML += "<span class='oo_label size35'><img src='/images/reebok/common/bg_oo_label_50.png' alt='온라인단독 상품'></span>";
					}
					listHTML += "<a href='/RPF020401.action?PROD_CD=" + PROD_CD + "'><img src='" + FAST_IMG_NM + "' alt='" + PROD_NM_KOR + "'/></a></li>";
				}
				jQuery("#rankprod_slider" + i).html(listHTML);
			}
		}
		jQuery('#top_rank').toprankAction();
	};
	
    var onFailure = function(){
    };
    cfn_ajaxRequest(url, param, onSuccess, onFailure);
    
	document.getElementById("top_rank").style.display='';
	document.getElementById("fast_shopping_r").style.display='none';
}

function topRankOff(){
	 document.getElementById("top_rank").style.display='none';
}

function fastShopping_r(){
	if (document.getElementById("fastSearchCheck").value == "0") {
		dqSearchAjaxCall();
		document.getElementById("fastSearchCheck").value = "1";
	}
	topSearchInit();
	document.getElementById("fast_shopping_r").style.display='';
	document.getElementById("top_rank").style.display='none';
}