var loc1;
var loc3;
var isRolling1=false;
var isRolling2=false;
var isRolling3=false;
var isMatchOver=false;



/* BOOK MAIN LIST */

function fn_style_MainLeft(){
	if(isRolling1){
		return;
	}
	isRolling1=true;
	var prod_list=[];
	prod_list=jQuery('div.lookbook_slide div.slide_wrap li');
	var move_val=262;
	var prod_list_length=prod_list.length;
	var prod_left_val=parseInt(jQuery('div.lookbook_slide div.slide_wrap').css('left'));
	loc1=Math.abs(prod_left_val/move_val);


	if(loc1==0){
		loc1=prod_list.length-3
		jQuery('div.lookbook_slide div.slide_wrap').css('left',((-loc1)*move_val)+'px')
		jQuery('div.lookbook_slide div.slide_wrap').animate({
			left:'+=262px'
		},300);
	}
	else{
		loc1--;
		jQuery('div.lookbook_slide div.slide_wrap').animate({
			left:(-loc1)*move_val+'px'
		},300);

	}

	setTimeout('isRolling1=false',310);

}


function fn_style_MainRight(){
	if(isRolling1){
		return;
	}
	isRolling1=true;
	var prod_list=[];
	prod_list=jQuery('div.lookbook_slide div.slide_wrap li');
	var move_val=262;
	var prod_list_length=prod_list.length;
	var prod_left_val=parseInt(jQuery('div.lookbook_slide div.slide_wrap').css('left'));
	loc1=Math.abs(prod_left_val/move_val);


	if(loc1==prod_list.length-3){
		loc1=0;
		jQuery('div.lookbook_slide div.slide_wrap').css('left','0px')
		jQuery('div.lookbook_slide div.slide_wrap').animate({
			left:'-=262px'
		},300);
	}
	else{
		loc1++;
		jQuery('div.lookbook_slide div.slide_wrap').animate({
			left:-(loc1)*move_val+'px'
		},300);

	}
	
	setTimeout('isRolling1=false',310);

}

/* //BOOK MAIN LIST */


/* BOOK GALLERY LIST */


function fn_style_GalltLeft(){
	if(isRolling2){
		return;
	}
	isRolling2=true;
	var prod_list=[];
	prod_list=jQuery('div.gallery_slide div.slide_wrap li');
	var move_val=780;
	var prod_list_length=prod_list.length;
	var prod_left_val=parseInt(jQuery('div.gallery_slide div.slide_wrap').css('left'));
	var tit_idx;


	if(prod_left_val==0){
		jQuery('div.gallery_slide div.slide_wrap').css('left',-((prod_list_length-1)*move_val)+'px')
		jQuery('div.gallery_slide div.slide_wrap').animate({
			left:'+=780px'
		},300);
		setTimeout(function(){
			jQuery('div.list_length strong').text(Math.abs( (prod_list_length-1)*move_val)/move_val );
			
			jQuery('div.gallery_top h5').text( jQuery(prod_list[prod_list_length-2]).find('span').text() );
		},305);
	}
	else{
		jQuery('div.gallery_slide div.slide_wrap').animate({
			left:'+='+move_val+'px'
		},300);
		setTimeout(function(){
			tit_idx=Math.abs( (prod_left_val/move_val)+1);
			jQuery('div.list_length strong').text(Math.abs(prod_left_val/move_val));
			jQuery('div.gallery_top h5').text(jQuery(prod_list[tit_idx]).find('span').text());
		},305);
	}
	setTimeout('isRolling2=false',400);

}


