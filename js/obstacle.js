class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.positions = [23, 76, 98, 21, 65];
    this.randomIndex = Math.floor(Math.round() * this.positions.length);
    this.left = 1450;
    this.top = 540;
    this.width = 150;
    this.height = 150;
    //this is creating the player and adding them to the screen
    this.element = document.createElement("img");
    this.element.src = "../images/Wooden_Barrel.png";
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
    this.left -= 12;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }
}
