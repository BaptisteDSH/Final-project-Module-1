# Shadow Sprint

![](https://img.freepik.com/vecteurs-libre/batiment-chinois-fond-vectoriel-dessin-anime-rue-ville-maison-ville-chine-lanterne-rouge-pour-illustration-paysage-urbain-festival-nouvel-an-panorama-conception-decoration-architecture-asiatique-traditionnelle_107791-22807.jpg?t=st=1730908088~exp=1730911688~hmac=a9ad76cb4a2c11ab0fd99d861926448f393ca65abced1a9f407aee6391e14879&w=1480)

**Play the Game!** _(Link to be added)_

## Description

Shadow Sprint is a 2D side-scroller game where you control a samurai sprinting automatically through obstacles and defeating enemies to rack up points. The game challenges players to skillfully jump over obstacles and throw shurikens to overcome enemies.

## Main Features

- **Jumping**: Press `space` to make the samurai jump and dodge obstacles.
- **Shuriken Attack**: Press `s` to throw shurikens at approaching monsters and clear the path.
- **Score System**: Earn points by avoiding obstacles and defeating enemies, and strive to beat the high score.
- **Game Over**: Collisions with obstacles or enemies end the game, challenging players to try again for a better score.

## Backlog Functionalities

- **Adding different types of obstacles**
- **Adding different types of creatures**
- **Making the game**

## Key Game Files and Classes

### `index.html`

The starting point of the game, linking all assets, scripts, and styles necessary for gameplay.

### `js/`

Contains the main JavaScript files responsible for the game's interactive features:

- **`game.js`**: Manages the game loop, initializes player and obstacles, and tracks the player's score.
- **`player.js`**: Defines the samurai's properties and controls, including movement, jumping, and collisons.
- **`obstacle.js`**: Handles obstacle creation and movement.
- **`bees.js`**: Manages behavior and movement of bee enemies encountered in the game.
- **`box.js`**: andles obstacle creation and movement.
- **`shuriken.js`**: Manages the creation, movement, and collisions of shurikens.
- **`wall.js`**: Manages behavior and movement of troll enemies encountered in the game.
- **`script.js`**: Initializes game controls and handles player input. The `window.onload` function waits until the page is fully loaded, then sets up event listeners for:
  - **Start Button**: Begins the game when clicked.
  - **Restart Button**: Reloads the page to restart the game.
  - **Keydown Events**:
    - `Space`: Makes the samurai jump if on the ground, triggering a timed landing event to simulate jumping physics.
    - `KeyS`: Throws a shuriken if the player is not already shooting, creating a new shuriken object that moves forward to attack enemies.

### `styles/`

The main CSS folder containing stylesheets for the game's look and feel:

- **`style.css`**: Contains the styling rules for game visuals, ensuring consistent appearance across devices.

### `images/` and `sounds/`

These folders contain all image and audio assets used in the game, including:

- **`images/`**: Game background images, character sprites, and obstacle visuals.
- **`sounds/`**: Sound effects for actions like throwing shurikens and colliding with obstacles.

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript**

## States

- **Start Screen**
- **Game Screen**
- **Game Over Screen**

## Game Instructions

1. **Move**: The samurai moves forward automatically.
2. **Jump**: Press `space` to jump over obstacles.
3. **Throw**: Press `s` to throw shurikens at enemies in the way.
4. **Avoid Obstacles**: Obstacles appear at various points, requiring quick reactions to dodge or defeat them.
5. **Score**: Earn points by surviving longer and taking down enemies.
