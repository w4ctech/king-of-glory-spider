const request = require('request');
const fs = require('fs');
const path = require("path");

const dirPath = path.join(__dirname, "api");
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log("文件夹创建成功");
} else {
    console.log("文件夹已存在");
}

function downloadFile(url,filename,callback){
    let stream = fs.createWriteStream('./api/'+filename);
    request(url).pipe(stream).on('close', callback);
}
let spiderUrl = [
    {url:'http://pvp.qq.com/web201605/js/herolist.json',name:'herolist.json'},
    {url:'http://pvp.qq.com/web201605/js/item.json',name:'item.json'},
    {url:'https://pvp.qq.com/web201605/js/ming.json',name:'ming.json'}
]
spiderUrl.forEach((item,id)=>{
    downloadFile(item.url,item.name,function(){
        console.log(item.name+'下载完毕');
    });
})

