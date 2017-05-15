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

    /* Util funtions */
    function setDataset(elem , dataObj){
        var dataValue;
        var dataName;

        for(dataName in dataObj){
            if(elem.dataset){
                elem.dataset[dataName] = dataObj[dataName];
            }else{
                elem.setAttribute('data-'+dataName.replace(/[A-Z]/g,'-$&').toLowerCase() , dataObj[dataName]);
            }
        }
    }

    function getDataset(elem , dataName){
        var dataValue;
        var dataNameForIe = dataName.replace(/[A-Z]/g,'-$&').toLowerCase();

        if(elem.dataset){
            dataValue = elem.dataset[dataName];
        }else{
            dataValue = elem.getAttribute('data-'+dataNameForIe);
        }

        if(dataValue !== undefined){
            return dataValue;
        }else{
            return false;
        }
    }

    function setPopupName(popName){
        return popName.replace(/\-\w/g,function(x){
            return x.substring(1).toUpperCase();
        });
    }


    function initModal(){
        initModalpopByHtml();
        initElement();
    }

    /*
    Js 데이터를 받아서 init 해준다.
    (Html에는 존재하지 않은 상태)
    */
    function initModalpopByJs(obj){
        var nowDate = Date.now();
        obj.key = nowDate;
        obj.element = $(obj.element);
        obj.name = obj.name || 'modalpop_'+nowDate;
        obj.width = obj.width || 'auto';
        obj.height = obj.height || 'auto';
        obj.onload = obj.onload || false;
        obj.callback = obj.callback || false;
        obj.htmlString = obj.htmlString || {
            title : obj.htmlString.header || '',
            contents : obj.htmlString.contents || false
        };

        modalPopupContainer[setPopupName(obj.name)] = emptyObj;
    }

    /*
    Html 태그의 data 태그에서 찾아내서 Modalpop 정의
    */
    function initModalpopByHtml(){
        findModalElement(function(elem,attributes,index){
            var isModalpop = getDataset(elem,'modalpop');
            isModalpop = isModalpop == null ? false : isModalpop;

            if(isModalpop !== false){
                /* modalpop을 처음 로드 했을때 */
                if(!getDataset(elem , 'modalpopInit')){

                    var modalpopObj = createModalObject(elem);
                    setDataset(elem , {
                        modalpopInit : true,
                        modalpopKey : modalpopObj.key
                    });
                }
            }
        });
    }

    function bindDefaultEvent(popupKey){
        $(modalPopupContainer[setPopupName(popupKey)].element).find('.popup-header .close').bind('click',function(){
            closePopup(popupKey);
        });

        $(modalPopupContainer[setPopupName(popupKey)].element).find('.overlay').bind('click',function(){
            closePopup(popupKey);
        });
    }

    /*
    HTML 내 모든 엘리먼트의 속성을 하나하나 확인하여 callback 받은 함수대로 실행
    */
    function findModalElement(callback , tagName){
        var tn = tagName == undefined ? '*' : tagName;
        var elements = document.getElementsByTagName('*');
        var elemIndex = 0;

        var testCounter = 0;


        for(; elemIndex < elements.length; elemIndex++){
            testCounter++;
            attrs = elements[elemIndex].attributes;
            if(attrs == null){
                continue;
            }

            callback.call(window , elements[elemIndex] , elements[elemIndex].attributes);
            testCounter++;
        }
    }


    /*
    Modal object 새로 생성
    */
    function createModalObject(elem){
        var nowDate = Date.now();
        var emptyObj = {
            key : nowDate,
            name : getDataset(elem,'modalpopName') || 'modalpop_'+nowDate,
            element : elem,
            width : getDataset(elem,'modalpopWidth') || 'auto',
            height : getDataset(elem,'modalpopHeight') || 'auto',
            align : getDataset(elem,'modalpopAlign') || 'center',
            valign : getDataset(elem,'modalpopValign') || (!getDataset(elem,'modalpopHeight') ? 'top' : 'center'),
            autoOpen : getDataset(elem,'modalpopAutoopen') === '' ? true : false,
            fade : getDataset(elem,'modalpopFade') === '' ? true : false,
            handleClick : function(){

            }
        };

        modalPopupContainer[setPopupName(emptyObj.name)] = emptyObj;

        return emptyObj;
    }

    function getObjectByKey(key){
        var name = 0;

        for(name in modalPopupContainer){
            if(modalPopupContainer[setPopupName(name)].key == key || modalPopupContainer[setPopupName(name)].name == key){
                return modalPopupContainer[setPopupName(name)];
            }
        }
        return false;
    }

    function initElement(){
        var key,
            elem;

        for(key in modalPopupContainer){
            if(modalPopupContainer[key].isSetDone){
                continue;
            }
            modalPopupContainer[key].isSetDone = true;

            elem = $(modalPopupContainer[setPopupName(key)].element);
            elem.find('.popup').css({
                width : modalPopupContainer[setPopupName(key)].width ? modalPopupContainer[setPopupName(key)].width+'px' : 'auto',
                height : modalPopupContainer[setPopupName(key)].height ? modalPopupContainer[setPopupName(key)].height+'px' : 'auto',
                margin: ((modalPopupContainer[setPopupName(key)].height != 'auto' && modalPopupContainer[setPopupName(key)].valign == 'center') ? (-modalPopupContainer[setPopupName(key)].height/2) : '30')+'px 0px 0px '+((modalPopupContainer[setPopupName(key)].width != 'auto' && modalPopupContainer[setPopupName(key)].align == 'center') ? (-modalPopupContainer[setPopupName(key)].width/2) : '0')+'px',
                left : modalPopupContainer[setPopupName(key)].align == 'center' ? '50%' : '0px',
                top : modalPopupContainer[setPopupName(key)].valign == 'center' ? '50%' : '0px'
            });

            if(!!modalPopupContainer[setPopupName(key)].fade){
                elem.find('.popup').get(0).style.webkitTransition = elem.find('.popup').get(0).style.transition = elem.find('.popup').get(0).style.MozTransition = 'opacity 0.3s ease 0.1s';
                elem.find('.overlay').get(0).style.webkitTransition = elem.find('.overlay').get(0).style.transition = elem.find('.overlay').get(0).style.MozTransition = 'opacity 0.3s';
                elem.find('.popup').css({
                    opacity : 0
                });
                elem.find('.overlay').css({
                    opacity : 0
                });
            }

            bindDefaultEvent(key);

            if(!!modalPopupContainer[setPopupName(key)].autoOpen){
                openPopup(key);
            }
        }
    }

    function drawElement(obj){
        var className = obj.split('.').join(' ');
        var htmlString = '<div class="modal-popup-wrapper'+obj.className+'" data-modalpop="" data-modalpop-init="true"' + (obj.width != 'auto' ? ' data-modalpop-width="'+obj.width+'"' : '' ) + '' + (obj.height != 'auto' ? ' data-modalpop-height="'+obj.height+'"' : '' )+'>';
        htmlString += '     <div class="overlay"></div>';
        htmlString += '     <div class="popup">';
        htmlString += '         <div class="popup-header"><h2>'+obj.htmlString.title+'</h2><a href="javascript:void(0)" class="close"><span class="spt_bg"></span></a></div>';
        htmlString += '         <div class="popup-contents">'+obj.htmlString.content+'</div>';
        htmlString += '     </div>'
        htmlString += '</div>'
    }

    function openPopup(key){
        $(modalPopupContainer[setPopupName(key)].element).addClass('open');
        if(!!modalPopupContainer[setPopupName(key)].fade){
            setTimeout(function(){
                $(modalPopupContainer[setPopupName(key)].element).find('.popup').css({
                    opacity : 1
                });
                $(modalPopupContainer[setPopupName(key)].element).find('.overlay').css({
                    opacity : 0.7
                });
            },100);
        }
    }

    function closePopup(key){
        if(!!modalPopupContainer[setPopupName(key)].fade){
            $(modalPopupContainer[setPopupName(key)].element).find('.popup').css({
                opacity : 0
            });
            $(modalPopupContainer[setPopupName(key)].element).find('.overlay').css({
                opacity : 0
            });
            setTimeout(function(){
                $(modalPopupContainer[setPopupName(key)].element).removeClass('open');
            },300);
        }else{
            $(modalPopupContainer[setPopupName(key)].element).removeClass('open');
        }
    }

    function bindingOpenEvent(){
        findModalElement(function(elem,attributes){
            if(getDataset(elem , 'modalpopClick')){
                if( elem.getAttribute('data-modalpop-click') !== null ){
                    var popName = elem.getAttribute('data-modalpop-click');
                    if(modalPopupContainer[setPopupName(popName)] != undefined){
                        $(elem).bind('click',function(){
                            openPopup(popName);
                        });

                        if(modalPopupContainer[setPopupName(popName)].handleClick){
                            $(elem).bind('click',modalPopupContainer[setPopupName(popName)].handleClick);
                        }
                    }
                }
            }
        });
    }

    function checkModalPopup(popName){
        var data;
        for(data in modalPopupContainer){
            if(data == setPopupName(popName)){
                return data;
            }
        }

        return false;
    }

    function rerender(){
        findModalElement(function(elem,attributes,index){
            var isModalpop = getDataset(elem,'modalpop');
            isModalpop = isModalpop == null ? false : isModalpop;

            if(isModalpop !== false){

                if(!getDataset(elem , 'modalpopInit')){
                    if(!checkModalPopup(getDataset(elem , 'modalpopName'))){
                        var modalpopObj = createModalObject(elem);
                        setDataset(elem , {
                            modalpopInit : true,
                            modalpopKey : modalpopObj.key
                        });
                    }
                }
            }
        });
    }


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
