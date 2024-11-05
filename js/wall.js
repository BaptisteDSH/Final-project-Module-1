class Wall {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 1900;
    this.top = 0;
    this.width = 450;
    this.height = 735;
    //this is creating the player and adding them to the screen
    this.element = document.createElement("img");
    this.element.src = "../images/wall.png";
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
    this.left -= 10;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
