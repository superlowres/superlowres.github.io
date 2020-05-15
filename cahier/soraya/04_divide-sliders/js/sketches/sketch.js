const GUI = new dat.GUI();

let COLUMNS = {
  0: 10,
  1: 22,
  2: 11,
  3: 22,
  4: 11,
  5:22,
  6:122,
  7:22,
  8:11,
  9:22,
  10:10,
}

let LOGO_PARAMS = {
 width : 277,
 height : 331,
 weight: 4,
}
let logoHeight = 0;
let logoWidth = 0;

let COL_LINES = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
}

let ROW_LINES = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
}

let ROWS = {
  0: 10,
  1: 22,
  2: 11,
  3: 22,
  4: 11,
  5: 22,
  6: 11,
  7: 22,
  8: 11,
  9: 22,
  10: 11,
  11: 22,
  12: 11,
  13: 22,
  14: 11,
  15: 22,
  16: 33,
  17: 11,
  18: 22,
  19: 10,
}

function setup() {

  GUI.add(LOGO_PARAMS, 'weight', LOGO_PARAMS.weight).min(1);
  GUI.add(LOGO_PARAMS, 'width', LOGO_PARAMS.width).min(1);
  GUI.add(LOGO_PARAMS, 'height', LOGO_PARAMS.height).min(1);


  GUI.add(COLUMNS, '0', COLUMNS[0]).min(0.01);
  GUI.add(COLUMNS, '1', COLUMNS[1]).min(0.01);
  GUI.add(COLUMNS, '2', COLUMNS[2]).min(0.01);
  GUI.add(COLUMNS, '3', COLUMNS[3]).min(0.01);
  GUI.add(COLUMNS, '4', COLUMNS[4]).min(0.01);
  GUI.add(COLUMNS, '5', COLUMNS[5]).min(0.01);
  GUI.add(COLUMNS, '6', COLUMNS[6]).min(0.01);
  GUI.add(COLUMNS, '7', COLUMNS[7]).min(0.01);
  GUI.add(COLUMNS, '8', COLUMNS[8]).min(0.01);
  GUI.add(COLUMNS, '9', COLUMNS[9]).min(0.01);
  GUI.add(COLUMNS, '10', COLUMNS[10]).min(0.01);

  GUI.add(ROWS, '0', ROWS[0]).min(0.01);
  GUI.add(ROWS, '1', ROWS[1]).min(0.01);
  GUI.add(ROWS, '2', ROWS[2]).min(0.01);
  GUI.add(ROWS, '3', ROWS[3]).min(0.01);
  GUI.add(ROWS, '4', ROWS[4]).min(0.01);
  GUI.add(ROWS, '5', ROWS[5]).min(0.01);
  GUI.add(ROWS, '6', ROWS[6]).min(0.01);
  GUI.add(ROWS, '7', ROWS[7]).min(0.01);
  GUI.add(ROWS, '8', ROWS[8]).min(0.01);
  GUI.add(ROWS, '9', ROWS[9]).min(0.01);
  GUI.add(ROWS, '10', ROWS[10]).min(0.01);
  GUI.add(ROWS, '11', ROWS[11]).min(0.01);
  GUI.add(ROWS, '12', ROWS[12]).min(0.01);
  GUI.add(ROWS, '13', ROWS[13]).min(0.01);
  GUI.add(ROWS, '14', ROWS[14]).min(0.01);
  GUI.add(ROWS, '15', ROWS[15]).min(0.01);
  GUI.add(ROWS, '16', ROWS[16]).min(0.01);
  GUI.add(ROWS, '17', ROWS[17]).min(0.01);
  GUI.add(ROWS, '18', ROWS[18]).min(0.01);
  GUI.add(ROWS, '19', ROWS[19]).min(0.01);


  createCanvas(windowWidth, windowHeight);




  strokeCap(PROJECT);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // weight = map(mouseX, 0, width, 10, 30);

  // let hw = weight/2; //half weight
  logoHeight = LOGO_PARAMS.height;
  logoWidth = LOGO_PARAMS.width;

  push();

  translate(width/2, height/2);
  translate(-logoWidth/2, -logoHeight/2);

  stroke(255, 0, 255, 100);
  noFill();
  strokeWeight(2);
  drawColumns();
  drawRows();

  noFill();
  strokeWeight(LOGO_PARAMS.weight);
  stroke(255,255,255);

  //draw letters
  draw_c();
  draw_a();
  draw_s();
  draw_p();
  //boundaries


  fill(255, 75);
  noStroke();
  rect(0,0,logoWidth, logoHeight);

  pop();
}

