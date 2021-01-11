const http = require('http');
const options ={
    hostname: 'localhost',
    port: '8080',
    method: 'POST',
    headers: {
        name: 'David',
        iKnowYourSecret: 'TheOwlAreNotWhatTheySeem'
    }
}

const request = http.request(options, res =>{
    console.log(`The secret is: ${options.headers.iKnowYourSecret}`);
})
request.on('error', error => {
    console.error(error)
});

request.end();
