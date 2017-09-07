var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var adidasHtmlListJson = require('./app/data/codingList/adidas/codingListInfo.json');
var reebokHtmlListJson = require('./app/data/codingList/reebok/codingListInfo.json');
var objFromJson;

var app = express();
var PORT = process.env.PORT || 2000;
var rootPath = '/';


function parseJsonData(target , source){
    var key,
        i = 0,
        j = 0;

    /* Indexing in particular object */
    for(key in target){
        if(source[key] && !!source[key].desc){
            target[key].desc = source[key].desc;
        }

        if(source[key] && (source[key].path == target[key].path)){
            /* Matching name property one by one which included  array in loop */
            for(; i < target[key].htmlData.length; i++){
                for(; j < source[key].htmlData.length; j++){
                    if(target[key].htmlData[i].name == source[key].htmlData[j].name){

                        if(!!source[key].htmlData[j].desc){
                            target[key].htmlData[i].desc = source[key].htmlData[j].desc;

                            j = 0;
                            break;
                        }
                    }
                }
                j = 0;
            }
        }
        i = 0;
    }

    return target;

}

function writeFile(data , targetPath){
    fs.writeFile(path.join(__dirname , targetPath+'codingListInfo.json'),data,function(err){
        if(err) return console.log(err);
    });
}


function getFilesFromDir(fileInfo , targetObj){
    /*
        fileInfo : [
            0 : Path
            1 : Category name (It will be key of object)
            2 : Root path
        ]
    */
    var ctgrName;
    var rootPath;
    var dirCount = 0;
    var htmlListData = targetObj ? targetObj : {};

    if(fileInfo[1] == undefined){
        ctgrName = 'root';
        rootPath = '/';
    }else{
        ctgrName = fileInfo[1];
        rootPath = fileInfo[2]
    }

    var fileList = fs.readdirSync(path.join(__dirname,fileInfo[0]));

    fileList.forEach(function(file){

        var stats = fs.statSync(path.join(__dirname,fileInfo[0]+file));

        if(stats.isFile()  && !file.match(/\.html/) ){
            return;
        }

        if(stats.isFile()){
            var isExsist = false;

            if(!htmlListData[ctgrName]){
                htmlListData[ctgrName] = {
                    path : rootPath
                };
            }

            /* Checking whether it has already that file infomation */
            if(htmlListData[ctgrName].htmlData){
                for(var i = 0; i< htmlListData[ctgrName].htmlData.length; i++){
                    if(htmlListData[ctgrName].htmlData[i].name == file){
                        // console.log('Already exsist!');
                        isExsist = true;
                        break;
                    }
                }
            }


            if(!isExsist){
                if(htmlListData[ctgrName].htmlData == undefined){
                    htmlListData[ctgrName].htmlData = [];
                }

                htmlListData[ctgrName].htmlData.push({
                    name : file
                });

                dirCount += 1;
            }
        }else{

            if( !(fileInfo[0]+file).match(/\/build\/?/) ){
                getFilesFromDir([fileInfo[0]+file+'/' ,rootPath.replace(/^\//,'root___').replace(/\//g,'___') + file, rootPath+file+'/'] , htmlListData);
            }
        }
    });

    return htmlListData;

}
/* getFilesFromDir Function END */


function init(dirPath){
    console.log(dirPath);

    var newData = getFilesFromDir([dirPath]);
    var targetPath = dirPath == './app/html/reebok/' ? './app/data/codingList/reebok/' : './app/data/codingList/adidas/' ;

    if(targetPath == './app/data/codingList/reebok/'){
        htmlList = parseJsonData(newData , reebokHtmlListJson);
    }else{
        htmlList = parseJsonData(newData , adidasHtmlListJson);
    }

    writeFile(JSON.stringify(htmlList , null , 4) , targetPath);
}

// init();


app.set('views', './views');
app.set('view engine', 'jade');
app.use('/',express.static(path.resolve(__dirname,'./app')));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.get('/adidasCodingList',function(req , res){
    init('./app/html/adidas/');
    // res.sendFile(__dirname+'/index.html');
    res.render('index', {
        brand : 'adidas'
    });
});

app.get('/reebokCodingList',function(req , res){
    init('./app/html/reebok/');
    // res.sendFile(__dirname+'/index.html');
    res.render('index', {
        brand : 'reebok'
    });
});

app.post('/modifyHtmlJson',function(req , res){
    var data = {
        objFromJson : objFromJson
    };

    if(req.body.brand == 'reebok'){
        reebokHtmlListJson = req.body.htmlList;
    }else{
        adidasHtmlListJson = req.body.htmlList;
    }

    writeFile(JSON.stringify(req.body.htmlList , null , 4) , req.body.targetPath);
    res.sendStatus(200);

});

app.listen(PORT , function(){
	console.log('Example app lsitening on port '+PORT+'!');
});
