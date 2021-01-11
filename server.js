const http = require('http');
const port = 8080;
const url = require('url');
const fs = require('fs');
const dbNames = "names.json"

let users = [];
if(fs.existsSync(dbNames)){
    users = JSON.parse(fs.readFileSync(dbNames, "utf-8"));
    users.forEach(el => {
        console.log(`it's ${el.name} and the ip is ${el.ip}`);
    });
}
const serverHandler = (request, response)=>{
    response.writeHead(200, {"Content-Type": "text/plain"})
    if (request.method === 'POST') {
        if (request.headers.iknowyoursecret === 'TheOwlAreNotWhatTheySeem') {
            if (request.headers.name) {
                users.push({name: request.headers.name, ip: request.connection.remoteAddress})
                fs.writeFile(dbNames, JSON.stringify(users, null, ' '), err => {
                    if (err) {
                        throw err;
                    }
                });
            }
        } else {
            console.log('Enter the secret.');
        }
    }
    response.end();
}
const server = http.createServer(serverHandler)

server.listen(port, (err)=>{
    if(err){
        return console.log('err is :', err);
    }
    console.log('Server has been started...');
})
