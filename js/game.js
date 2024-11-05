class Game {
  constructor() {
    this.startScreen = document.getElementById("intro-screen");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("end-screen");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.livesElement.src = "images/threeheart.png";
    this.player = new Player(500, 200, "../images/ninja.png");
    this.height = 600;
    // this.width = 1450;
    this.obstacles = [];
    this.wall = [];
    this.shuriken = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.frame = 0;
  }
  start() {
    //set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //hide the start screen
    this.startScreen.style.display = "none";
    //show the game screen
    this.gameScreen.style.display = "block";
    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    console.log("in the game loop");
    this.frame++;

    this.update();

    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }

    if (this.frame % 160 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.frame % 220 === 0) {
      this.wall.push(new Wall(this.gameScreen));
    }
  }

  update() {
    this.player.applyGravity();
    this.player.top += this.player.directionY;
    if (this.player.directionY >= 500) {
      this.player.top = 500;
      this.player.directionY = 0;
      this.player.isOnGround = true; // Reset to allow another jump
    }

    //this calls the move method from the Player class
    this.player.move();
    //this calls the move method on EACH obstacle
    this.obstacles.forEach((oneObstacle, oneObstacleIndex) => {
      oneObstacle.move();
      //this checks each oneObstacle if it collided with my player
      const didHitMe = this.player.didCollide(oneObstacle);
      //if the red car hits my car, based on the didCollide method
      //then we subtract a life, remove the car from the array (splice), and remember to remove from the DOM
      console.log("did it hit???", didHitMe);
      //conditional checking when there is a collision
      if (didHitMe) {
        //subtract a life
        this.lives--;
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value
        this.livesElement.innerText = this.lives;
        //splice the obstacle out of the array
        this.obstacles.splice(oneObstacleIndex, 1);
        //remove the red car from the DOM
        oneObstacle.element.remove();
      }

      //check that the barril passes the left corner
      //then remove the barril from the array and the DOM
      if (oneObstacle.left + oneObstacle.width < 0) {
        //splice removes object from the array
        this.obstacles.splice(oneObstacleIndex, 1);
        //.remove method removes the barril the game screen
        oneObstacle.element.remove();
        //increase the score when the barril passes
        this.score++;
        //update the DOM to have the new score
        this.scoreElement.innerText = this.score;
      }
    });
    this.wall.forEach((oneWall, oneWallIndex) => {
      oneWall.move();
      //this checks each oneObstacle if it collided with my player
      const didHitMe = this.player.didCollide(oneWall);
      //if the red car hits my car, based on the didCollide method
      //then we subtract a life, remove the car from the array (splice), and remember to remove from the DOM
      console.log("did it hit???", didHitMe);
      //conditional checking when there is a collision
      if (didHitMe) {
        //subtract a life
        this.lives--;
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value
        this.livesElement.innerText = this.lives;
        //splice the obstacle out of the array
        this.wall.splice(oneWallIndex, 1);
        //remove the red car from the DOM
        oneWall.element.remove();
      }

      //check that the barril passes the left corner
      //then remove the barril from the array and the DOM
      // if (oneObstacle.left + oneObstacle.width < 0) {
      //   //splice removes object from the array
      //   this.obstacles.splice(oneObstacleIndex, 1);
      //   //.remove method removes the barril the game screen
      //   oneObstacle.element.remove();
      //   //increase the score when the barril passes
      //   this.score++;
      //   //update the DOM to have the new score
      //   this.scoreElement.innerText = this.score;
      // }
    });
    // Shuriken

    this.shuriken.forEach((oneShuriken, shurikenIndex) => {
      oneShuriken.move();
      //check that the Shuriken passes the right corner
      //then remove the Shuriken from the array and the DOM
      if (oneShuriken.left + oneShuriken.width > 1900) {
        //splice removes object from the array
        this.shuriken.splice(shurikenIndex, 1);
        //.remove method removes the barril the game screen
        oneShuriken.element.remove();
      }
      this.wall.forEach((oneWall, wallIndex) => {
        // check if the shuriken collided with an obstacle
        if (oneShuriken.didCollide(oneWall)) {
          //splice removes object from the array
          this.shuriken.splice(shurikenIndex, 1);
          //.remove method removes the car the game screen
          oneShuriken.element.remove();
          //splice removes object from the array
          this.wall.splice(wallIndex, 1);
          //.remove method removes the barril the game screen
          oneWall.element.remove();
          //increase the score when the barril passes
          this.score++;
          //update the DOM to have the new score
          this.scoreElement.innerText = this.score;
        }
      });
    });
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