function draw_c() {
  push();

  beginShape();

  vertex(COL_LINES[9], ROW_LINES[18]);
  vertex(COL_LINES[0], ROW_LINES[18]);
  vertex(COL_LINES[0], ROW_LINES[0]);
  vertex(COL_LINES[9], ROW_LINES[0]);

  vertex(COL_LINES[9], ROW_LINES[1]);
  vertex(COL_LINES[1], ROW_LINES[1]);
  vertex(COL_LINES[1], ROW_LINES[17]);
  vertex(COL_LINES[9], ROW_LINES[17]);
  vertex(COL_LINES[9], ROW_LINES[18]);

  endShape();


  pop();

}


function draw_a() {
  push();

  beginShape();

  vertex(COL_LINES[2], ROW_LINES[16]);
  vertex(COL_LINES[2], ROW_LINES[2]);
  vertex(COL_LINES[9], ROW_LINES[2]);
  vertex(COL_LINES[9], ROW_LINES[16]);
  vertex(COL_LINES[8], ROW_LINES[16]);
  vertex(COL_LINES[8], ROW_LINES[5]);
  vertex(COL_LINES[3], ROW_LINES[5]);
  vertex(COL_LINES[3], ROW_LINES[16]);
  vertex(COL_LINES[2], ROW_LINES[16]);
  endShape();

  beginShape(); //trou A

  vertex(COL_LINES[3], ROW_LINES[4]);
  vertex(COL_LINES[3], ROW_LINES[3]);
  vertex(COL_LINES[8], ROW_LINES[3]);
  vertex(COL_LINES[8], ROW_LINES[4]);
  vertex(COL_LINES[3], ROW_LINES[4]);
  endShape();

  pop();

}

function draw_s() {
  push();

  beginShape();


  vertex(COL_LINES[4], ROW_LINES[11]);
  vertex(COL_LINES[4], ROW_LINES[10]);
  vertex(COL_LINES[6], ROW_LINES[10]);
  vertex(COL_LINES[6], ROW_LINES[9]);
  vertex(COL_LINES[4], ROW_LINES[9]);
  vertex(COL_LINES[4], ROW_LINES[9]);
  vertex(COL_LINES[4], ROW_LINES[6]);
  vertex(COL_LINES[7], ROW_LINES[6]);
  vertex(COL_LINES[7], ROW_LINES[7]);
  vertex(COL_LINES[5], ROW_LINES[7]);
  vertex(COL_LINES[5], ROW_LINES[8]);
  vertex(COL_LINES[7], ROW_LINES[8]);
  vertex(COL_LINES[7], ROW_LINES[11]);
  vertex(COL_LINES[4], ROW_LINES[11]);

  endShape();

  pop();

}
//
function draw_p() {
  push();

  beginShape();

  vertex(COL_LINES[4], ROW_LINES[16]);
  vertex(COL_LINES[4], ROW_LINES[12]);
  vertex(COL_LINES[7], ROW_LINES[12]);
  vertex(COL_LINES[7], ROW_LINES[15]);
  vertex(COL_LINES[5], ROW_LINES[15]);
  vertex(COL_LINES[5], ROW_LINES[16]);
  vertex(COL_LINES[4], ROW_LINES[16]);

  endShape();
  

  beginShape(); //trou p

  vertex(COL_LINES[5], ROW_LINES[14]);
  vertex(COL_LINES[5], ROW_LINES[13]);
  vertex(COL_LINES[6], ROW_LINES[13]);
  vertex(COL_LINES[6], ROW_LINES[14]);
  vertex(COL_LINES[5], ROW_LINES[14]);

  endShape();

  pop();

}


