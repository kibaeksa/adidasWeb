	//전역 패키지 선언
	var efusioni = new Object();

	//축약 패키지
	// efusioni.* 대신에 쓸 패키지 지정
	// 프로젝트마다 달리 할 수 있다.
	var ef = efusioni;
	
	//efusioni.utils : 유틸 패키지 선언
	efusioni.utils = new Object();
	
	


	//efusioni.visual : 비쥬얼 패키지 선언
	efusioni.visual = new Object();
	
	//Player 선언 시작 --------------------------------------------------------
	var efusioniPlayerId = 0;
	
	efusioni.visual.Player = function (ip) {
		/*private member*/
		var PLAYING_ON = 0;
		var PLAYING_PAUSED = 1;
		var PLAYING_STOPPED = 2;
		var PLAYING_DONE = 3;
		
		var mode = null;
		var source = null;
		var frame = null;
		var currentFrame = 0;
		var timer = null;
		var self = this;
		var status = PLAYING_STOPPED;
		var bRotate = false;
		var images = null;
		var length = null;
		var bLoaded = false;
		
		/*init parameter*/
		mode = (ip.mode == null) ? "serial" : ip.mode;
		if (mode == "serial") {
			source = ip.source;
			length = ip.length;
		}
		else frame = ip.frame;
		
		var step = ip.step;
		var width = ip.width;
		var height = ip.height;
		var duration = ip.duration;
		var container = ip.container;
		var mouseControll = ip.mouseControll;
		var mouseDirection = ip.mouseDirection;
		var loadCompleteCallback = ip.loadCompleteCallback;
		var frameAt = ip.frameAt;
		var playDone = ip.playDone;
		var bReverse = (ip.reverse == null) ? false : ip.reverse;

		/*Optional Value Settings*/
		if (step == null) step = 1;
		if (duration == null) duration = 1000;
		if (mouseControll == null) mouseControll = false;
		if (mouseControll) {
			if (mouseDirection == null) mouseDirection = "normal";
		}

		jQuery(container).data("player", this);
		
		efusioniPlayerId++;
		
		var initX = 0;
		var stopFrame = 0;
		
		if (mouseControll) {
			jQuery(container).mousedown(function(e) {
				e.preventDefault();
				initX = e.pageX - jQuery(container).offset().left;
				stopFrame = currentFrame;
				
				jQuery(document).mousemove(function(e) {
					e.preventDefault();
					var x = e.pageX - jQuery(container).offset().left;
					x = x - initX;
					
					var frame = 0;
					if (mouseDirection == "reverse") {
						frame = length - parseInt(x / width * length);
					}
					else {
						frame = parseInt(x / width * length);
					}
					
					frame = self._mod(stopFrame + frame);
					self.drawFrame(frame);
				});
				
				jQuery(document).mouseup(function() {
					jQuery(document).unbind("mousemove");
				});
			});
		}
		
		this._mod = function(n) {
			if (n >=0) {
				return n % length;
			}
			else {
				return (n + 1) % length + length - 1;
			}
		};
		
		this._play = function() {
			if (timer != null) clearTimeout(timer);
			if (status == PLAYING_ON) {
				self.drawFrame(currentFrame);
				
				if (bReverse) {
					if (currentFrame == 0) {
						if (bRotate) {
							currentFrame = length - 1;
						}
						else {
							status = PLAYING_DONE;
					
							if (playDone != null) playDone(self);
							return;
						}
					}
					else {
						currentFrame--;
					}
				}
				else {
					if (currentFrame == length - 1) {
						if (bRotate) {
							currentFrame = 0;
						}
						else {
							status = PLAYING_DONE;
					
							if (playDone != null) playDone(self);
							return;
						}
					}
					else {
						currentFrame++;
					}
				}
			}
			else if (status == PLAYING_STOPPED) {
				return;
			}

			timer = setTimeout(self._play, duration);
		};
		
		this.drawFrame = function(frm) {
			if (mode == "serial") {
				var margin = frm * width;
				jQuery("img", container).css("margin-left", "-" + margin + "px");
			}
			else {
				jQuery("img", container).attr("src", images[frm].src);
			}
			currentFrame = frm;
			if (frameAt != null) {
				frameAt(self, currentFrame);
			}
		};
		
		this._preload = function() {
			if (mode == "frame") {
				images = new Array(parseInt(frame.length / step));
				for (var i=0; i<images.length; i++) {
					images[i] = new Image();
					images[i].src = frame[i * step];
				}
				length = images.length;

			}
		};
		
		this.size = function() {
			return length;
		};
		
		this.getImage = function(frameIdx) {
			return images[frameIdx].src;
		};
		
		this.setImage = function(frameIdx, frameSrc) {
			images[frameIdx].src = frameSrc;
		};
		
		this.isLoaded = function() {
			return bLoaded;
		};
		
		this.isReverse = function() {
			return bReverse;
		};
		
		this.setReverse = function(b) {
			bReverse = b;
		};
		
		this.isPlaying = function() {
			return (status == PLAYING_ON);
		};
		
		this.isStopped = function() {
			return (status == PLAYING_STOPPED);
		};
		
		this.isPaused = function() {
			return (status == PLAYING_PAUSED);
		};
		
		this.isDone = function() {
			return (status == PLAYING_DONE);
		};
		
		this.setDuration = function(d) {
			duration = d;
		};
		
		this.getContainer = function() {
			return container;
		};
		
		this.play = function() {
			if (bLoaded) {				
				status = PLAYING_ON;
				bRotate = false;
				
				currentFrame = 0;
				
				self._play();
			}
			else alert("Not Initialized");
		};
		
		this.rotate = function() {
			if (bLoaded) {
				status = PLAYING_ON;
				bRotate = true;
				
				currentFrame = 0;
				
				self._play();
			}
			else alert("Not Initialized");
		};
		
		this.frameUpdate = function(newFrame){
			self.stop(); 
			frame = newFrame;
			self._preload();
			self.rotate();
		};
		
		this.pause = function() {
			status = PLAYING_PAUSED;
		};
		
		this.resume = function() {
			status = PLAYING_ON;
		};
		
		this.stop = function() {
			status = PLAYING_STOPPED;
			currentFrame = 0;
			self.drawFrame(0);
		};

		/*init process start*/
		if (mode == "serial") {
			jQuery(container).html("<div style=' width:" + width + "px; height:" + height + "px; overflow:hidden;'><img src='" + source + "' width='" + (width * length) + "' height='" + height + "' id='efusioniPlayer" + efusioniPlayerId + "' style='margin-left:0px'></div>");
		}
		else {
			jQuery(container).html("<img src='" + frame[0] + "' width='" + width + "' height='" + height + "' id='efusioniPlayer" + efusioniPlayerId + "'>");
		}
		this._preload();
				
		bLoaded = true;
		if (loadCompleteCallback != null) loadCompleteCallback(this);
		/*init process end*/
		
	};
	//Player 선언 끝 --------------------------------------------------------
	
	