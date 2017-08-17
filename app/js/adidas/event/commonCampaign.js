!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.raf=e()}}(function(){return function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,n,t){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(s===setTimeout)return setTimeout(e,0);if((s===r||!s)&&setTimeout)return s=setTimeout,setTimeout(e,0);try{return s(e,0)}catch(n){try{return s.call(null,e,0)}catch(n){return s.call(this,e,0)}}}function u(e){if(d===clearTimeout)return clearTimeout(e);if((d===o||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(e);try{return d(e)}catch(n){try{return d.call(null,e)}catch(n){return d.call(this,e)}}}function c(){w&&h&&(w=!1,h.length?m=h.concat(m):y=-1,m.length&&f())}function f(){if(!w){var e=i(c);w=!0;for(var n=m.length;n;){for(h=m,m=[];++y<n;)h&&h[y].run();y=-1,n=m.length}h=null,w=!1,u(e)}}function a(e,n){this.fun=e,this.array=n}function l(){}var s,d,p=n.exports={};!function(){try{s="function"==typeof setTimeout?setTimeout:r}catch(e){s=r}try{d="function"==typeof clearTimeout?clearTimeout:o}catch(e){d=o}}();var h,m=[],w=!1,y=-1;p.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];m.push(new a(e,n)),1!==m.length||w||i(f)},a.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.binding=function(e){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(e){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],2:[function(e,n,t){(function(t){for(var r=e("performance-now"),o="undefined"==typeof window?t:window,i=["moz","webkit"],u="AnimationFrame",c=o["request"+u],f=o["cancel"+u]||o["cancelRequest"+u],a=0;!c&&a<i.length;a++)c=o[i[a]+"Request"+u],f=o[i[a]+"Cancel"+u]||o[i[a]+"CancelRequest"+u];if(!c||!f){var l=0,s=0,d=[],p=1e3/60;c=function(e){if(0===d.length){var n=r(),t=Math.max(0,p-(n-l));l=t+n,setTimeout(function(){var e=d.slice(0);d.length=0;for(var n=0;n<e.length;n++)if(!e[n].cancelled)try{e[n].callback(l)}catch(e){setTimeout(function(){throw e},0)}},Math.round(t))}return d.push({handle:++s,callback:e,cancelled:!1}),s},f=function(e){for(var n=0;n<d.length;n++)d[n].handle===e&&(d[n].cancelled=!0)}}n.exports=function(e){return c.call(o,e)},n.exports.cancel=function(){f.apply(o,arguments)},n.exports.polyfill=function(){o.requestAnimationFrame=c,o.cancelAnimationFrame=f}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"performance-now":3}],3:[function(e,n,t){(function(e){(function(){var t,r,o;"undefined"!=typeof performance&&null!==performance&&performance.now?n.exports=function(){return performance.now()}:"undefined"!=typeof e&&null!==e&&e.hrtime?(n.exports=function(){return(t()-o)/1e6},r=e.hrtime,t=function(){var e;return e=r(),1e9*e[0]+e[1]},o=t()):Date.now?(n.exports=function(){return Date.now()-o},o=Date.now()):(n.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(this,e("_process"))},{_process:1}]},{},[2])(2)});


var Campaign = (function($){

    /* CarouselSlider START */
    function CarouselSlider(elemId){
        /* Properties */
        var index = 0;
        var margin = 0;
        var width = 0;
        var windowWidth = $(window).width();
        var length;
        var defaultValue = 0;
        var moveVal = 0;
        var speed;

        /* Elements */
        var elemWrapper = $(elemId);
        var elemSliderWrapper = elemWrapper.find('.carousel-slider');
        var elemSlider = elemSliderWrapper.children();
        var elemItems = elemSlider.children();

        /* Events */
        var eventHandleFn = {};

        /* Etc Variables */
        var teTimer;

        /* Events function */
        var prev = function(){
            if(index > 0){
                index -= 1;
                animate(index);
            }
        };

        var next = function(){
            if(index < length-1){
                index += 1;
                animate(index);
            }
        };

        var resize = function(){
            windowWidth = $(window).width();
            defaultValue = ((elemWrapper.width() - width ) / 2);

            elemSlider.css({
                marginLeft : defaultValue
            });


            if(eventHandleFn.resize){
                eventHandleFn.resize.call(window , event);
            }
        };


        var init = function(options){
            /*
                Options :
                width : Number
                margin : Number
                arrow : Boolean
                speed : Number
                index : Number

                events {
                    init : Function
                    resize : Function
                    translate : Function
                    translating : Function
                    translateEnd : Function
                    drag : Function
                    dragging : Function
                    dragEnd: Function
                }
            */
            index = options.index ? options.index : 0;
            width = options.width ? options.width : elemItems.eq(0).width();
            margin = options.margin ? options.margin : 0;
            length = elemItems.length;
            defaultValue = ((elemWrapper.width() - width ) / 2);
            moveVal = width + margin;
            speed = options.speed ? options.speed : 500;


            if(options.events){
                eventHandleFn = options.events;
            }

            if(options.arrow){
                elemWrapper.append('<a href="javascript:void(0)" class="carousel-prev"><img src="/images/adidas/event/prev.png" alt=""></a><a href="javascript:void(0)" class="carousel-next"><img src="/images/adidas/event/next.png" alt=""></a>');
                elemWrapper.find('.carousel-prev').bind('click',prev);
                elemWrapper.find('.carousel-next').bind('click',next);

                if(index == 0){
                    elemWrapper.find('.carousel-prev').addClass('disable');
                }else if(index == length-1){
                    elemWrapper.find('.carousel-next').addClass('disable');
                }
            }

            initStyle();
            setTimeout(function(){
                elemWrapper.addClass('initialized');
                if(eventHandleFn.init){
                    eventHandleFn.init.call(window);
                }
            },10);
        }

        function initStyle(){
            elemSlider.css({
                position:'relative',
                top : 0,
                left : moveVal * -index,
                marginLeft : defaultValue,
                width : length * (width + margin)
            });

            elemItems.css({
                width : width,
                float:'left',
                marginRight: margin
            });
        }

        function animate(i){

            if(eventHandleFn.translate){
                eventHandleFn.translate.call(window , {
                    index : index,
                    item : elemItems.eq(index)
                });
            }

            if(eventHandleFn.translateEnd){
                clearTimeout(teTimer);
                teTimer = setTimeout(function(){
                    eventHandleFn.translateEnd.call(window , {
                        index : index,
                        item : elemItems.eq(index)
                    });
                },speed);
            }

            elemSlider.stop().animate({
                left : moveVal * -i
            } , speed);

            if(index == 0){
                elemWrapper.find('.carousel-prev').addClass('disable');
                elemWrapper.find('.carousel-next').removeClass('disable');
            }else if(index == length-1){
                elemWrapper.find('.carousel-prev').removeClass('disable');
                elemWrapper.find('.carousel-next').addClass('disable');
            }else{
                elemWrapper.find('.carousel-prev').removeClass('disable');
                elemWrapper.find('.carousel-next').removeClass('disable');
            }
        }

        $(window).resize(resize);

        return {
            init : function(options){
                init(options);
                return {
                    prev : prev,
                    next : next,
                    slide : function(i){
                        if(index == i || i < 0 || i > length-1 ){
                            return;
                        }

                        index = i;
                        animate(i);
                    }
                }
            }
        }
    }
    /* CarouselSlider END */


    var ImageGrid = function(elemId , data){

        var handleClose = function(event){
            $('.image-grid-modalpop').removeClass('open').addClass('close');
            setTimeout(function(){
                $('.image-grid-modalpop').remove();
                $('body').css({
                    paddingRight : 0,
                    overflow:''
                });
            },400);
        };

        var setImageSize = function(width , height){
            var wRatio = width / height;
            var hRatio = height / width;
            var imageType = width > height ? 'wide' : '';
            var width;
            var height;
            var styles = '';

            if(imageType == 'wide'){
                height = window.innerHeight;
                width = height * wRatio;

                if(width < window.innerWidth){
                    width = window.innerWidth;
                    height = width * hRatio;
                }

                styles += 'margin:0 0 0 -'+(width/2)+'px;top:0;left:50%;position:absolute;';
            }else{
                width = window.innerWidth;
                height = width * hRatio;

                if(height < window.innerHeight){
                    height = window.innerHeight;
                    width = height * wRatio;
                }

                styles += '-'+(height/2)+'px 0 0 0;top:50%;left:0;position:absolute;';
            }

            return {
                width : width,
                height : height,
                styles : styles
            };
        }

        var htmlString = '<div class="image-grids">';
        htmlString += '     <div class="gridbox col fix igrid1">'+(data.img_fixed.image ? '<a href="javascript:void(0)" data-key="img_fixed" data-image="'+data.img_fixed.image+'"><span class="icon"><img src="/images/adidas/event/ico_plus_img.png" alt=""/></span>' : '')+'<img src="'+data.img_fixed.thumb+'" alt="">'+(data.img_fixed.image ? '</a>' : '')+'</div>';
        htmlString += '     <div class="image-grid">';
        htmlString += '         <div class="col clfix igrid2">';
        htmlString += '             <div class="gridbox img1-3">'+(data.img1_1.image ? '<a href="javascript:void(0)" data-key="img1_1" data-image="'+data.img1_1.image+'"><span class="icon"><img src="/images/adidas/event/ico_plus_img.png" alt=""/></span>' : '')+'<img src="'+data.img1_1.thumb+'" alt="">'+(data.img1_1.image ? '</a>' : '')+'</div>';
        htmlString += '             <div class="img2-3" style="background-image:url('+data.img1_2.thumb+');">'+(data.img1_2.html ? '<div class="content_inner">'+data.img1_2.html+'</div>' : '')+'</div>';
        htmlString += '         </div>';
        htmlString += '         <div class="col clfix">';
        htmlString += '             <div class="gridbox img1-3 igrid4">'+(data.img2_1.image ? '<a href="javascript:void(0)" data-key="img2_1" data-image="'+data.img2_1.image+'"><span class="icon"><img src="/images/adidas/event/ico_plus_img.png" alt=""/></span>' : '')+'<img src="'+data.img2_1.thumb+'" alt="">'+(data.img2_1.image ? '</a>' : '')+'</div>';
        htmlString += '             <div class="gridbox img1-3 igrid5">'+(data.img2_2.image ? '<a href="javascript:void(0)" data-key="img2_2" data-image="'+data.img2_2.image+'"><span class="icon"><img src="/images/adidas/event/ico_plus_img.png" alt=""/></span>' : '')+'<img src="'+data.img2_2.thumb+'" alt="">'+(data.img2_2.image ? '</a>' : '')+'</div>';
        htmlString += '             <div class="gridbox img1-3 igrid6">'+(data.img2_3.image ? '<a href="javascript:void(0)" data-key="img2_3" data-image="'+data.img2_3.image+'"><span class="icon"><img src="/images/adidas/event/ico_plus_img.png" alt=""/></span>' : '')+'<img src="'+data.img2_3.thumb+'" alt="">'+(data.img2_3.image ? '</a>' : '')+'</div>';
        htmlString += '         </div>';
        htmlString += '     </div>';
        htmlString += '</div>';

        $(elemId).html(htmlString);

        $('.image-grids .gridbox a').bind('click',function(){
            var thisElem = $(this);
            var img = new Image();
            img.onload = function(){
                var imgWidth = this.width;
                var imgHeight = this.height;
                var imgSize = setImageSize(this.width , this.height);
                var htmlString = '<div class="image-grid-modalpop">';
                htmlString += '     <a href="javascript:void(0)" class="close"><img src="/images/adidas/event/btn_close_gridpop.png" alt=""/></a>'
                htmlString += '     <div class="grid-modal-overlay"></div>';
                htmlString += '     <div class="grid-modal-bg">';
                htmlString += '         <img src="'+thisElem.attr('data-image')+'" alt="" width="'+imgSize.width+'" height="'+imgSize.height+'" style="'+imgSize.styles+'">';
                htmlString += '     </div>';
                if(data[thisElem.attr('data-key')].popupContents){
                    htmlString += '     <div class="grid-modal-contents">'+data[thisElem.attr('data-key')].popupContents+'</div>';
                }
                htmlString += '<div>';

                $('body').css({
                    paddingRight : 17,
                    overflow:'hidden'
                });
                $('body').append(htmlString);
                setTimeout(function(){
                    $('.image-grid-modalpop').addClass('open');
                    $('.image-grid-modalpop>.close').bind('click',handleClose);
                },300);

                $(window).resize(function(){
                    var imgSize = setImageSize(imgWidth , imgHeight);
                    $('.image-grid-modalpop .grid-modal-bg img').attr('width',imgSize.width);
                    $('.image-grid-modalpop .grid-modal-bg img').attr('height',imgSize.height);
                    $('.image-grid-modalpop .grid-modal-bg img').attr('style',imgSize.styles);
                });
            };

            img.src = $(this).attr('data-image');
        });
    }


    /* Set final Campaign object */
    var C = function(options){
        return {
            CarouselSlider : CarouselSlider,
            ImageGrid : ImageGrid
        }
    };

    return C;

})(jQuery);
