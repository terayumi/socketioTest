var express = require('express');
var app = express();
var server = require('http').createServer(app);
var {Server}=require('socket.io');
var fs = require('fs');
var io = new Server(server);
let logs=[];
app.get("/", function (request, response) {
    console.log('app9');
    response.write(fs.readFileSync('index.html'));
    response.end();
});

io.on('connection', function (socket) {
    socket.on('client_to_server', function (data) {
        logs.push(data);
        for(let i=0;i<logs.length;i++){
            io.emit('server_to_client', { value: logs[i].value });
        }
        
    });
});

function reload(){
    data='hello'
    console.log(data);
    io.emit('server_to_client',{value:'hello'})
    
}

server.listen(8000);
