
const http= require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    

    let path='./Views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode= 200;
            break;
        case '/about':
            path+='/about.html';
            res.statusCode= 200;
            break;
        case '/about-us':
            res.statusCode= 301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='/404.html';
    }

    res.setHeader('Content-Type','text/html');
    fs.readFile(path,(error,data)=>{
        if(error){
            console.log(error);
            res.end();
        }
        else{
            res.write(data)
            res.end();
        }
    })
});

server.listen(3000,'localhost',()=>{
    
});