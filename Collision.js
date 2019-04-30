var sketch = function(p) {
    p.canvas;
    p.blockLeft;
    p.blockRight;
    p.leftVelocitySlider;
    p.rightVelocitySlider;
    p.leftMassSlider;
    p.rightMassSlider;
    p.elasticCheckbox;
    p.startButton;
    p.started;
    p.sliderPosition;
    p.loadCollisionFlag = false

    p.setupSketch = function() {
        p.collisionCanvas = p.createCanvas(800, 600);
        p.collisionCanvas.parent("sketch");
        p.collisionCanvas.position(0, 0)
        
        p.rectMode(p.CENTER);
        p.sliderPosition = p.createVector(825, 600)
        p.startButton = p.createButton('Start/Restart');
        p.startButton.mousePressed(p.start);
        p.startButton.position(960, 675);
    
        p.leftVelocitySlider = p.createSlider(-20, 20, 5);
        p.rightVelocitySlider = p.createSlider(-20, 20, -2);
        p.leftVelocitySlider.position(p.sliderPosition.x, p.sliderPosition.y);
        p.rightVelocitySlider.position(p.sliderPosition.x + 200, p.sliderPosition.y);
        
    
        p.leftMassSlider = p.createSlider(0, 3000, 1000);
        p.rightMassSlider = p.createSlider(0, 3000, 1000);
        p.leftMassSlider.position(p.sliderPosition.x, p.sliderPosition.y + 50);
        p.rightMassSlider.position(p.sliderPosition.x + 200, p.sliderPosition.y + 50);
    
        p.blockLeft = new Block(p.createVector(p.width/ 4, 2.5 * p.height / 4), p.leftVelocitySlider, p.leftMassSlider, 200);
        p.blockRight = new Block(p.createVector(3 * p.width / 4, 2.5 * p.height / 4), p.rightVelocitySlider, p.rightMassSlider, 100);
    }
    
    p.draw = function() {
        if (p.loadCollisionFlag) {
            p.background(51);
            p.blockLeft.move();
            p.blockRight.move();
            checkOverlap(p.blockLeft, p.blockRight);
        }
    }

    p.delete = function() {
        p.loadCollisionFlag = false;
        if (p.leftMassSlider != null)
        {
            p.startButton.remove();
            p.leftMassSlider.remove();
            p.leftVelocitySlider.remove();
            p.rightMassSlider.remove();
            p.rightVelocitySlider.remove();
        }
    }

    p.load = function() {
        p.loadCollisionFlag = true;
        p.started = false;
        setupSketch();
    }

    p.load = function() {
        p.setupSketch();
        p.loadCollisionFlag = true;
    }

    p.start = function() {
        p.blockLeft = new Block(p.createVector(p.width/ 4, 2.5 * p.height / 4), p.leftVelocitySlider, p.leftMassSlider, 200);
        p.blockRight = new Block(p.createVector(3 * p.width / 4, 2.5 * p.height / 4), p.rightVelocitySlider, collision.rightMassSlider, 100);
        p.started = true;
        p.startButton.mousePressed(restart);
    }

    p.restart = function() {
        p.started = false;
        p.blockLeft = new Block(p.createVector(p.width/ 4, 2.5 * p.height / 4), p.leftVelocitySlider, p.leftMassSlider, 200);
        p.blockRight = new Block(p.createVector(3 * p.width / 4, 2.5 * p.height / 4), p.rightVelocitySlider, p.rightMassSlider, 100);
        p.startButton.mousePressed(p.start);
    }
} 

var collision = new p5(sketch);

function checkOverlap(obj1, obj2) {
    if (obj1.position.x + obj1.size.x / 2 > obj2.position.x - obj2.size.x / 2)
    {
        old1Vel = obj1.velocity;
        old2Vel = obj2.velocity;
        obj1.velocity = (((obj1.mass - obj2.mass) / (obj1.mass + obj2.mass)) * old1Vel) + (((2 * obj2.mass) / (obj1.mass + obj2.mass)) * old2Vel);
        obj2.velocity = (((2 * obj1.mass) / (obj1.mass + obj2.mass)) * old1Vel) + (((obj2.mass - obj1.mass) / (obj1.mass + obj2.mass)) * old2Vel);
    }
} 

function Block(startPosition, velocitySlider, massSlider, color){
    this.position = startPosition;
    this.velocity = velocitySlider.value();
    this.mass = massSlider.value();
    this.size = collision.createVector(this.mass / 8, this.mass / 8)
    this.color = color;


    this.move = function() {
        this.update();
        this.display();
    };
    
    this.update = function() {
        if (collision.started) {
            this.position.add(this.velocity);
        }
        this.mass = massSlider.value();
        this.size = collision.createVector(this.mass / 8, this.mass / 8);
    };

    this.display = function() {
        collision.strokeWeight(2);    // Thickness 2
        collision.stroke(color);        // White line
        collision.fill(color)
        collision.rect(this.position.x, this.position.y - this.size.y / 2, this.size.x, this.size.y);
    };
}
