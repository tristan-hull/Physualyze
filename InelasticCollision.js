var sketch = function(q) {
    q.canvas;
    q.blockLeft;
    q.blockRight;
    q.leftVelocitySlider;
    q.rightVelocitySlider;
    q.leftMassSlider;
    q.rightMassSlider;
    q.elasticCheckbox;
    q.startButton;
    q.started;
    q.sliderPosition;
    q.loadCollisionFlag = false;
    q.collided = false;

    q.setupSketch = function() {
        q.collisionCanvas = q.createCanvas(800, 600);
        q.collisionCanvas.parent("sketch");
        q.collisionCanvas.position(0, 0)
        
        q.rectMode(q.CENTER);
        q.sliderPosition = q.createVector(825, 600)
        q.startButton = q.createButton('Start/Restart');
        q.startButton.mousePressed(q.start);
        q.startButton.position(960, 675);
    
        q.leftVelocitySlider = q.createSlider(-20, 20, 5);
        q.rightVelocitySlider = q.createSlider(-20, 20, -2);
        q.leftVelocitySlider.position(q.sliderPosition.x, q.sliderPosition.y);
        q.rightVelocitySlider.position(q.sliderPosition.x + 200, q.sliderPosition.y);
        
    
        q.leftMassSlider = q.createSlider(0, 3000, 1000);
        q.rightMassSlider = q.createSlider(0, 3000, 1000);
        q.leftMassSlider.position(q.sliderPosition.x, q.sliderPosition.y + 50);
        q.rightMassSlider.position(q.sliderPosition.x + 200, q.sliderPosition.y + 50);
    
        q.blockLeft = new Block(q.createVector(q.width/ 4, 2.5 * q.height / 4), q.leftVelocitySlider, q.leftMassSlider, 100);
        q.blockRight = new Block(q.createVector(3 * q.width / 4, 2.5 * q.height / 4), q.rightVelocitySlider, q.rightMassSlider, 200);
    }
    
    q.draw = function() {
        if (q.loadCollisionFlag) {
            q.background(51);
            q.blockLeft.move();
            q.blockRight.move();
            checkOverlap(q.blockLeft, q.blockRight);
        }
    }

    q.delete = function() {
        q.loadCollisionFlag = false;
        if (q.leftMassSlider != null)
        {
            q.startButton.remove();
            q.leftMassSlider.remove();
            q.leftVelocitySlider.remove();
            q.rightMassSlider.remove();
            q.rightVelocitySlider.remove();
        }
    }

    q.load = function() {
        q.loadCollisionFlag = true;
        q.started = false;
        setupSketch();
    }

    q.load = function() {
        q.setupSketch();
        q.loadCollisionFlag = true;
    }

    q.start = function() {
        q.blockLeft = new Block(q.createVector(q.width/ 4, 2.5 * q.height / 4), q.leftVelocitySlider, q.leftMassSlider, 200);
        q.blockRight = new Block(q.createVector(3 * q.width / 4, 2.5 * q.height / 4), q.rightVelocitySlider, q.rightMassSlider, 100);
        q.started = true;
        q.startButton.mousePressed(q.restart);
    }

    q.restart = function() {
        q.started = false;
        q.collided = false;
        q.blockLeft = new Block(q.createVector(q.width/ 4, 2.5 * q.height / 4), q.leftVelocitySlider, q.leftMassSlider, 200);
        q.blockRight = new Block(q.createVector(3 * q.width / 4, 2.5 * q.height / 4), q.rightVelocitySlider, q.rightMassSlider, 100);
        q.startButton.mousePressed(q.start);
    }

    q.checkOverlap = function(obj1, obj2) {
        if (obj1.position.x + obj1.size.x / 2 > obj2.position.x - obj2.size.x / 2 && !q.collided)
        {
            console.log((obj1.mass * obj1.velocity + obj2.mass * obj2.velocity) / (obj1.mass + obj2.mass))
            newVelocity = (obj1.mass * obj1.velocity + obj2.mass * obj2.velocity) / (obj1.mass + obj2.mass);
            obj1.velocity = newVelocity;
            obj2.velocity = newVelocity;
            console.log(obj1.velocity + ' ' + obj2.velocity);
            q.collided = true;
        }
    }

    function Block(startPosition, velocitySlider, massSlider, color) {
        this.position = startPosition;
        this.velocity = velocitySlider.value();
        this.mass = massSlider.value();
        this.size = q.createVector(this.mass / 8, this.mass / 8)
        this.color = color;


        this.move = function() {
            this.update();
            this.display();
        };
    
        this.update = function() {
            if (q.started) {
                this.position.add(this.velocity);
            }
            this.mass = massSlider.value();
            this.size = q.createVector(this.mass / 8, this.mass / 8);
        };

        this.display = function() {
            q.strokeWeight(2);    // Thickness 2
            q.stroke(color);        // White line
            q.fill(color)
            q.rect(this.position.x, this.position.y - this.size.y / 2, this.size.x, this.size.y);
        };
    }
} 

var inelasticCollision = new p5(sketch);

