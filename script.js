const canvas = document.getElementById("canvas1");
const control = document.getElementById("animations");
let playerState = "idle";
control.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spritewidth = 575;
const spriteheight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAmimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "got hit",
    frames: 4,
  },
];

animationStates.forEach((elem, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < elem.frames; j++) {
    let positionX = j * spritewidth;
    let positionY = index * spriteheight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAmimations[elem.name] = frames;
});
console.log(spriteAmimations);

function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAmimations[playerState].loc.length;
  let frameX = spritewidth * position;
  let frameY = spriteAmimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spritewidth,
    spriteheight,
    0,
    0,
    spritewidth,
    spriteheight
  );

  gameFrame++;
  requestAnimationFrame(animation);
}

animation();
