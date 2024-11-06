class Game {
  constructor() {
    this.startScreen = document.getElementById("intro-screen");
    this.gameScreen = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("end-screen");
    this.highScoresElement = document.getElementById("high-scores");
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.livesElement.src = "images/threeheart.png";
    this.player = new Player(530, 180, "images/ninja.png");
    this.height = 730;
    // this.width = 1450;
    this.obstacles = [];
    this.box = [];
    this.wall = [];
    this.bees = [];
    this.shuriken = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.frame = 0;
    // adding audio
    this.gameOverMusic = new Audio("sounds/game-over.mp3");
    this.gameMusic = new Audio("sounds/music-background.mp3");
    this.hit = new Audio("sounds/hit.mp3");
    this.break = new Audio("sounds/break.mp3");
    this.hit.volume = 0.1;
    this.gameOverMusic.volume = 0.1;
    this.gameMusic.volume = 0.1;
  }
  start() {
    this.gameMusic.play();
    //set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //hide the start screen
    this.startScreen.style.display = "none";
    //show the game screen
    this.gameScreen.style.display = "block";

    //add the img elements to the lives element
    this.updateLifeHearts();
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

    if (this.frame % 280 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.frame % 370 === 0) {
      this.box.push(new Box(this.gameScreen));
    }

    if (this.frame % 500 === 0) {
      this.wall.push(new Wall(this.gameScreen));
    }

    if (this.frame % 890 === 0) {
      this.bees.push(new Bees(this.gameScreen));
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
        this.hit.play();
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value (this is for the number as a life)
        // this.livesElement.innerText = this.lives;
        // update the lives DOM with an image instead
        this.updateLifeHearts();
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
    this.box.forEach((oneBox, oneBoxIndex) => {
      oneBox.move();
      //this checks each oneObstacle if it collided with my player
      const didHitMe = this.player.didCollide(oneBox);
      //if the red car hits my car, based on the didCollide method
      //then we subtract a life, remove the car from the array (splice), and remember to remove from the DOM
      console.log("did it hit???", didHitMe);
      //conditional checking when there is a collision
      if (didHitMe) {
        //subtract a life
        this.lives--;
        this.hit.play();
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value (this is for the number as a life)
        // this.livesElement.innerText = this.lives;
        // update the lives DOM with an image instead
        this.updateLifeHearts();
        //splice the obstacle out of the array
        this.box.splice(oneBoxIndex, 1);
        //remove the red car from the DOM
        oneBox.element.remove();
      }

      //check that the barril passes the left corner
      //then remove the barril from the array and the DOM
      if (oneBox.left + oneBox.width < 0) {
        //splice removes object from the array
        this.box.splice(oneBoxIndex, 1);
        //.remove method removes the barril the game screen
        oneBox.element.remove();
        //increase the score when the barril passes
        this.score++;
        //update the DOM to have the new score
        this.scoreElement.innerText = this.score;
      }
    });
    this.bees.forEach((oneBees, oneBeesIndex) => {
      oneBees.move();
      //this checks each oneObstacle if it collided with my player
      const didHitMe = this.player.didCollide(oneBees);
      //if the red car hits my car, based on the didCollide method
      //then we subtract a life, remove the car from the array (splice), and remember to remove from the DOM
      console.log("did it hit???", didHitMe);
      //conditional checking when there is a collision
      if (didHitMe) {
        //subtract a life
        this.lives--;
        this.hit.play();
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value (this is for the number as a life)
        // this.livesElement.innerText = this.lives;
        // update the lives DOM with an image instead
        this.updateLifeHearts();
        //splice the obstacle out of the array
        this.bees.splice(oneBeesIndex, 1);
        //remove the red car from the DOM
        oneBees.element.remove();
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
        this.hit.play();
        if (this.lives === 0) {
          this.gameIsOver = true;
          console.log("loose");
        }
        //update the lives DOM to the new value (this is for the number as a life)
        // this.livesElement.innerText = this.lives;
        // update the lives DOM with an image instead
        this.updateLifeHearts();
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
          this.break.play();
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

      this.bees.forEach((oneBees, beesIndex) => {
        // check if the shuriken collided with an obstacle
        if (oneShuriken.didCollide(oneBees)) {
          this.break.play();
          //splice removes object from the array
          this.shuriken.splice(shurikenIndex, 1);
          //.remove method removes the car the game screen
          oneShuriken.element.remove();
          //splice removes object from the array
          this.bees.splice(beesIndex, 1);
          //.remove method removes the barril the game screen
          oneBees.element.remove();
          //increase the score when the barril passes
          this.score++;
          //update the DOM to have the new score
          this.scoreElement.innerText = this.score;
        }
      });
    });
  }

  gameOver() {
    this.gameMusic.pause();
    this.gameOverMusic.play();
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";

    //storing the high scores
    // first, check if there are already scores
    const scoresInLocalStorage = JSON.parse(localStorage.getItem("highScores"));
    let topThree = [];
    if (scoresInLocalStorage) {
      // this is AFTER the first game when there are scores
      scoresInLocalStorage.push(this.score);
      // After I push  your new score, then sort descending
      scoresInLocalStorage.sort((a, b) => b - a);
      // after sorting, splice only the first 3 for the top 3 scores
      topThree = scoresInLocalStorage.slice(0, 3);
      localStorage.setItem("highScores", JSON.stringify(topThree));
    } else {
      //this is the first game with no scores in the local storage
      topThree = [this.score];
      localStorage.setItem("highScores", JSON.stringify(topThree));
    }

    //after setting all the scores, add the scores to the DOM
    topThree.forEach((oneScore) => {
      const liElement = document.createElement("li");
      liElement.innerText = oneScore;
      this.highScoresElement.appendChild(liElement);
    });
  }
  updateLifeHearts() {
    this.livesElement.innerHTML = "";
    for (let i = 0; i < this.lives; i++) {
      const imgElement = document.createElement("img");
      imgElement.src = "images/life.png";
      this.livesElement.appendChild(imgElement);
    }
  }
}
