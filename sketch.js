let yoff = 0.0; 

function setup() {
  createCanvas(337, 130);
}

function draw() {
  background(12);

  fill(249);

  beginShape();

  let xoff = 0; 
 
  for (let x = 0; x <= width; x += 2) {
   
    let y = map(noise(xoff, yoff), 0, 1, 50, 100);

    vertex(x, y);
    xoff += 0.05;
  }
 
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
