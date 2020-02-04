const request = require('request')
const fs = require('fs')
const path = require("path")
let storeUrl = []
const dirPath = path.join(__dirname, "api")
function downloadFile(url,filename,callback){
    let stream = fs.createWriteStream('./api/'+filename);
    request(url).pipe(stream).on('close', callback);
}
let spiderUrl = [
    {url:'http://pvp.qq.com/web201605/js/herolist.json',name:'herolist.json'},
    {url:'http://pvp.qq.com/web201605/js/item.json',name:'item.json'},
    {url:'https://pvp.qq.com/web201605/js/ming.json',name:'ming.json'}
]
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    spiderUrl.forEach((item)=>{
        downloadFile(item.url,item.name,function(){
            console.log(item.name+'下载完毕');
        });
    })
} else {
    fs.readdir('./api','utf8',function (err,data) {
        storeUrl = data
        if(storeUrl.length != spiderUrl.length){
            spiderUrl.forEach((item)=>{
                downloadFile(item.url,item.name,function(){
                    console.log(item.name+'下载完毕');
                });
            })
        }else{
            console.log('文件已存在')
        }
    })
}

