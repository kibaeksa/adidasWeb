/**
    Infomation for your project
    * @property:{String : htmlPath}       Target html path
    * @property:{String : jsonFilePath}   Json file path
    * @property:{String : jsonFileName}   Json file name
                                         (You should create file before launch CodingList)
    * @property:{String : staticPath}     Path for static resource
*/
var adidasCodingListInfo = {
    htmlPath : setCustomPath('./app/html/adidas/'),
    jsonFilePath : setCustomPath('./app/data/codingList/adidas/'),
    jsonFileName : 'codingListInfo.json'
};


var reebokCodingListInfo = {
    htmlPath : setCustomPath('./app/html/reebok/'),
    jsonFilePath : setCustomPath('./app/data/codingList/reebok/'),
    jsonFileName : 'codingListInfo.json'
};


var brand;
var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var htmlList = {};
var htmlListJson;
var jsonPath;
var staticPath = './app';

var PORT = process.env.PORT || 2000;

try{
    var reebokHtmlListJson = require(reebokCodingListInfo.jsonFilePath + reebokCodingListInfo.jsonFileName)
    console.log('import json');
}catch(e){
    console.log(e);
    writeFile('{}' , './public/data/')
}

try{
    var adidasHtmlListJson = require(adidasCodingListInfo.jsonFilePath + adidasCodingListInfo.jsonFileName)
    console.log('import json');
}catch(e){
    console.log(e);
    writeFile('{}' , './public/data/')
}

app.use('/',express.static(path.join(__dirname , staticPath)));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.set('views', './views');
app.set('view engine', 'jade');


function setCustomPath(p){
    p.replace(/(^\/|^\w)/,function(val){
        if(val.match(/(\w|\W)/)){
        	return './'+val;
        }else{
        	return '.'+val;
        }
    }).replace(/\w$/,function(val){
        return val+'/';
    });

    return p;
}


/**
 * Merge two Object
 * @param {Object} target
 * @param {Object} source
 * @return {Object} Merged Object
 */
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

            if(target[key].htmlData){
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

            if(target[key].folderData){
                for(; i < target[key].folderData.length; i++){
                    if(source[key].folderData){
                        for(; j < source[key].folderData.length; j++){
                            if(target[key].folderData[i].name == source[key].folderData[j].name){

                                if(!!source[key].folderData[j].desc){
                                    target[key].folderData[i].desc = source[key].folderData[j].desc;

                                    j = 0;
                                    break;
                                }
                            }
                        }
                    }

                    j = 0;
                }
            }

        }
        i = 0;
    }
    return target;
}


/**
 * Write new json file
 * @param {Object} data
 * @param {String} targetPath
 */
function writeFile(data){
    var jPath;
    var jName;
    if(brand == 'adidas'){
        jPath = adidasCodingListInfo.jsonFilePath;
        jName = adidasCodingListInfo.jsonFileName;
    }else if(brand == 'reebok'){
        jPath = reebokCodingListInfo.jsonFilePath;
        jName = reebokCodingListInfo.jsonFileName;
    }else{
        console.log('잘못된 브랜드입니다.');
    }

    // fs.writeFile(path.join(__dirname , targetPath + codingListInfo.jsonFileName),data,function(err){
    fs.writeFile(path.join(__dirname , jPath + jName),data,function(err){
        if(err) return console.log(err);
    });
}


/**
 * Get files and directories from specific path
 * @param {Array} fileInfo
                  (There are at maximun 3 items)
                  0 : Specific path
                  1 : Category name (It will be key of object)
                  2 : Root path
 * @param {Object} targetObj
 * @return {Object} Return Handled Object
 */
function getFilesFromDir(fileInfo , targetObj){
    var ctgrName;
    var rootPath;
    var htmlListData = targetObj ? targetObj : {};

    if(fileInfo[1] == undefined){
        ctgrName = 'root';
        rootPath = '/';
    }else{
        ctgrName = fileInfo[1];
        rootPath = fileInfo[2]
    }

    var fileList = fs.readdirSync(path.join(__dirname,fileInfo[0]));

    if(fileList.length > 0){
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
                }
            }else{
                if(!htmlListData[ctgrName]){
                    htmlListData[ctgrName] = {
                        path : rootPath
                    };
                }

                if(htmlListData[ctgrName].folderData == undefined){
                    htmlListData[ctgrName].folderData = [];
                }

                htmlListData[ctgrName].folderData.push({
                    name : file
                });

                // if( !(fileInfo[0]+file).match(/\/build\/?/) ){
                    getFilesFromDir([fileInfo[0]+file+'/' ,rootPath.replace(/^\//,'root___').replace(/\//g,'___') + file, rootPath+file+'/'] , htmlListData);
                // }
            }
        });
    }else{
        htmlListData[ctgrName] = false;
    }

    return htmlListData;
}


/**
 * Initial HTML Coding list
 * @param {String} dirPath
 */
function init(dirPath){
    var newData = getFilesFromDir([dirPath]);
    var targetPath = jsonPath;
    // console.log(JSON.stringify(newData));

    htmlList = parseJsonData(newData , htmlListJson);

    writeFile(JSON.stringify(htmlList , null , 4));
}


app.get('/adidasCodingList',function(req , res){
    console.log(brand);
    brand = 'adidas';
    htmlListJson = adidasHtmlListJson;

    init('./app/html/adidas/');
    res.render('index', {
        filePath : '/data/codingList/adidas/',
        fileName : adidasCodingListInfo.jsonFileName,
        brand : brand
    });
});

app.get('/reebokCodingList',function(req , res){
    console.log(brand);
    brand = 'reebok';
    htmlListJson = reebokHtmlListJson;

    init('./app/html/reebok/');
    res.render('index', {
        filePath : '/data/codingList/reebok/',
        fileName : reebokCodingListInfo.jsonFileName,
        brand : brand
    });
});

//
// app.get('/',function(req , res){
//     var reg = new RegExp(codingListInfo.staticPath.replace(/^./,''));
//     var frontPath =  (codingListInfo.jsonFilePath.replace(/^.\//,'')).replace(reg,'');
//
//     /* Target HTML PATH */
//     init(htmlPath);
//     res.render('index',{
//         filePath : frontPath,
//         fileName : codingListInfo.jsonFileName
//     });
// });

app.post('/modifyHtmlJson',function(req , res){

    if(req.body.brand == 'reebok'){
        reebokHtmlListJson = req.body.htmlList;
    }else{
        adidasHtmlListJson = req.body.htmlList;
    }
    htmlListJson = req.body.htmlList;
    const jsonPath = req.body.brand == 'adidas' ?
        adidasCodingListInfo.jsonFilePath + adidasCodingListInfo.jsonFileName :
        reebokCodingListInfo.jsonFilePath + reebokCodingListInfo.jsonFileName;


    writeFile(JSON.stringify(req.body.htmlList , null , 4));
    res.sendStatus(200);
});


app.listen(PORT,function(){
    console.log('Running server in '+PORT+' port');
});