function fn_style_GalltRight(){
	if(isRolling2){
		return;
	}
	isRolling2=true;
	var prod_list=[];
	prod_list=jQuery('div.gallery_slide div.slide_wrap li');
	var move_val=780;
	var prod_list_length=prod_list.length;
	var prod_left_val=parseInt(jQuery('div.gallery_slide div.slide_wrap').css('left'));
	var tit_idx;

	if(Math.abs(prod_left_val)==Math.abs((prod_list_length-2)*move_val) ){
		jQuery('div.gallery_slide div.slide_wrap').animate({
			left:'-=780px'
		},300);
		setTimeout(function(){		
			jQuery('div.list_length strong').text('1');
			jQuery('div.gallery_slide div.slide_wrap').css('left','0');
			jQuery('div.gallery_top h5').text(jQuery(prod_list[0]).find('span').text());
		},301);
	}
	else{
		
		if(Math.abs(prod_left_val)>Math.abs((prod_list_length-2)*move_val) ){
			jQuery('div.gallery_slide div.slide_wrap').css('left','0')		
		}
		
		jQuery('div.gallery_slide div.slide_wrap').animate({
			left:'-='+move_val+'px'
		},300);
		setTimeout(function(){
			if(Math.abs(prod_left_val/move_val)+2>prod_list_length){
				jQuery('div.list_length strong').text(Math.abs(prod_list_length-1));
				jQuery('div.gallery_top h5').text(jQuery(prod_list[0]).find('span').text());
			}else{
				jQuery('div.list_length strong').text(Math.abs(prod_left_val/move_val)+2);
				tit_idx=Math.abs( (prod_left_val/move_val)-1 );
				jQuery('div.gallery_top h5').text(jQuery(prod_list[tit_idx]).find('span').text());
			}
			
		},301);

	}

	setTimeout('isRolling2=false',500);
}


/* //BOOK GALLERY LIST */




/*
var thumblist=jQuery('div.thumbnail_list li');
var imglist= jQuery('div.book_prod_slides div.img')
var desclist=jQuery('div.book_desclist div.book_desclist');
alert('thumblist length' + thumblist.length);
alert('imglist length' + imglist.length);
alert('desclist length' + desclist.length);
*/



function fn_thumb_left(){
	if(isRolling3){
		return;
	}
	isRolling3=true;

	var thumblist=jQuery('div.thumbnail_list li');
	var imglist= jQuery('div.book_prod_slides div.img')
	var desclist=jQuery('div.book_desclist div.book_prod_desc');
	var thumb_leftval=parseInt(jQuery('div.thumbnail_list div.slide_wrap').css('left'));
	var move_val=95;
	prod_reset();
	var idx=on_idx();
	loc3=Math.abs(thumb_leftval/move_val);
	if(idx==loc3){
	
		if(loc3==0){
			loc3=thumblist.length-5;
			jQuery('div.thumbnail_list div.slide_wrap').css('left',((-loc3)*move_val)+'px')
			jQuery('div.thumbnail_list div.slide_wrap').animate({
				left:'+=95px'
			},300);

			
			jQuery(thumblist[thumblist.length-6]).find('a').addClass('on');
			jQuery(imglist[thumblist.length-6]).show();
			jQuery(desclist[thumblist.length-6]).show();
			

		}else{
			loc3--;
			jQuery('div.thumbnail_list div.slide_wrap').animate({
				left:(-loc3)*move_val+'px'
			},300);

			
			jQuery(thumblist[idx-1]).find('a').addClass('on');	
			jQuery(imglist[idx-1]).show();
			jQuery(desclist[idx-1]).show();
			
		}


	}else{
			
			if(idx>thumblist.length-5){
				//alert('걍 간느부분중에 가짜부분 '+idx);
				//alert(idx-(thumblist.length-6));
				jQuery(imglist[idx-(thumblist.length-4)]).show();
				//alert(jQuery(imglist[idx-(thumblist.length-7)]).index());
				jQuery(desclist[idx-(thumblist.length-4)]).show();	
				//alert(jQuery(desclist[idx-(thumblist.length-6)]).find('p').find('a').text());	

				jQuery(thumblist[idx-1]).find('a').addClass('on');
			}else{
				//alert('걍 가는ㄱ부분');
				jQuery(thumblist[idx-1]).find('a').addClass('on');	
				jQuery(imglist[idx-1]).show();
				jQuery(desclist[idx-1]).show();
			}
						
	}


	setTimeout('isRolling3=false',310);

	}


