jQuery(function(){
	initVisual();
	jQuery("#visualArea").scrollEvent({
		id : "visualArea",
		func : visualSize
	});
	jQuery(window).scroll(function(){
		var scrollTop = jQuery(this).scrollTop();
		if(scrollTop > 0){
			visualSize('down');
		}
	});
	
	
}); 
function visualSize(txt){
	if(txt == "down" && !jQuery("#visualArea").hasClass("small")){
		jQuery("#wrapper").css("padding-top","130px");
		jQuery("#visualArea").addClass("small");
		jQuery(".visualProArea").removeClass("show");
		visualStop();
		visualSizeUp();
	}
} 
function visualSizeUp(){
	jQuery("#efu_mainWrap").bind("mousewheel", function(e){
		if(e.originalEvent.wheelDelta > 0 && jQuery("#visualArea").hasClass("small")  && jQuery(window).scrollTop() <= 0){
			jQuery("#efu_mainWrap").unbind("mousewheel");
			jQuery("#visualArea").removeClass("small");
			jQuery("#wrapper").css("padding-top","0"); 
			visualRe();
		}
	});
}
var canvas, canvasBefore, canvasBeforeClone, stage, exportRoot, fnStartAnimation, visualNum, setTime, canvasImg;
//var imgInfo1 = {src:"images/img_1.jpg", id:"visualImg"};
function visualMotionStart(num, state) {
	
	jQuery("#visualArea .section.on").removeClass("on").addClass("before");
	jQuery("#visualArea #section" + num).addClass("on");
	canvasImg = jQuery("#visualArea #section" + num).find("canvas").attr("data");
	canvas = document.getElementById("visualCanvas" + num);
	//canvasBefore = jQuery("#visualArea .section.before canvas");
	//canvasBeforeClone =  canvasBefore.clone();
	//canvasBefore.remove();
	var comp=AdobeAn.getComposition("56BFD27489B3C24496154FD6287C7C81");
	var lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
	loader.removeEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.removeEventListener("complete", function(evt){handleComplete(evt,comp,state)});
	
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp,state)});
	var lib=comp.getLibrary();
	var can=comp.getLibrary();
	can.properties = {
		id: '56BFD27489B3C24496154FD6287C7C81',
		width: 2000,
		height: 1000,
		fps: 30,
		color: "#FFFFFF",
		opacity: 1.00,
		manifest: [
			{src:canvasImg, id:"visualImg"} 
		],
		preloads: []
	};
	visualNum = num;
	loader.loadManifest(can.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleComplete(evt,comp,state) {  
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	if(state == "in" || state == null){
		exportRoot = new lib.reebok_maskEff_in(visualNum);
	} else if(state == "out"){
		exportRoot = new lib.reebok_maskEff_out();
	}
	stage = new lib.Stage(canvas);	
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.removeEventListener("tick", stage);
		createjs.Ticker.addEventListener("tick", stage);
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.removeEventListener('resize', resizeCanvas);		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			canvas.width = w*pRatio*sRatio;			
			canvas.height = h*pRatio*sRatio;
			stage.scaleX = pRatio*sRatio;			
			stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;            
			stage.tickOnUpdate = false;            
			stage.update();            
			stage.tickOnUpdate = true;		
		}
	}
	makeResponsive(false,'both',false,1);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}
function initVisual(){
	var winHeight = jQuery(window).height();
	jQuery(window).focusin();
	jQuery("#visualArea").height(winHeight);
	jQuery(window).resize(function(){
		winHeight = jQuery(window).height();
		jQuery("#visualArea").height(winHeight);
	});
	var $section = jQuery("#section1");
	var $visualPaging = jQuery("#visualPaging");
	$section.find(".btnArea").fadeIn(); 
	$section.addClass("on");
	$visualPaging.find("li:first-child").addClass("on");
	var visualPagingNum = $visualPaging.find("li:not(.on)").size();
	var visualPagingSize = $visualPaging.find("li:first-child").width();
	$section.find(".afterShow").css("opacity", "1"); 
	//console.log($section.find("video"))
	if($section.find("video").size() > 0) {
		$section.find("video")[0].play();
		$section.find("video").bind("ended", function(){
			$section.find("video").unbind("ended");
			setTime = setTimeout(function(){
				nextVisual();
			},1000);
		});
	} else {
		setTime = setTimeout(function(){
			nextVisual();
		},3000);
	}
	//visual1(); 
	$section.find(".visualProArea").addClass("show");
	var showNum = 190 + 95;
	if(visualPagingNum == 1){
		showNum = 95;
	}
	var initNum = - (visualPagingNum * visualPagingSize) + showNum; 
	$visualPaging.css("right",  initNum + "px");
	$visualPaging
	.bind("mouseenter", function(){
		$visualPaging.addClass("over");
		$visualPaging.css("right" , "10px");
	})
	.bind("mouseleave", function(){
		$visualPaging.removeClass("over");
		$visualPaging.css("right",  initNum + "px"); 
	});
	visualPlay();
}
function visualBtn(num){
	//console.log(num)
	visualMotionStart(num, 'in');
}
function nextVisual() {
	var $nowPaging = jQuery("#visualPaging .on");
	var $nextPaging;
	if($nowPaging.next().size() <= 0){
		$nextPaging = jQuery("#visualPaging").find("li:first-child");
	} else { 
		$nextPaging = $nowPaging.next();
	}
	$nextPaging.find("a").trigger("click");
}

