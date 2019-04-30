var sketch = function(p) {
  p.pendulum;
  p.lenSlider;
  p.massSlider;
  p.gravitySlider;
  p.loadPendulumFlag = false;

  p.setupSketch = function() {
    p.pendulumCanvas = p.createCanvas(800, 600);
    p.pendulumCanvas.parent("sketch");
    p.sliderPosition = p.createVector(750, 700)
    p.lenSlider = p.createSlider(30, 350, 160);
    p.lenSlider.position(p.sliderPosition.x, p.sliderPosition.y)
    p.massSlider = p.createSlider(10, 100, 55);
    p.massSlider.position(p.sliderPosition.x + 175, p.sliderPosition.y)  
    p.gravitySlider = p.createSlider(.01, 2, .9);
    p.gravitySlider.position(p.sliderPosition.x + 350, p.sliderPosition.y)
    p.pendulum = new Pendulum(p.createVector(p.width/2,0));
  }

  p.draw = function() {
    if (p.loadPendulumFlag) {
      p.background(51);
      p.pendulum.swing();
    }
  }

  p.load = function() {
    p.delete();
    p.loadPendulumFlag = true;
    p.setupSketch();
  }

  p.delete = function() {
    p.loadPendulumFlag = false;
    if (p.lenSlider != null)
    {
      p.lenSlider.remove();
      p.massSlider.remove();
      p.gravitySlider.remove();
    }
  }
}

var pendulum = new p5(sketch);


function Pendulum(startPosition){
  this.startPosition = startPosition;
  this.position = pendulum.createVector();
  this.size = pendulum.lenSlider.value();
  this.currentAngle = -pendulum.PI/4;
  this.angularVelocity = 0.0;
  this.angularAcceleration = 0.0;
  this.ballSize = pendulum.massSlider.value();      // Arbitrary ball radius
  this.damping = .999;

  this.swing = function() {
    this.update();
    this.display();
  };

  // Function to update position
  this.update = function() {
    this.size = pendulum.lenSlider.value();
    this.ballSize = pendulum.massSlider.value();
    gravity = -pendulum.gravitySlider.value();
    this.angularAcceleration = (gravity / this.size) * pendulum.sin(this.currentAngle);  
    this.angularVelocity += this.angularAcceleration;                         // Increment velocity
    this.angularVelocity *= this.damping;                                     // Multiply for damping
    this.currentAngle += this.angularVelocity;                                // Increment angle
  };

  function getAngle(theta, r)
  {
    return pendulum.createVector(r * pendulum.sin(theta), r * pendulum.cos(theta));
  }

  //Does everything related to showing the current state
  this.display = function() {
    this.position = getAngle(this.currentAngle, this.size).add(this.startPosition);         //Sets the position of the object on the screen
    pendulum.strokeWeight(2);    // Thickness 2
    pendulum.stroke(200);        // White line
    pendulum.line(this.startPosition.x, this.startPosition.y, this.position.x, this.position.y);     // Draw the arm
    pendulum.ellipseMode(pendulum.CENTER);
    pendulum.fill("#42f48c");
    pendulum.ellipse(this.position.x, this.position.y, this.ballSize, this.ballSize);                // Draw the weight
  };
}