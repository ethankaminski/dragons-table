function appendAndScroll(el) {
	var e=document.getElementById('chat-scroll');
	e.appendChild(el);
	e.scrollTop = e.scrollHeight
}
function onChat(socket,msg) {
	var d=document.createElement('div');
	d.className='chat-message';
	var s;
	if(KNOWN_PLAYERS[msg.from])
		s=KNOWN_PLAYERS[msg.from].HTML
	else
		s="Unidentified Player";
	d.innerHTML="<span class='username' title='"+new Date(msg.time)+"'>"+s+":</span> (( "+msg.data+" ))";
	appendAndScroll(d);
}
function addChatInformationalMessage(msg) {
	var d=document.createElement('div');
	d.className='chat-info';
	d.innerHTML=msg;
	appendAndScroll(d);
}

function initChatLog() {
	var chat=document.getElementById('chat-text');
	chat.addEventListener('keydown',function(evt){
		// enter
		if (evt.keyCode == 13) {
			handleChatMessage(evt,chat);
		}
	})
}

function handleChatMessage(evt,chat) {
	// TODO: Check for option or something to insert a literal newline.
	app.socket.emit('chat',{type:'chat',data:chat.value,time:new Date()/1});
	chat.value=''
	evt.preventDefault();
}

