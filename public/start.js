/** Backend; run within console using command: node 'filename.js' */
var express = require ('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var users = {};
var port = 8080;

/** Process the request made to the server. 
 * @param req: The request the client has made.
 * @param res: The data sent from the server to the client.
 * @note: To run locally from the console: node start.js
 * localhost:8080 or 127.0.0.1:8080 (Ctrl + c)
 * (Requirement 1.0)
 * */
app.get('/', function(req, res) {
	// res.send('<h1>Testing output.</h1>');
	var date = new Date();
    let h = date.getUTCHours();
    let m = date.getUTCMinutes();
    let str = '[' + h + ':' + m + '] ';

	// Display index file content to the client:
	res.sendFile(__dirname + '/index.html');
	console.log(str + 'client has sent a request.');
});

// Use files found in public folder.
app.use(express.static('public'));

// Start Express server:
server.listen(port, () => {
	console.log('listening to port ' + port + '...');
});

/** Handle event triggers; update console status. 
 * @param socket: User attributes; handle events by emission.
 * (Requirement 2.0)
 * */ 
io.on('connection', (socket) => {
	console.log('user ' + socket.id + ' has connected.');

	// Send message for certain socket:
	socket.broadcast.emit('New client connected to port: ' + port);
	// socket.user.name = 'Guest'; // Add class attribute.

	// Listening for events found by emission:
		socket.on('message', (msg) => {
			var date = new Date();
    		let h = date.getUTCHours();
    		let m = date.getUTCMinutes();
    		let str = '[' + h + ':' + m + '] ';

			console.log(str + msg);
			io.emit('message', str + msg);
		});

		/** Notify of disconnected user. */
		socket.on('disconnect', () => {
			socket.broadcast.emit(users[socket.id] + ' has disconnected.');
			console.log(socket.id + ' has disconnected.');
			delete users[socket.id];
		});

	  /** Set message to the content of the textarea.
	   *  Send to all other clients. 
       * @param msg: Content to display. 
       * (Requirement 3.0)
       * */
      socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', users[socket.id] + ': ' + msg);
        // document.getElementById('board').innerHtml = msg;
      });

      /** Setup username for input. 
       * @param username: Input to assign for new client. 
       * */
      socket.on('username', (username) => {
      	// (key, value) where the key is the unique
      	// socket.id generated by client and the
      	// username will be the value for each user. 
      	users[socket.id] = username;
      	socket.broadcast.emit('user_connection', username);
      });
});

/* Historic functions, documentation, etc:
	var path = require('path');
	
	server.listen(app.get('port'), function() {
 		console.log('Port ' + app.get('port'));
    });

      Assign object property to innerHTML tag.
      @param msg: Data to assign for object.      
      socket.on('message', function(msg) {
        var new_item = document.createElement('li');
        var date = new Date();
        let hour = date.getUTCHours();
        let min = date.getUTCMinutes();

        new_item.textContent = '['hour + ': ' + min + '] ' + msg;
        window.scrollTo(0, document.body.scrollHeight);
        new_item.innerHTML = '<p>New Message Example</p>';
        document.body.appendChild(new_item);
      });

      Alternative message event.
      @param socket: Object containing the data.
      io.on('connection', (socket) => {
        
      Emit to display for all clients.
      @param msg: Content of the field used during submission. 
      socket.on('message', (msg) => {
          io.emit('Message: ' + msg);
          console.log('Message: ' + msg);
        });

      Assign the user input as display name. 
      @param data: Name to assign. 
      client.on('message', function(data) {
          if (!user) {
            user = data;
            console.log(user + 'is connecting to server...');
            socket.broadcast(user + 'is connecting to server...');
          }

          socket.broadcast(user + ': ' + data);
        });
      });
*/