function drawRows() {
  let totalColHeight = ROWS[0]+ROWS[1]+ROWS[2]+ROWS[3]+ROWS[4]+ROWS[5]+ROWS[6]+ROWS[7]+ROWS[8]+ROWS[9]+ROWS[10]+ROWS[11]+ROWS[12]+ROWS[13]+ROWS[14]+ROWS[15]+ROWS[16]+ROWS[17]+ROWS[18]+ROWS[19];
  let row0 = map(ROWS[0], 0, totalColHeight, 0, logoHeight);
  let row1 = map(ROWS[1], 0, totalColHeight, 0, logoHeight);
  let row2 = map(ROWS[2], 0, totalColHeight, 0, logoHeight);
  let row3 = map(ROWS[3], 0, totalColHeight, 0, logoHeight);
  let row4 = map(ROWS[4], 0, totalColHeight, 0, logoHeight);
  let row5 = map(ROWS[5], 0, totalColHeight, 0, logoHeight);
  let row6 = map(ROWS[6], 0, totalColHeight, 0, logoHeight);
  let row7 = map(ROWS[7], 0, totalColHeight, 0, logoHeight);
  let row8 = map(ROWS[8], 0, totalColHeight, 0, logoHeight);
  let row9 = map(ROWS[9], 0, totalColHeight, 0, logoHeight);
  let row10 = map(ROWS[10], 0, totalColHeight, 0, logoHeight);
  let row11 = map(ROWS[11], 0, totalColHeight, 0, logoHeight);
  let row12 = map(ROWS[12], 0, totalColHeight, 0, logoHeight);
  let row13 = map(ROWS[13], 0, totalColHeight, 0, logoHeight);
  let row14 = map(ROWS[14], 0, totalColHeight, 0, logoHeight);
  let row15 = map(ROWS[15], 0, totalColHeight, 0, logoHeight);
  let row16 = map(ROWS[16], 0, totalColHeight, 0, logoHeight);
  let row17 = map(ROWS[17], 0, totalColHeight, 0, logoHeight);
  let row18 = map(ROWS[18], 0, totalColHeight, 0, logoHeight);
  let row19 = map(ROWS[19], 0, totalColHeight, 0, logoHeight);

  ROW_LINES[0] = row0;
  ROW_LINES[1] = row0+row1;
  ROW_LINES[2] = ROW_LINES[1]+row2;
  ROW_LINES[3] = ROW_LINES[2]+row3;
  ROW_LINES[4] = ROW_LINES[3]+row4;
  ROW_LINES[5] = ROW_LINES[4]+row5;
  ROW_LINES[6] = ROW_LINES[5]+row6;
  ROW_LINES[7] = ROW_LINES[6]+row7;
  ROW_LINES[8] = ROW_LINES[7]+row8;
  ROW_LINES[9] = ROW_LINES[8]+row9;
  ROW_LINES[10] = ROW_LINES[9]+row10;
  ROW_LINES[11] = ROW_LINES[10]+row11;
  ROW_LINES[12] = ROW_LINES[11]+row12;
  ROW_LINES[13] = ROW_LINES[12]+row13;
  ROW_LINES[14] = ROW_LINES[13]+row14;
  ROW_LINES[15] = ROW_LINES[14]+row15;
  ROW_LINES[16] = ROW_LINES[15]+row16;
  ROW_LINES[17] = ROW_LINES[16]+row17;
  ROW_LINES[18] = ROW_LINES[17]+row18;
  ROW_LINES[19] = ROW_LINES[18]+row19;
  push();

  rect(0,0,logoWidth, row0);
  translate(0,row0);

  rect(0,0,logoWidth, row1);
  translate(0,row1);

  rect(0,0,logoWidth, row2);
  translate(0,row2);

  rect(0,0,logoWidth, row3);
  translate(0,row3);

  rect(0,0,logoWidth, row4);
  translate(0,row4);

  rect(0,0,logoWidth, row5);
  translate(0,row5);

  rect(0,0,logoWidth, row6);
  translate(0,row6);

  rect(0,0,logoWidth, row7);
  translate(0,row7);

  rect(0,0,logoWidth, row8);
  translate(0,row8);

  rect(0,0,logoWidth, row9);
  translate(0,row9);

  rect(0,0,logoWidth, row10);
  translate(0,row10);

  rect(0,0,logoWidth, row11);
  translate(0,row11);

  rect(0,0,logoWidth, row12);
  translate(0,row12);

  rect(0,0,logoWidth, row13);
  translate(0,row13);

  rect(0,0,logoWidth, row14);
  translate(0,row14);

  rect(0,0,logoWidth, row15);
  translate(0,row15);

  rect(0,0,logoWidth, row16);
  translate(0,row16);

  rect(0,0,logoWidth, row17);
  translate(0,row17);

  rect(0,0,logoWidth, row18);
  translate(0,row18);

  rect(0,0,logoWidth, row19);
  pop();
}

