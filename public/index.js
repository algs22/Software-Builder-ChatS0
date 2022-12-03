var socket = io();
var field_msg = document.getElementById('field_msg');
var button_msg = document.getElementById('button_msg');
var messages = document.getElementById('field_text');

var button_username = document.getElementById('button_username');
var button_msg = document.getElementById('button_msg');
var user;

/** Upon mouseclick, send the field data. 
 * @param event: 
 * */
button_msg.addEventListener('click', function(event) {
	event.preventDefault();

	// If message field is not empty:
		// Send content contained in the field.
		// Set field to 'empty'.
	if (field_msg.value) {
		socket.emit('message', button_msg.value);
		field_msg.value = '';
	}
});

/** Assign object property to innerHTML tag.
 * @param msg: Data to assign for object.
 * */
// Trigger when line 13:
socket.on('message', function(msg) {
	var new_item = document.createElement('li');
	var date = new Date();
	let hour = date.getUTCHours();
	let min = date.getUTCMinutes();

	new_item.textContent = '['hour + ': ' + min + '] ' + msg;
	messages.appendChild(new_item);
	window.scrollTo(0, document.body.scrollHeight);
	document.getElementById('field_msg').append(new_item);
});

/** Alternative message event.
 * @param socket: Object containing the data.
 * */
io.on('connection', (socket) => {
	
	/** Emit to display for all clients.
	 * @param msg: Content of the field used during submission. 
	 * */
	socket.on('message', (msg) => {
		io.emit('Message: ' + msg);
		console.log('Message: ' + msg);
	});

	/** Assign the user input as display name. 
	 * @param data: Name to assign. 
	 * */
	client.on('message', function(data) {
		if (!user) {
			user = data;
			console.log(user + 'is connecting to server...');
			socket.broadcast(user + 'is connecting to server...');
		}

		socket.broadcast(user + ': ' + data);
	});
});