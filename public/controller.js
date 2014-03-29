var socket;


$(document).ready(function(){
	socket = io();
	socket.emit('height','1');

	socket.on('height', function(data){
		$('#slider').slider('value',data.height);
		setUI(data.height);
	});

	$(function() {
	    $( "#slider" ).slider({
	    	min:-5,
	    	max:100,
	    	value: 50,
	    	slide: function(event, ui) {
	    		console.log(ui.value);
	    		setHeight(ui.value);
	    	},
	    	create: function(event, ui) {
	    		$('.ui-slider-handle').html('<img src="dragme.png" style="margin-top: 130px;    margin-left: -55px;">');
	    	}
	    });
	});
});

function setUI(height) {
	$('#height .value').html(height);
}

function setHeight(height) {
	socket.emit('height',height);
	setUI(height);
}