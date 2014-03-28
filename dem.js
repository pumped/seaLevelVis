
var height; //current sea level
var xCells; //count of cells
var yCells;
var vis;

var dem = [[1,2,5,2,1],[1,2,5,2,1],[1,2,5,2,1],[1,2,5,2,1]];

function setupVis() {
	//create svg
	vis = SVG('vis').size('100%', '100%');
	var rect = draw.rect(100,100).move(100,100);
	//load dem
}

function setHeight(level) {
	height = level;
	
	//foreach grid cell
	for (var i = 0; i<xCells; i++) {
		for (var y = 0; y<yCells; y++){
			//set cell on or off
		}
	}
}