'use strict';

/**
 * @ngdoc service
 * @name zpumpApp.addthis
 * @description
 * # addthis
 * Service in the zpumpApp.
 */
angular.module('zpumpApp')
  .factory('addThis', ['$rootScope', function($rootScope) {

    return {
    	title: $('title').text(),
    	shareurl: '',
    	addthis_share: {},
        init: function() {
        	var $this = this;

        	$rootScope.$watch('shareUrl',function(){
        		$this.shareurl = $rootScope.shareUrl;
        		if(typeof addthis !== 'undefined'){
        			$this.setAddThisShare();	
        		}
		    });

		    $rootScope.$watch('shareTitle',function(){
        		$this.newTitle = $('title').text();
        		if(typeof addthis !== 'undefined'){
        			$this.setAddThisShare();	
        		}
		    });

        	
			var isEmpty = function isEmpty(str, def){ if (str) { return str;} return def; }
			
			if(typeof window.addthis_share === 'undefined') {

				var addthis_config = addthis_config || {};
				
				var addthis_share = {
					url: $this.shareurl,
				    title: isEmpty($('title').text()),
				    description: isEmpty($('meta[property="description"]').attr('content'), $('title').text()),
				    email_template: 'share-us',
				    email_vars: { serverURL: String(document.location.protocol + '//' + document.location.hostname) },
				    passthrough : {
				        twitter: {
				            via: "Reebok",
				            text: isEmpty($('meta[property="description"]').attr('content'), $('title').text())
				        }
				    }
				};
				$this.addthis_share = addthis_share;

				// passthrough needs to be removed for twitter to work
				addthis_config.data_track_addressbar = false;
				addthis_config.data_track_clickback = false;
				addthis_config.image_exclude = "at_exclude";
				addthis_config.pubid = "ra-52a5b07d24182c97";
			
			} else {
				$this.addthis_share = window.addthis_share;

			}
			
			$.getScript("//s7.addthis.com/js/250/addthis_widget.js#domready=1");
			return false;
        },
        addToolbox: function(){
        	if(typeof addthis !== 'undefined'){
        		addthis.toolbox('.addthis_toolbox');	
        	}
        },
        setAddThisShare: function(){
        	var $this = this;
			if(typeof addthis !== 'undefined'){
				addthis.url = $this.shareurl;
				addthis.title = $this.newTitle;
				addthis.update('share', 'url', $this.shareurl);
				addthis.update('share', 'title', $this.newTitle);
				addthis.toolbox(".addthis_toolbox");
			}
        }

      };

  }]);



