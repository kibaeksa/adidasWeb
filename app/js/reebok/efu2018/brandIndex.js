(function($){
	var totalNum;
	var $container;
	var $listBody;
	var $firstSection;
	var $secondSection;
	var sectionEmpty;  
	var listClone;
	var firstMoveLeft;
	var $targetOn;
	var logoPlayer;
	var nowLeft;
	var fitnessSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/fitness/Fitness_00047.png"];
	var classicSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/classic/Classic_00047.png"];
	var campaignSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/campaign/Campaign_00047.png"];
	var reeclubSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/reeclub/Reclub_00047.png"];
	var promotionSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/promotion/Promotion_00047.png"];
	var blogSource = ["//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00000.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00001.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00002.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00003.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00004.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00005.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00006.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00007.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00008.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00009.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00010.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00011.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00012.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00013.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00014.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00015.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00016.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00017.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00018.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00019.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00020.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00021.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00022.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00023.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00024.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00025.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00026.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00027.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00028.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00029.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00030.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00031.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00032.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00033.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00034.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00035.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00036.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00037.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00038.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00039.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00040.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00041.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00042.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00043.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00044.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00045.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00046.png","//image.reebok.co.kr/images/reebok/efu2018/brand/logo/blog/Blog_00047.png"];
	var bgSoure = ["//image.reebok.co.kr/images/reebok/efu2018/brand/bg_fitness.jpg","//image.reebok.co.kr/images/reebok/efu2018/brand/bg_classic.jpg","//image.reebok.co.kr/images/reebok/efu2018/brand/bg_campagin.jpg","//image.reebok.co.kr/images/reebok/efu2018/brand/bg_reeclub.jpg","//image.reebok.co.kr/images/reebok/efu2018/brand/bg_promotion.jpg","//image.reebok.co.kr/images/reebok/efu2018/brand/bg_blog.jpg"];
	draggState = false;
	$(function(){
		totalNum = $("#bi_listBody .section").size();
		$container = $("#bi_list");
		$listBody = $("#bi_listBody");
		$firstSection = $("#bi_listBody .section:first-child");
		$secondSection = $("#bi_listBody .section:first-child").next();
		sectionEmpty = parseInt($firstSection.css("padding-left")) +  parseInt($firstSection.css("padding-right"));  
		listClone = $("#bi_listBody").html();
		$(bgSoure).each(function(i){
			$("#preLoadArea").append("<img src='"+ bgSoure[i] +"' alt='' />")
		});
		var winHeight = $(window).height();
		$(window).resize(function(){
			winHeight = $(window).height(); 
		});
		
		jQuery("#bi_list").scrollEvent({
			id : "bi_list",
			func : move,
			preventDefault : false
		}); 
	});
	
	function brandIndexInit(){
		for(var i = 0; i < 4; i++) {
			$listBody.append(listClone); 
		} 
		var totalWidth = 0;
		$listBody.find(".section").each(function(){
			var numW = parseInt($(this).find("a").css("width")) + sectionEmpty;
			$(this).width(numW);
			$(this).attr("data", numW);
			totalWidth = totalWidth + numW; 
		});
		var initLeft = ($(window).width() - (Number($firstSection.attr("data")) + Number($secondSection.attr("data")))) / 2;
		firstMoveLeft = (($(window).width()  - (Number($firstSection.attr("data")))) / 2) - (totalWidth / 5) - (totalWidth / 5); 
		$listBody.css({
			"width" : totalWidth + 50 + "px"
			//,"left" : initLeft + "px"
		}); 
		$listBody.bind("click", function(e){
			e.preventDefault();
		}); 
		setTimeout(function(){
			firstMove(); 
		},100);
		
		var moveX;
		$container.bind("mousedown", function(e) {
			e.preventDefault();
			if(draggState){
				var downTarget = e.target;
				var initX = e.pageX - $container.offset().left;
				var moveX;
				$(document).bind("mousemove", function(e) {
					e.preventDefault();
					moveX = e.pageX - $container.offset().left;
					moveX = moveX - initX;
					$listBody.css({
						"left" : nowLeft + moveX + "px"
					});
				});
				$(document).mouseup(function(e) {
					var upTarget = e.target;
					if(moveX == null){
						moveX = 0;
					}
					/*console.log(downTarget == upTarget)
					console.log($(upTarget).parent().hasClass("on"))
					console.log($(upTarget).parent().find("a").size() > 0)
					console.log(Math.abs(moveX) < 50)
					console.log(Math.abs(moveX))*/
					
					if(downTarget == upTarget && $(upTarget).parent().hasClass("on") && $(upTarget).parent().find("a").size() > 0 && Math.abs(moveX) < 50) {
						logoPlayer.pause();
						var targetName = $targetOn.attr("name");
						//console.log(targetName);
						var targetVideo = $("#video_" + targetName); 
						targetVideo.show();
						targetVideo[0].play();
						$("#emblem").addClass("targetOpen");
						$("#movieArea").addClass("show");
						var duration = (Number(targetVideo[0].duration) - 1) * 1000;
						if(duration == null){
							duration = 0;
						}
						//console.log(duration)
						setTimeout(function(){
							$("#brandIndex h2").hide();
							$("#brandIndex #emblem").hide();
							$("#bi_list").hide();
							$("#brandIndex .paging").hide();
							$("#movieArea").css("transition", "opacity 0s cubic-bezier(0.77, 0, 0.175, 1)") 
							$("#movieArea").animate({
								opacity : .7
							}, duration, function(){
								window.location = $(upTarget).attr("href");
							});
						}, 1000); 
						/*targetVideo.bind("ended", function(){
							window.location = $(upTarget).attr("href"); 
						})*/
					} else {
						if(moveX > 0){
							move('prev');
						} else if (moveX < 0){
							move('next');
						}
					}
					$(document).unbind("mousemove");
					$(document).unbind("mouseup");
				});
			}
		});
	}	
	
	function firstMove(){
		$listBody.addClass("ready");
		$listBody.css({
			"left" : firstMoveLeft + "px"
		});
		nowLeft = firstMoveLeft;
		setTimeout(function(){
			$targetOn = $listBody.find(".section:nth-child(13)"); 
			$targetOn.addClass("on");
			$("#brandIndex").addClass($targetOn.attr("name"));
			$("#pagingNow").html($targetOn.attr("idx"));
			logoPlayer = new ef.visual.Player({
				mode : "frame",
				frame : fitnessSource,
				reverse : false,
				length : 48,
				width : 390,
				height : 341,
				container : $("#emblem"),
				duration : 50
			});
			logoPlayer.rotate();
			draggState = true;
		},1000);
	}
	
	function move(txt){
		var $moveObj;
		var moveNum;
		var moveName;
		var moveCnt;
		if(draggState){
			draggState = false;
			$targetOn = $listBody.find(".section.on"); 
			if(txt == "next" || txt == "down") {
				$moveObj = $targetOn.next();
				if($moveObj.size() > 0){
					moveNum = (-Number($moveObj.attr("data")) - ((Number($targetOn.attr("data")) - Number($moveObj.attr("data"))) /2)); 
				} else {
					moveNum = 0; 
				}
			} else if(txt == "prev" || txt == "up") {
				$moveObj = $targetOn.prev();
				if($moveObj.size() > 0){
					moveNum = (Number($moveObj.attr("data")) + ((Number($targetOn.attr("data")) - Number($moveObj.attr("data"))) /2)); 
				} else {
					moveNum = 0; 
				}
			}
			if($moveObj.size() > 0){
				moveName = $moveObj.attr("name");
				if(moveName == "fitness"){
					logoPlayer.frameUpdate(fitnessSource); 
				}else if(moveName == "classic"){
					logoPlayer.frameUpdate(classicSource);
				}else if(moveName == "campaign"){
					logoPlayer.frameUpdate(campaignSource);
				}else if(moveName == "reeclub"){
					logoPlayer.frameUpdate(reeclubSource);
				}else if(moveName == "promotion"){
					logoPlayer.frameUpdate(promotionSource);
				}else if(moveName == "blog"){
					logoPlayer.frameUpdate(blogSource);
				}
				$targetOn.removeClass("on");
				$moveObj.addClass("on");
				$("#brandIndex").removeClass().addClass($moveObj.attr("name"));
				$("#pagingNow").html($moveObj.attr("idx"));
			}
			$listBody.css({
				"left" : nowLeft + moveNum + "px" 
			});
			setTimeout(function(){
				nowLeft = parseInt($listBody.css("left"));
				$targetOn = $moveObj; 
				draggState = true;
			},500);
		}
	}
	$(window).load(function(){
		setTimeout(function(){
			brandIndexInit();
		}, 500);
	});
})(jQuery);