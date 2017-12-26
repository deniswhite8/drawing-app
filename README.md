# Drawing App

### Setup
* `npm i`
* open [127.0.0.1:8080](http://127.0.0.1:8080/)

### Server description
start webserver on port 8080:
```js
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
```

add directory with our static files:
```js
app.use(express.static(__dirname + '/public'));
```

event-handler for new incoming connections:
```js
io.on('connection', function (socket) {...}
```

first send the history to the new client:
```js
for (...)
    socket.emit('draw_line', { line: line_history[i] } );
```

add handler for message type "draw_line":
```js
socket.on('draw_line', function (data) {...}
```

add received line to history:
```js
line_history.push(data.line);
```

send line to all clients:
```js
io.emit('draw_line', { line: data.line });
```

### Autotests
```sh
node server.js
./node_modules/mocha/bin/mocha
```
