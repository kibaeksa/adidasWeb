(function($){
	var rootPath = '/images/adidas/event/customise/olapic-images/';
	var check
	var miOlapicData = [
		{
			imgUrl : rootPath + 'Olapic1_2f2d32.jpg',
			bgColor : 'rgb(47, 45, 50)'
		},
		{
			imgUrl : rootPath + 'Olapic4_c75964.jpg',
			bgColor : 'rgb(199, 89, 100)'
		},
		{
			imgUrl : rootPath + 'Olapic6_c86064.jpg',
			bgColor : 'rgb(200, 96, 100)'
		},
		{
			imgUrl : rootPath + 'Olapic8_a28f64.jpg',
			bgColor : 'rgb(162, 143, 100)'
		},
		{
			imgUrl : rootPath + 'Olapic16_a58088.jpg',
			bgColor : 'rgb(165, 128, 136)'
		},
		{
			imgUrl : rootPath + 'Olapic17_63967f.jpg',
			bgColor : 'rgb(99, 150, 127)'
		},
		{
			imgUrl : rootPath + 'Olapic23_a39d98.jpg',
			bgColor : 'rgb(163, 157, 152)'
		},
		{
			imgUrl : rootPath + 'Olapic24_60646c.jpg',
			bgColor : 'rgb(96, 100, 108)'
		},
		{
			imgUrl : rootPath + 'Olapic3_3d3759.jpg',
			bgColor : 'rgb(61, 55, 89)'
		},
		{
			imgUrl : rootPath + 'Olapic5_dbc2b4.jpg',
			bgColor : 'rgb(219, 194, 180)'
		},
		{
			imgUrl : rootPath + 'Olapic10_fc7d7e.jpg',
			bgColor : 'rgb(252, 125, 126)'
		},
		{
			imgUrl : rootPath + 'Olapic20_927d5e.jpg',
			bgColor : 'rgb(146, 125, 94)'
		},
		{
			imgUrl : rootPath + 'Olapic29_d4b39c.jpg',
			bgColor : 'rgb(212, 179, 156)'
		},
		{
			imgUrl : rootPath + 'Olapic37_9185a3.jpg',
			bgColor : 'rgb(145, 133, 163)'
		},
		{
			imgUrl : rootPath + 'Olapic42_387ab9.jpg',
			bgColor : 'rgb(56, 122, 185)'
		},
		{
			imgUrl : rootPath + 'Olapic12_dcdcdc.jpg',
			bgColor : 'rgb(220, 220, 220)'
		},
		{
			imgUrl : rootPath + 'Olapic13_b5aeaa.jpg',
			bgColor : 'rgb(181, 174, 170)'
		},
		{
			imgUrl : rootPath + 'Olapic22_ebcfb4.jpg',
			bgColor : 'rgb(235, 207, 180)'
		},
		{
			imgUrl : rootPath + 'Olapic27_30363f.jpg',
			bgColor : 'rgb(48, 54, 63)'
		},
		{
			imgUrl : rootPath + 'Olapic32_a0c7c7.jpg',
			bgColor : 'rgb(160, 199, 199)'
		},
		{
			imgUrl : rootPath + 'Olapic40_f6dbd1.jpg',
			bgColor : 'rgb(246, 219, 209)'
		},
		{
			imgUrl : rootPath + 'Olapic43_b6b4a9.jpg',
			bgColor : 'rgb(182, 180, 169)'
		},
		{
			imgUrl : rootPath + 'Olapic19_a7a7a7.jpg',
			bgColor : 'rgb(167, 167, 167)'
		},
		{
			imgUrl : rootPath + 'Olapic26_c6af7a.jpg',
			bgColor : 'rgb(198, 175, 122)'
		},
		{
			imgUrl : rootPath + 'Olapic34_bf9193.jpg',
			bgColor : 'rgb(191, 145, 147)'
		},
		{
			imgUrl : rootPath + 'Olapic44_998475.jpg',
			bgColor : 'rgb(153, 132, 117)'
		},
		{
			imgUrl : rootPath + 'Olapic2_364162.jpg',
			bgColor : 'rgb(54, 65, 98)'
		},
		{
			imgUrl : rootPath + 'Olapic15_207c92.jpg',
			bgColor : 'rgb(32, 124, 146)'
		},
		{
			imgUrl : rootPath + 'Olapic18_c1b5a8.jpg',
			bgColor : 'rgb(193, 181, 168)'
		},
		{
			imgUrl : rootPath + 'Olapic45_737a8c.jpg',
			bgColor : 'rgb(115, 122, 140)'
		}
	];

	function setGalleryItems(targetId){
		var checkItems = [];
		var isDone = false;

		while(!isDone){
			var isSame = false;
			var randomIndex = Math.floor(Math.random() * miOlapicData.length);
			for(var i =0; i < checkItems.length; i++){
				if(checkItems[i] == randomIndex){
					isSame = true;
					break;
				}
			}

			if(isSame){
				isSame = false;
				continue;
			}

			checkItems.push(randomIndex);

			var dummyContainer = document.createElement('div');
			var imgDivElem = document.createElement('div');
			var bgDivElem = document.createElement('div');
			var imgElem = new Image();

			imgElem.src = miOlapicData[randomIndex].imgUrl;
			imgElem.setAttribute('data-parallax','');
			imgElem.setAttribute('data-parallax-speed','0.2');
			imgElem.setAttribute('data-parallax-addclass','loaded');

			bgDivElem.setAttribute('data-parallax','');
			bgDivElem.setAttribute('data-parallax-speed','0.05');
			bgDivElem.setAttribute('data-parallax-addclass','loaded');
			bgDivElem.style.backgroundColor = miOlapicData[randomIndex].bgColor;

		

			imgDivElem.setAttribute('class','img');
			imgDivElem.appendChild(imgElem);
			bgDivElem.setAttribute('class','bg');

			dummyContainer.setAttribute('class','box item'+(checkItems.length));
			dummyContainer.appendChild(imgDivElem);
			dummyContainer.appendChild(bgDivElem);

			document.getElementById('gallery_contents_wrapper').appendChild(dummyContainer);

			if(checkItems.length == 8){
				isDone = true;
			}
		}
	}

	setGalleryItems('gallery_contents_wrapper');

})(jQuery);

