var Vector2d = function (x,y) {
	this.x = x;
	this.y = y;
};

Vector2d.prototype.lenghtSquare = function() {
	return ( this.x * this.x + this.y * this.y );
};

Vector2d.prototype.vecLenght = function() {
	return Math.sqrt( this.x * this.x + this.y * this.y );
};

function DotProduct( firstVector, secondVector) {
	return ( firstVector.x * secondVector.x ) + ( firstVector.y * secondVector.y );
}

var Contact = function () {
	this.penetration = 0;
	this.normal = new Vector2d(0,0);
	this.position = new Point(0,0);
	this.noOfCount = 0;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function collisionDetection( firstCircle, secondCircle) {
	var normal = new Vector2d( secondCircle.x - firstCircle.x, secondCircle.y - firstCircle.y );
	var squareDistance = normal.lenghtSquare();
	var circleDistance = firstCircle.radius + secondCircle.radius;

	if ( squareDistance > circleDistance * circleDistance) {
		return;
	}
	
	var distance = normal.vecLenght();
	secondCircle.manifold.noOfCount = 1;

	if ( distance == 0.0 ) {
    secondCircle.manifold.penetration = firstCircle.radius;
    secondCircle.manifold.normal = Vector2d( 1, 0 );
    secondCircle.manifold.position = new Point( firstCircle.x, firstCircle.y);
  }
  else {
    secondCircle.manifold.penetration = firstCircle.radius - distance;
    secondCircle.manifold.normal = new Vector2d( normal.x / distance, normal.y /distance );
    secondCircle.manifold.position = new Point( secondCircle.manifold.normal.x * firstCircle.radius + firstCircle.x, secondCircle.manifold.normal.y * firstCircle.radius + firstCircle.y);
  }
};

function collisionResolve ( firstCircle, secondCircle ) {
	if( secondCircle.manifold.noOfCount == 0) return;
	
	// relative velocity of second circle with respect to first circle
	var relativeVelocity = new Vector2d( secondCircle.velocity.x - firstCircle.velocity.x, secondCircle.velocity.y - firstCircle.velocity.y );
  
  // relative velocity along the normal
  var relativeVelocityNormal = DotProduct( relativeVelocity, secondCircle.manifold.normal );

  // return if two circles are moving away from each other
  if ( relativeVelocityNormal > 0) return;

  var impulse = -(1 + 1) * relativeVelocityNormal;
  impulse = impulse / ( (1 / firstCircle.mass ) + ( 1 / secondCircle.mass ) );
 
  // Apply impulse
  var impulseV = new Vector2d( impulse * secondCircle.manifold.normal.x, impulse * secondCircle.manifold.normal.y);
  firstCircle.velocity.x = (firstCircle.velocity.x -  ((1 / firstCircle.mass) * impulseV.x) ) ; 
  firstCircle.velocity.y = (firstCircle.velocity.y -  ((1 / firstCircle.mass) * impulseV.y))  ;

  secondCircle.velocity.x = (secondCircle.velocity.x + ((1 / secondCircle.mass) * impulseV.x)) ;
  secondCircle.velocity.y = (secondCircle.velocity.y + ((1 / secondCircle.mass)  * impulseV.y)) ;
  secondCircle.manifold = new Contact();
}
