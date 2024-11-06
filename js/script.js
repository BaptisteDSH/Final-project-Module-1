window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let myGame;
  startButton.addEventListener("click", () => {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    // this reload the page
    window.location.reload();
  });

  document.addEventListener("keydown", (event) => {
    // Vérifiez si la touche pressée est la barre d'espace
    if (
      event.code === "Space" &&
      !myGame.player.isJumping &&
      myGame.player.isOnGround
    ) {
      myGame.player.jump.play();
      myGame.player.directionY = -14.5; // Force du saut
      myGame.player.isOnGround = false; // Le joueur n'est pas au sol
      myGame.player.isJumping = true; // Marquer que le joueur est en train de sauter

      // Logique pour l'atterrissage après un délai
      setTimeout(() => {
        // Simulez l'atterrissage
        myGame.player.isOnGround = true; // Marquer le joueur comme étant au sol
        myGame.player.isJumping = false; // Le saut est terminé
        myGame.player.directionY = 0; // Réinitialisez la direction Y
        console.log("Atterrissage !");
      }, 1000); // Durée du saut
    }
    if (event.code === "KeyS" && !myGame.player.isShooting) {
      myGame.player.throw.play();
      const shurikenLeft = myGame.player.left + 200;
      const shurikenTop = myGame.player.top + 150;
      myGame.shuriken.push(new Shuriken(shurikenLeft, shurikenTop));
      myGame.player.isShooting = true;
      setTimeout(() => {
        myGame.player.isShooting = false;
      }, 1000);
    }
  });

  function startGame() {
    console.log("start game");
    myGame = new Game();
    myGame.start();
  }
};
