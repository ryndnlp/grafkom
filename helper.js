const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))


function isInsideSudut(x, y, titikSudut){
  return titikSudut.x1 <= x && titikSudut.x3 >= x && titikSudut.y3 >= y && titikSudut.y1 <= y; 
}

const getCoorX = (x) => {
  var coorX = 0
  if(x >= 0){
    coorX = (x - 349) / 349;
  }
  return coorX;
}

const getCoorY = (y) => {
  var coorY = 0
  if(y >= 0){
    coorY = -1 * (y - 349) / 349;
  }
  return coorY;
}

function isInsideBentuk(x, y, bentuk){
  return bentuk.vertices[0] <= x && bentuk.vertices[4] >= x && bentuk.vertices[1] <= y && bentuk.vertices[5] 
}