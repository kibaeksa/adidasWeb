/*
    init 방법
    Common : 데이타셋 data-modalpop 으로 정의 될 예정

    1. 자바스크립트 init 함수
    2. HTML 코딩 해놓고 스크립트 함수로 정의

    Options
    {
        name :type String , default undefined,
        key : default : modalpop_Date.now(),
        isRendered : false,
        element : typeof DOM (js에서 init 될때는 String),
        width, type String, default : innerWidth
        height, type String , default : auto
        valign, type String , default : center
        align, type String , default : center

        ===== 이하 속성은 javascript 에서 init 할때 사용 가능한 옵션 =====
        callback  type : function , default : false
        onload : type : function , default : false,
        handleClick : typeof function
        htmlString : { typeof Object , default : false
            title : '' typeof String
            contents : '' typeof String
        }
*/



(function($){

    var modalPopupContainer = modalPopupContainer || {};

    function setDataset(a,b){for(var d in b)a.dataset?a.dataset[d]=b[d]:a.setAttribute('data-'+d.replace(/[A-Z]/g,'-$&').toLowerCase(),b[d])}function getDataset(a,b){var c,d=b.replace(/[A-Z]/g,'-$&').toLowerCase();return c=a.dataset?a.dataset[b]:a.getAttribute('data-'+d),void 0!=c&&c}function setPopupName(a){return a.replace(/\-\w/g,function(b){return b.substring(1).toUpperCase()})}function initModal(){initModalpopByHtml(),initElement()}function getElementsByClassName(a){return $?$('.'+a):document.getElementsByClassName(a)}function initModalpopByJs(a){var b=Date.now();a.key=b,a.element=$(a.element),a.name=a.name||'modalpop_'+b,a.width=a.width||'auto',a.height=a.height||'auto',a.onload=a.onload||!1,a.callback=a.callback||!1,a.htmlString=a.htmlString||{title:a.htmlString.header||'',contents:a.htmlString.contents||!1},modalPopupContainer[setPopupName(a.name)]=emptyObj}function initModalpopByHtml(){findModalElement('modal-popup-wrapper',function(a){var d=getDataset(a,'modalpop');if(d=null!=d&&d,!1!==d&&!getDataset(a,'modalpopInit')){var e=createModalObject(a);setDataset(a,{modalpopInit:!0,modalpopKey:e.key})}})}function bindDefaultEvent(a){$(modalPopupContainer[setPopupName(a)].element).find('.popup-header .close').bind('click',function(){closePopup(a)}),$(modalPopupContainer[setPopupName(a)].element).find('.overlay').bind('click',function(){closePopup(a)})}function findModalElement(a,b){for(var c=getElementsByClassName(a),d=0,e=0;d<c.length;d++)(e++,attrs=c[d].attributes,null!=attrs)&&(b.call(window,c[d],c[d].attributes),e++)}function createModalObject(a){var b=Date.now(),c={key:b,name:getDataset(a,'modalpopName')||'modalpop_'+b,element:a,width:getDataset(a,'modalpopWidth')||'auto',height:getDataset(a,'modalpopHeight')||'auto',align:getDataset(a,'modalpopAlign')||'center',valign:getDataset(a,'modalpopValign')||(getDataset(a,'modalpopHeight')?'center':'top'),autoOpen:''===getDataset(a,'modalpopAutoopen'),fade:''===getDataset(a,'modalpopFade'),handleClick:function(){}};return modalPopupContainer[setPopupName(c.name)]=c,c}function getObjectByKey(a){var b=0;for(b in modalPopupContainer)if(modalPopupContainer[setPopupName(b)].key==a||modalPopupContainer[setPopupName(b)].name==a)return modalPopupContainer[setPopupName(b)];return!1}function initElement(){var a,b;for(a in modalPopupContainer)modalPopupContainer[a].isSetDone||(modalPopupContainer[a].isSetDone=!0,b=$(modalPopupContainer[setPopupName(a)].element),b.find('.popup').css({width:modalPopupContainer[setPopupName(a)].width?modalPopupContainer[setPopupName(a)].width+'px':'auto',height:modalPopupContainer[setPopupName(a)].height?modalPopupContainer[setPopupName(a)].height+'px':'auto',margin:('auto'!=modalPopupContainer[setPopupName(a)].height&&'center'==modalPopupContainer[setPopupName(a)].valign?-modalPopupContainer[setPopupName(a)].height/2:'30')+'px 0px 0px '+('auto'!=modalPopupContainer[setPopupName(a)].width&&'center'==modalPopupContainer[setPopupName(a)].align?-modalPopupContainer[setPopupName(a)].width/2:'0')+'px',left:'center'==modalPopupContainer[setPopupName(a)].align?'50%':'0px',top:'center'==modalPopupContainer[setPopupName(a)].valign?'50%':'0px'}),!modalPopupContainer[setPopupName(a)].fade||(b.find('.popup').get(0).style.webkitTransition=b.find('.popup').get(0).style.transition=b.find('.popup').get(0).style.MozTransition='opacity 0.3s ease 0.1s',b.find('.overlay').get(0).style.webkitTransition=b.find('.overlay').get(0).style.transition=b.find('.overlay').get(0).style.MozTransition='opacity 0.3s',b.find('.popup').css({opacity:0}),b.find('.overlay').css({opacity:0})),bindDefaultEvent(a),!modalPopupContainer[setPopupName(a)].autoOpen||openPopup(a))}function drawElement(a){var b=a.split('.').join(' '),c='<div class="modal-popup-wrapper'+a.className+'" data-modalpop="" data-modalpop-init="true"'+('auto'==a.width?'':' data-modalpop-width="'+a.width+'"')+''+('auto'==a.height?'':' data-modalpop-height="'+a.height+'"')+'>';c+='     <div class="overlay"></div>',c+='     <div class="popup">',c+='         <div class="popup-header"><h2>'+a.htmlString.title+'</h2><a href="javascript:void(0)" class="close"><span class="spt_bg"></span></a></div>',c+='         <div class="popup-contents">'+a.htmlString.content+'</div>',c+='     </div>',c+='</div>'}function openPopup(a){$(modalPopupContainer[setPopupName(a)].element).addClass('open'),!modalPopupContainer[setPopupName(a)].fade||setTimeout(function(){$(modalPopupContainer[setPopupName(a)].element).find('.popup').css({opacity:1}),$(modalPopupContainer[setPopupName(a)].element).find('.overlay').css({opacity:0.7})},100)}function closePopup(a){!modalPopupContainer[setPopupName(a)].fade?$(modalPopupContainer[setPopupName(a)].element).removeClass('open'):($(modalPopupContainer[setPopupName(a)].element).find('.popup').css({opacity:0}),$(modalPopupContainer[setPopupName(a)].element).find('.overlay').css({opacity:0}),setTimeout(function(){$(modalPopupContainer[setPopupName(a)].element).removeClass('open')},300))}function bindingOpenEvent(){findModalElement('modal-popup-click',function(a){if(getDataset(a,'modalpopClick')&&null!==a.getAttribute('data-modalpop-click')){var c=a.getAttribute('data-modalpop-click');void 0!=modalPopupContainer[setPopupName(c)]&&($(a).bind('click',function(){openPopup(c)}),modalPopupContainer[setPopupName(c)].handleClick&&$(a).bind('click',modalPopupContainer[setPopupName(c)].handleClick))}})}function checkModalPopup(a){for(var b in modalPopupContainer)if(b==setPopupName(a))return b;return!1}function rerender(){findModalElement('modal-popup-wrapper',function(a){var d=getDataset(a,'modalpop');if(d=null!=d&&d,!1!==d&&!getDataset(a,'modalpopInit')&&!checkModalPopup(getDataset(a,'modalpopName'))){var e=createModalObject(a);setDataset(a,{modalpopInit:!0,modalpopKey:e.key})}})}


    /*
    API Structure

    Name : ModalPopup
    Fucntion :
        name : init
        description : Modalpopup 을 js object 데이터 기반으로 초기화해주는 함수
        @params
            Object : Modalpop 정보

        name : reinit
        description : Html에 비동기적으로 들어간 HTML이 있을 경우 다시 호출하여 재정의

        name : getObject
        description : 특정 key값을 가진 object 리턴
        @params
            String : key값

        name : setObject
        description : 특정 key값을 가진 object를 다시 정의
        @params
            String : key값,
            Object : 새로 변경 될 속성값


    Variable :
    */

    window.ModalPopup = {
        getPopupData : function(popName){
            if(popName == undefined){
                return modalPopupContainer;
            }else{
                return modalPopupContainer[setPopupName(popName)];
            }
        },
        openPopup : function(popName){
            openPopup(popName);
        },
        rerender : function(){
            rerender();
        }
    }


    $(document).ready(function(){
        initModal();
        bindingOpenEvent();
    });

})(jQuery);
