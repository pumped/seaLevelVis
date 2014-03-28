
var height; //current sea level
var xCells; //count of cells
var yCells;
var vis;
var ctx;
var canvas;

var dem = {};
var demArr = [];


$(document).ready(function(){
	setupVis();
	setupControls();
	console.log(screen.availWidth);
	console.log(screen.availHeight)
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

		//create array
		var i=0
		for (x in dem) {
			demArr[i] = [];
			var j=0;
			for (y in dem[x]) {
				demArr[i][j] = dem[x][y];
				j++;
			}
			i++;
		}

		xCells = demArr.length;
		yCells = demArr[0].length;

		console.log('Loaded DEM of size: '+xCells+'x'+yCells);
		console.log(demArr);

		//set initial height
		setHeight(53);
	});
}

function setHeight(level) {
	height = level;
	//vis.clear();
	ctx.clearRect(0,0,canvas.width, canvas.height);

	console.log('drawing');
	pixelSize = 10;
	count = 0;
	
	//foreach grid cell
	for (var x = 0; x<xCells; x++) {
		//console.log(demArr[x]);
		for (var y = 0; y<yCells; y++){
			//console.log(demArr[x][y]);
			if (demArr[x][y] <= height){
				//vis.rect(pixelSize,pixelSize).move(pixelSize*x,pixelSize*y);
				ctx.fillRect(x*pixelSize,y*pixelSize,pixelSize,pixelSize);
				
			}
		}
	}
}