function fn_thumb_right(){
	if(isRolling3){
		return;
	}
	isRolling3=true;
	var thumblist=jQuery('div.thumbnail_list li');
	var imglist= jQuery('div.book_prod_slides div.img')
	var desclist=jQuery('div.book_desclist div.book_prod_desc');
	var thumb_leftval=parseInt(jQuery('div.thumbnail_list div.slide_wrap').css('left'));
	var move_val=95;
	prod_reset();
	var idx=on_idx();
	loc3=Math.abs(thumb_leftval/move_val);

	if((idx-loc3)==4){
	/* slide_wrap을 움직이는 부분 move*/

		/*바꿔치기 하는부분*/
		if(loc3==thumblist.length-5){
			loc3=0;
			jQuery('div.thumbnail_list div.slide_wrap').css('left','0')
			jQuery('div.thumbnail_list div.slide_wrap').animate({
				left:'-=95px'
			},300);
			if(thumblist.length-5 > 5){
				jQuery(thumblist[5]).find('a').addClass('on');
				jQuery(imglist[5]).show();
				jQuery(desclist[5]).show();
			}else{
				jQuery(thumblist[5]).find('a').addClass('on');
				jQuery(imglist[0]).show();
				jQuery(desclist[0]).show();
			}

			

		/*걍 가는부분*/
		}else{
			loc3++;
			jQuery('div.thumbnail_list div.slide_wrap').animate({
				left:-(loc3)*move_val+'px'
			},300);
			
			if(idx>thumblist.length-7){
				//alert('걍 간느부분중에 가짜부분 '+idx);
				//alert(idx-(thumblist.length-6));
				jQuery(imglist[idx-(thumblist.length-6)]).show();
				jQuery(desclist[idx-(thumblist.length-6)]).show();	
				jQuery(thumblist[idx+1]).find('a').addClass('on');
			}else{
				//alert('걍 가는ㄱ부분');
				jQuery(imglist[idx+1]).show();
				jQuery(desclist[idx+1]).show();	
				jQuery(thumblist[idx+1]).find('a').addClass('on');		
			}
			

		}

	
	/* slide_wrap을 안움직이고 섬네일만 움직이는부분 move*/
	}else{


		if(idx>thumblist.length-7){
			//alert('섬네일 wrap은 안움직이는데 훼이크부분 '+idx);			
			jQuery(imglist[idx-(thumblist.length-6)]).show();
			jQuery(desclist[idx-(thumblist.length-6)]).show();	
			jQuery(thumblist[idx+1]).find('a').addClass('on');
		}else{
			//alert('섬네일 안움직임 '+idx);	
			jQuery(imglist[idx+1]).show();
			jQuery(desclist[idx+1]).show();	
			jQuery(thumblist[idx+1]).find('a').addClass('on');		
		}
		

	}


	setTimeout('isRolling3=false',310);

}



function on_idx(){
	var idx=0;
	jQuery('div.thumbnail_list li').each(function(){
		if(jQuery(this).find('a').hasClass('on')){
			idx=jQuery(this).index();
		}
		jQuery(this).find('a').removeClass('on');
		jQuery(this).find('a').removeClass('fake');
	})	
	return idx;
}

function prod_reset(){
	jQuery('div.book_prod_slides div.img').each(function(){
		jQuery(this).hide();
	});
	jQuery('div.book_desclist div.book_prod_desc').each(function(){
		jQuery(this).hide();	
	});

}


function fn_matchLeft(o,type){
	var obj=jQuery(o);
	var list=obj.siblings('.clothe_thumbnail').find('.thumbnail');
	var pg_list=obj.siblings('.thumbnail_pg').find('a');
	var block_idx;

	for(var i=0; i<list.length; i++){
		if(jQuery(list[i]).css('display')=='block'){
			block_idx=i;
		}
	}
	

	if(block_idx==0){
		jQuery(list[0]).fadeOut(200);
		jQuery(list[list.length-1]).fadeIn(200);
		fn_matchPg(list.length-1,type);
	}else{
		jQuery(list[block_idx]).fadeOut(200);
		jQuery(list[block_idx-1]).fadeIn(200);
		fn_matchPg(block_idx-1,type);
	}


}

function fn_matchRight(o,type){
	var obj=jQuery(o);
	var list=obj.siblings('.clothe_thumbnail').find('.thumbnail');
	var pg_list=obj.siblings('.thumbnail_pg').find('a');
	var block_idx;

	for(var i=0; i<list.length; i++){
		if(jQuery(list[i]).css('display')=='block'){
			block_idx=i;
		}
	}
	

	if(block_idx==list.length-1){
		jQuery(list[list.length-1]).fadeOut(200);
		jQuery(list[0]).fadeIn(200);
		fn_matchPg(0,type);
	}else{
		jQuery(list[block_idx]).fadeOut(200);
		jQuery(list[block_idx+1]).fadeIn(200);
		fn_matchPg(block_idx+1,type);
	}

}