function drawColumns() {
  let totalColWidth = COLUMNS[0]+COLUMNS[1]+COLUMNS[2]+COLUMNS[3]+COLUMNS[4]+COLUMNS[5]+COLUMNS[6]+COLUMNS[7]+COLUMNS[8]+COLUMNS[9]+COLUMNS[10];
  let column0 = map(COLUMNS[0], 0, totalColWidth, 0, logoWidth);
  let column1 = map(COLUMNS[1], 0, totalColWidth, 0, logoWidth);
  let column2 = map(COLUMNS[2], 0, totalColWidth, 0, logoWidth);
  let column3 = map(COLUMNS[3], 0, totalColWidth, 0, logoWidth);
  let column4 = map(COLUMNS[4], 0, totalColWidth, 0, logoWidth);
  let column5 = map(COLUMNS[5], 0, totalColWidth, 0, logoWidth);
  let column6 = map(COLUMNS[6], 0, totalColWidth, 0, logoWidth);
  let column7 = map(COLUMNS[7], 0, totalColWidth, 0, logoWidth);
  let column8 = map(COLUMNS[8], 0, totalColWidth, 0, logoWidth);
  let column9 = map(COLUMNS[9], 0, totalColWidth, 0, logoWidth);
  let column10 = map(COLUMNS[10], 0, totalColWidth, 0, logoWidth);

  COL_LINES[0] = column0;
  COL_LINES[1] = column0+column1;
  COL_LINES[2] = COL_LINES[1]+column2;
  COL_LINES[3] = COL_LINES[2]+column3;
  COL_LINES[4] = COL_LINES[3]+column4;
  COL_LINES[5] = COL_LINES[4]+column5;
  COL_LINES[6] = COL_LINES[5]+column6;
  COL_LINES[7] = COL_LINES[6]+column7;
  COL_LINES[8] = COL_LINES[7]+column8;
  COL_LINES[9] = COL_LINES[8]+column9;
  COL_LINES[10] = COL_LINES[9]+column10;

  push();

  rect(0,0,column0, logoHeight);
  translate(column0,0);

  rect(column0,0,column1, logoHeight);
  translate(column1,0);

  rect(0,0,column2, logoHeight);
  translate(column2,0);

  rect(0,0,column3, logoHeight);
  translate(column3,0);

  rect(0,0,column4, logoHeight);
  translate(column4,0);

  rect(0,0,column5, logoHeight);
  translate(column5,0);

  rect(0,0,column6, logoHeight);
  translate(column6,0);

  rect(0,0,column7, logoHeight);
  translate(column7,0);

  rect(0,0,column8, logoHeight);
  translate(column8,0);

  rect(0,0,column9, logoHeight);
  translate(column9,0);

  rect(0,0,column10, logoHeight);

  pop();
}
