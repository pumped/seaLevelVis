
var height; //current sea level
var xCells; //count of cells
var yCells;
var vis;
var ctx;
var canvas;

var socket;

var dem = {};
var demArr = [];

var lastx = 0;
var xSensitivity = 15;
var maxHeight = 200;


$(document).ready(function(){
	setupVis();
	setupControls();
	console.log(screen.availWidth);
	console.log(screen.availHeight)
	socket = io()

	socket.on('height', function(data){
		lvl = parseInt(data.height);
		setHeight(lvl);
	});

	socket.emit('height','50');

	$('#wrapper').draggable();
});


function setupControls() {
	/*console.log('setup');
	$(document).keydown(function(e){
		e.preventDefault();
		if (e.which == 38) { //up
			$('#vis').height($('#vis').height()+1);
		} else if (e.which == 40) { //down
			$('#vis').height($('#vis').height()-1);
		} else if (e.which == 37) { //left
			$('#vis').height($('#vis').width()-1);
		} else if (e.which == 39) { //right 
			$('#vis').height($('#vis').width()+1);
		} else {

		}
	});*/
	
	$(document).mousemove(function(event){
		if (event.pageX > lastx + xSensitivity || event.pageX < lastx - xSensitivity) {
			lastx = event.pageX;
			newHeight = Math.round((maxHeight/window.innerWidth)*(window.innerWidth-event.pageX))-10;
			console.log(newHeight);
			setHeight(newHeight);
			socket.emit('height',newHeight);
		}
	});
}


function setupVis() {
	//create svg
	//vis = SVG('vis').size('100%', '100%');
	canvas = document.getElementById('vis');
	ctx=canvas.getContext('2d');
	ctx.fillStyle='#0000FF';

	//load dem
	//dem = {};
	$.ajax({
		url: 'dem100.txt'
	}).done(function(data){
		console.log('loaded');

		dem = {};

		//create dictionary
		data = data.split('\n');
		for (i in data) {
			coords = data[i].split(',');
			xCoord = String(coords[0]);
			yCoord = String(coords[1]);
			if (!dem.hasOwnProperty(xCoord)) {
				dem[xCoord] = {};
			}
			dem[xCoord][yCoord] = coords[2];
		}

		console.log(size(dem));

		//create array
		var i=0
		for (x in dem) {
			demArr[i] = [];
			var j=0;
			console.log(size(dem[x]));
			if (size(dem[x]) == 100) {
				for (y in dem[x]) {
					demArr[i][j] = dem[x][y];
					j++;
				}
				//demArr[i].reverse();
				i++;
			}
		}

		/*for (i=0; i<18; i++) {
			demArr.pop();
			console.log('pop');
		}*/
		//demArr.pop();
		//demArr.reverse();

		xCells = demArr.length;
		yCells = demArr[0].length;

		console.log('Loaded DEM of size: '+xCells+'x'+yCells);
		console.log(demArr);

		//set initial height
		setHeight(50);
	});
}

function setHeight(level) {
	height = level;
	//vis.clear();
	ctx.clearRect(0,0,canvas.width, canvas.height);

	$('#seaLevel .value').html(height);
	pixelSize = 10;
	count = 0;
	
	//foreach grid cell
	for (var x = 0; x<yCells; x++) {
		//console.log(demArr[x]);
		for (var y = 0; y<xCells; y++){
			//console.log(demArr[x][y]);
			if (demArr[y][x] <= height){
				//vis.rect(pixelSize,pixelSize).move(pixelSize*x,pixelSize*y);
				ctx.fillRect(x*pixelSize,y*pixelSize,pixelSize,pixelSize);
				
			} else {
				//console.log(x+":"+y);
			}
		}
	}
}


function size(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};