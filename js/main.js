var circle = [];
var color = ['blank','red','black','green','blue', 'white'];
function start() {
	 canvasE = document.getElementById('canvas');
	 con = canvasE.getContext('2d');
	 for (var i = 1 ; i <= 5; i++) {
	 	circle[i] = new Circle(new Point(getRandomInt(100,800), getRandomInt(100, 500)), getRandomInt(10, 50))
	 };
	renderme();	 
}

function renderme() {
	con.clearRect( 0, 0, 900, 600 );
	
	for (var i = 1; i <= 5; i++) {
		var  circleFirst = circle[i];
		for (var j = 1; j <= 5; j++ ) {
			if( i != j ) collisionDetection( circleFirst, circle[j] );	
		};
	};

	for (var i = 1; i <= 5; i++) {
		var  circleFirst = circle[i];
		for (var j = 1; j <= 5; j++ ) {
			if( i != j ) collisionResolve( circleFirst, circle[j] );
		};
	};

	for (var i = 1; i <= 5; i++) {
		circle[i].update();
		circle[i].draw( con, color[i] );
	};
	window.requestAnimationFrame( renderme )	
}

