class Shuriken {
  constructor(positionX, positionY) {
    this.gameScreen = document.getElementById("game-container");
    this.left = positionX;
    this.top = positionY;
    this.width = 60;
    this.height = 65;
    //this is creating the player and adding them to the screen
    this.element = document.createElement("img");
    this.element.src = "../images/shuriken.png";
    this.element.style.position = "absolute";
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.classList.add("shuriken-class");
    // Dans la classe Obstacle, par exemple dans le constructeur
    // this.element.style.border = "2px solid red"; // Ajouter une bordure rouge pour visualiser la hitbox

    //add the image to the screen
    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += 6;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
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
}