function fn_matchPg(idx,type){
	jQuery('#'+type).find('div.thumbnail_pg').find('strong').text(idx+1);
}
/*


function fn_matchOver(o){
	if(isMatchOver==true){
		return false;
	}
	isMatchOver=true;
	var obj=jQuery(o);
	var list=obj.parent('.thumbnail_pg').siblings('.clothe_thumbnail').find('.thumbnail');
	var pg_list=obj.parent('.thumbnail_pg').find('a');
	var block_idx;
	var block_idx2=obj.index();

	for(var i=0; i<list.length; i++){

		if(jQuery(list[i]).css('display')=='block'){
			block_idx=i;
		}
	}

	if(block_idx2 == block_idx){
		isMatchOver=false
		return false;
	}

	for(var i=0; i<list.length; i++){
		jQuery(pg_list[i]).removeClass('on');
	}

	jQuery(list[block_idx]).fadeOut(200);
	jQuery(list[block_idx2]).fadeIn(200);
	jQuery(pg_list[block_idx2]).addClass('on');
	setTimeout('isMatchOver=false',210);

}


*/


function fn_matchCoordi(clothesType,o){
	var obj=jQuery(o);
	var prodInfo=obj.find('.prod_info');

	if(!prodInfo.find('.tit').text()){
		//아무것도 없는 리스트 클릭했을때
		return false;
	}

	var desc_boxlist=jQuery('div.match_prod_desc div.box');
	var list=jQuery('div.match_prod_list div.clothe_list');
	var clothesNum;
	var desc_box;

	var clothes={
		imgSrc:obj.find('img').attr('src'),
		type:clothesType,
		prodCode:prodInfo.find('.code').text(),
		prodTit:prodInfo.find('.tit').text(),
		prodPrice:prodInfo.find('.price').html(),
		prodDesc:prodInfo.find('.desc').text(),
		prodLink:prodInfo.find('.link').text()
	}
	switch(clothes.type){
		case 'top':
			clothes.typeNum=0;
			break;
		case 'bottom':
			clothes.typeNum=1;
			break;
		case 'shoes':
			clothes.typeNum=2;
	}
	desc_box=jQuery(desc_boxlist[clothes.typeNum]);
	
	//alert(jQuery(list[clothes.typeNum]).find('div.clothe_thumbnail').find('div.thumbnail').length);
	var wasOn=fn_resetMatchOn(jQuery(list[clothes.typeNum]).find('div.clothe_thumbnail').find('div.thumbnail'));	
	obj.addClass('on');

	if(obj.find('img').attr('src') === wasOn.find('img').attr('src')){
		return false;
	}

	var imgbox = jQuery('div.match_prod').find('div.'+clothes.type);
	var idx_list=fn_matchImgChange(imgbox);
	jQuery(imgbox[idx_list.isView]).html('<img src="'+ clothes.imgSrc +'" alt="'+obj.find('img').attr('alt')+'" />');
	jQuery(imgbox[idx_list.wasView]).fadeOut(300);
	jQuery(imgbox[idx_list.isView]).fadeIn(300);
	desc_box.find('dl').find('dt').find('.tit').find('a').attr('href',clothes.prodLink);
	desc_box.find('dl').find('dt').find('.tit').find('a').text(clothes.prodTit);
	desc_box.find('dl').find('dt').find('.price').html(clothes.prodPrice);
	desc_box.find('dl').find('dt').find('a.market').attr('href','javascript:fn_cart(\''+ clothes.prodCode +'\')');
	desc_box.find('dl').find('dd').text(clothes.prodDesc);

	
}



function fn_resetMatchOn(listObj){
	var obj;
	for(i = 0; i<listObj.length; i++){
		for(j = 0; j<2; j++){
			if(jQuery(listObj[i]).find('li').eq(j).find('a').hasClass('on')){
				obj=jQuery(listObj[i]).find('li').eq(j).find('a');
			}
			jQuery(listObj[i]).find('li').eq(j).find('a').removeClass('on');
		}
	}
	return obj;
	
}
/* fn_resetMatchOn */

function fn_matchImgChange(arraylist){

	var imgbox =arraylist;
	var idx_list={};

	for(i = 0; i<imgbox.length; i++){

		if(jQuery(imgbox[i]).hasClass('view')){

			jQuery(imgbox[i]).removeClass('view');
			idx_list.wasView=i;
		}else{
			jQuery(imgbox[i]).addClass('view');
			idx_list.isView=i;
		}
	}

	return idx_list;
}
