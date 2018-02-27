import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  })
}

const canvas = document.getElementById("screen");
const context = canvas.getContext('2d');

loadImage('/images/tiles.png')
.then(image => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define('ground', 0, 0);
  sprites.define('sky', 3, 23);
  sprites.define('coins', 24, 0);

  loadLevel('backgrounds')
  .then(level => {
    level.backgrounds.forEach(background => {
      drawBackground(background, context, sprites);
    })
  })
});
