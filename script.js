let shoeOffset = 0;
let shoeFalling = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(30, 50, 30); // Deep forest green

  drawForest();
  drawGrassAndFlowers();

  let pivotX = width / 2;
  let pivotY = 80;
  let swingAngle = 15 * sin(frameCount * 0.7);

  push();
  translate(pivotX, pivotY);
  rotate(swingAngle);
  drawVineSwing();
  drawCharacter();
  drawLegsAndShoe();
  pop();
}

function drawForest() {
  noStroke();
  for (let x = 70; x < width; x += 130) {
    fill(80, 50, 30);
    rect(x, 0, 40, height);
    stroke(100, 65, 35);
    strokeWeight(3);
    for (let y = 0; y < height; y += 12) {
      line(x + 5, y, x + 10, y + 6);
      line(x + 20, y + 5, x + 25, y + 10);
    }
    noStroke();

    fill(35, 85, 45);
    ellipse(x + 20, 90, 130, 110);
    ellipse(x + 10, 60, 90, 80);
    ellipse(x + 35, 45, 110, 90);
  }
}

function drawGrassAndFlowers() {
  // Grass blades growing from the bottom
  stroke(40, 120, 30);
  strokeWeight(2);
  for (let x = 0; x < width; x += 4) {
    let grassHeight = random(18, 28);
    line(x, height, x, height - grassHeight);
  }
  noStroke();

  // Flower bushes just above the grass
  fill(70, 130, 180);
  for (let x = 0; x < width; x += 80) {
    ellipse(x + 20, height - 32, 20, 14); // Left bloom
    ellipse(x + 32, height - 28, 16, 12); // Right bloom
    ellipse(x + 12, height - 38, 24, 18); // Center bloom
  }
}



function drawVineSwing() {
  stroke(35, 65, 35);
  strokeWeight(7);
  for (let y = 0; y <= 100; y += 5) {
    let x = 10 * sin(y * 6 + frameCount * 5);
    point(x - 45, y);
    point(x + 45, y);
  }

  noStroke();
  push();
  translate(0, 110);
  stroke(35, 65, 35);
  strokeWeight(8);
  noFill();
  beginShape();
  for (let x = -60; x <= 60; x += 5) {
    let y = 6 * sin((x + frameCount * 5) * 0.3);
    vertex(x, y);
  }
  endShape();

  fill(25, 60, 35);
  noStroke();
  for (let x = -55; x <= 55; x += 20) {
    ellipse(x, 6 * sin((x + frameCount * 5) * 0.3) - 8, 18, 10);
    triangle(x - 6, 6 * sin((x + frameCount * 5) * 0.3),
             x + 6, 6 * sin((x + frameCount * 5) * 0.3),
             x, 6 * sin((x + frameCount * 5) * 0.3) - 15);
  }
  pop();
}

function drawCharacter() {
  noStroke();

  // Dress
  fill(255, 182, 193);
  beginShape();
  vertex(-25, 90);
  vertex(0, 30);
  vertex(25, 90);
  vertex(25, 140);
  vertex(-25, 140);
  endShape(CLOSE);

  // Neck
  fill(255, 224, 189);
  ellipse(0, 55, 18, 24);

  // Head
  ellipse(0, 25, 28, 28);

  // Eyes
  fill(80, 30, 60);
  ellipse(-6, 23, 3, 4);
  ellipse(6, 23, 3, 4);

  // Nose
  fill(255, 204, 170);
  triangle(0, 26, 2, 30, -2, 30);

  // Mouth
  noFill();
  stroke(150, 80, 100);
  strokeWeight(1);
  arc(0, 34, 12, 8, 20, 160);
  noStroke();

  // Hat
  fill(255, 150, 180);
  ellipse(0, 10, 70, 25);
  ellipse(0, 0, 40, 40);
}

function drawLegsAndShoe() {
  push();
  noStroke();
  fill(255, 224, 189);
  rect(-12, 140, 15, 55, 10);
  rect(5, 140, 15, 55, 10);

  // Left foot shoe
  fill(255, 105, 180);
  ellipse(-5, 195, 25, 14);

  // Falling right shoe
  fill(255, 105, 180);
  ellipse(20, 190 + shoeOffset, 18, 10);

  // Sole detail
  stroke(180, 20, 60);
  strokeWeight(2);
  line(14, 192 + shoeOffset, 26, 192 + shoeOffset);
  noStroke();

  // Animation logic
  if (shoeFalling) {
    shoeOffset += 1;
    if (shoeOffset > 55) shoeFalling = false;
  } else {
    shoeOffset -= 1;
    if (shoeOffset < 0) shoeFalling = true;
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}