function visualPlay(){
	jQuery("#visualPaging li a").bind("click", function(e){
		var numData = jQuery(this).attr("data");
		var $target = jQuery(this).parent(); 
		if(!jQuery(this).parent().hasClass("on")){
			visualMotionStart(numData);
			jQuery("#visualPaging").fadeOut(function(){
				jQuery("#visualPaging li.on").removeClass("on");		
				$target.addClass("on"); 
			});
		}
		//console.log("클릭된거?");
		e.preventDefault();
	});
}

function visualStop(txt){
	//console.log("멈춘거 아냐??")
	var $playedVideo = jQuery("#visualArea .section.on video");
	clearTimeout(setTime);
	if($playedVideo.size() > 0){
		$playedVideo[0].pause();
		$playedVideo[0].currentTime = 0;
		//$playedVideo.find("source").attr("src", ""); 
	}
	jQuery("#visualPaging li a").unbind("click");
}

function visualRe(){
	visualPlay();
	nextVisual();
}

(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
(lib.img = function() {
	this.initialize(img.visualImg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2000,1000);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.img_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.img();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.img_1_1, new cjs.Rectangle(0,0,2000,1000), null);


// stage content:
(lib.reebok_maskEff_in = function(num, mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});
	//console.log(num);
	
	// timeline functions:
	this.frame_1 = function() {
		clearTimeout(setTime);
		var $beforeTarget = jQuery("#visualArea .section.before");
		var $beforeAfterArea = $beforeTarget.find(".afterShow");
		var $beforeVideo = $beforeTarget.find("video");
		var $beforeProArea = $beforeTarget.find(".visualProArea");
		$beforeProArea.removeClass("show");
	}
	
	this.frame_36 = function() {
		this.stop();
		var $beforeTarget = jQuery("#visualArea .section.before");
		var $beforeAfterArea = $beforeTarget.find(".afterShow");
		var $beforeVideo = $beforeTarget.find("video");
		var $beforeProArea = $beforeTarget.find(".visualProArea");
		//$beforeTarget.prepend(canvasBeforeClone);
		
		$beforeProArea.removeClass("show");
		$beforeTarget.find(".btnArea").fadeOut(); 
		if($beforeVideo.size() > 0){
			//console.log("이전영상 있을때")
			$beforeVideo[0].pause();
			$beforeVideo[0].currentTime = 0;
		} else {
			//console.log("이전영상 없음")
		}
		$beforeAfterArea.css("opacity", "0");
		$beforeTarget.removeClass("before");
		var $target = jQuery("#visualArea #section" + num);
		var $after = $target.find(".afterShow");
		var $video = $target.find("video");
		var $proArea = $target.find(".visualProArea");
		var $targetCanvas = $target.find("canvas");
		var canvasClone = $targetCanvas.clone();
		$proArea.addClass("show");
		//var nextFunc = this.nextVisual;
		$after.css("opacity", "1");
		if(!jQuery("#visualArea").hasClass("small")){
			if($video.size() > 0){
				//console.log("현재 영상있음"); 
				$video[0].play();
				$targetCanvas.remove(); 
				$target.prepend(canvasClone);
				$video.unbind("ended");
				$video.bind("ended", function(){
					setTime = setTimeout(function(){
						nextVisual();
					},1000); 
				});
			} else {
				//console.log("현재 영상없음");
				setTime = setTimeout(function(){
					nextVisual();
				},3000); 
			}
		}
		jQuery("#visualPaging").fadeIn();
		$target.find(".btnArea").fadeIn(); 
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this).wait(36).call(this.frame_36).wait(1));

	// Mask_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_6 = new cjs.Graphics().p("Eh+0BOIMEbEhnBMAAABnBg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(6).to({graphics:mask_graphics_6,x:1000,y:500}).wait(31));

	// img_1
	this.instance = new lib.img_1_1();
	this.instance.parent = this;
	this.instance.setTransform(3000.3,500,1,1,0,0,0,1000.3,500);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({_off:false},0).to({regX:1000,x:1000},30,cjs.Ease.cubicInOut).wait(1));

	// Mask_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_3 = new cjs.Graphics().p("EicPBOIMAAAgqbME4fhxvMAAAA1JMkbEBnBg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(3).to({graphics:mask_1_graphics_3,x:1000,y:500}).wait(34));

	// img_1
	this.instance_1 = new lib.img_1_1();
	this.instance_1.parent = this;
	this.instance_1.setTransform(3000.3,500,1,1,0,0,0,1000.3,500);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3).to({_off:false},0).to({regX:1000,x:1000},30,cjs.Ease.cubicInOut).wait(4));

	// Mask_1 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EicPg46ME4fAAAIAAAGMk4fBxvg");
	mask_2.setTransform(1000,364.3);

	// img_1
	this.instance_2 = new lib.img_1_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(3000.3,500,1,1,0,0,0,1000.3,500);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:1000,x:1000},30,cjs.Ease.cubicInOut).wait(7));

}).prototype = p_in = new cjs.MovieClip();
p_in.nominalBounds = new cjs.Rectangle(3000,500,0,728.6);

// library properties:
lib.properties = {
	id: '56BFD27489B3C24496154FD6287C7C81',
	width: 2000,
	height: 1000,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	preloads: []
};


// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['56BFD27489B3C24496154FD6287C7C81'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}
})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;