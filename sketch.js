let bgImage; // Variable to hold the background image of forest
let movingImage; // Variable to hold the moving image

let posX = 0;
let posY = 350; // Make the chameleon move on the ground
let imageSize = 300; // This is the size of the chameleon
let direction = 1; // Direction of the chameleon
let Colorofchameleon = [100, 200, 100];
let startTime; // var to hold animation start time
let animationDuration = 30000; // 30 secs

function preload() {
  bgImage = loadImage("forest.png"); // Pic of a forest/jungle
  movingImage = loadImage("chameleon.png"); // Animates chameleon's pic
}

function setup() {
  createCanvas(800, 600); // Size of the page screen
  startTime = millis(); // Record the start time
}

function draw() {
  // Calculate the elapsed time
  let elapsedTime = millis() - startTime;

  // Calculate remaining time
  let remainingTime = Math.max(0, animationDuration - elapsedTime);

  // Check if the animation duration has been reached (30 seconds)
  if (elapsedTime >= animationDuration) {
    noLoop(); // Stop the animation when the duration is reached
  }

  // It draws the forest pic as the background
  image(bgImage, 0, 0, width, height);

  // Function to let the color of the background be the color of the chameleon
  let sampleX = int(constrain(posX, 0, width - 1));
  let sampleY = int(constrain(posY, 0, height - 1));
  let bgColor = bgImage.get(sampleX, sampleY);

  // Matches the background color to the chameleon's body
  tint(bgColor);
  image(movingImage, posX, posY, imageSize, imageSize + 20);
  noTint();

  // Chameleon body color match to the environment
  Colorofchameleon = adaptColor(bgColor, Colorofchameleon);

  // Procedural code to move the chameleon from left to right
  posX += 0.9 * direction;

  // Confirms whether the chameleon has reached far left or right
  if (posX > width - imageSize || posX < 0) {
    // It makes the chameleon start over when it reaches the end of the canvas
    direction *= -1;
  }

  // this is the red visible timer and its stylin
  textAlign(RIGHT);
  textSize(24);
  fill(255, 0, 0); // Set the fill color to red
  text(`Time Remaining: ${Math.ceil(remainingTime / 1000)} seconds`, width - 10, 30);
}

// A function to synchronize the chameleon's body color to the background
function adaptColor(backgroundCol, currentCol) {
  const blendFactor = 1;
  const adaptedCol = [];// array empty 
  for (let i = 0; i < 3; i++) {
    adaptedCol[i] = (1 - blendFactor) * currentCol[i] + blendFactor * backgroundCol[i];// fomular for blended color
  }

  return adaptedCol;
}
// end of program