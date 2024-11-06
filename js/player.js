class Player {
  constructor(top, left, imgSrc) {
    this.gameScreen = document.getElementById("game-container");
    this.left = left;
    this.top = top;
    this.width = 240;
    this.height = 300;
    this.directionX = 0;
    this.directionY = 0;
    this.isOnGround = true;
    this.isJumping = false;
    this.isShooting = false;
    //adding audios
    this.jump = new Audio("sounds/jump-sound.mp3");
    this.throw = new Audio("sounds/shuriken-throw.mp3");
    this.jump.volume = 0.1;
    this.throw.volume = 0.1;
    //this is creating the player and adding them to the screen
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    // Dans la classe Obstacle, par exemple dans le constructeur
    // this.element.style.border = "2px solid red"; // Ajouter une bordure rouge pour visualiser la hitbox

    //add the image to the screen
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += this.directionY;
    this.top += this.directionX;
    if (this.top + this.height > 700) {
      this.top = 700 - this.height;
    }
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }

  applyGravity() {
    if (!this.isOnGround) {
      this.directionY += 0.5;
    }
  }
}
