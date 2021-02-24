var canvas = document.createElement('canvas')
canvas.width = window.innerHeight
canvas.height = window.innerHeight
var main = document.getElementById('main');
main.appendChild(canvas);
canvas.id = 'canvas'


var gl = canvas.getContext('webgl');
var vertices;

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

var vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, [
    'attribute vec2 position;',
    'void main(){',
      'gl_Position = vec4(position, 0.0, 1.0);', 
    '}'
  ].join('\n'))
  gl.compileShader(vertexShader)
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, [
    'precision highp float;',
    'uniform vec4 color;',
    'void main(){',
      'gl_FragColor = color;',
    '}'
  ].join('\n'))
  gl.compileShader(fragmentShader)


  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  var buffer = gl.createBuffer()

function setup(){
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT)


  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.useProgram(program)
  program.color = gl.getUniformLocation(program, 'color')

  gl.uniform4fv(program.color, [0.5, 0.2, 0.1, 1.0])

  program.position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(program.position)
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)
}
setup()


let p = new Persegi(new Float32Array([
  -0.2,-0.2,
  0.2,-0.2,
  0.2,0.2,
  -0.2,0.2
], {
  red: 10,
  green: 100,
  blue: 150
})
);

let l = new Persegi(new Float32Array([
  0.4,0.4,
  0.8,0.4,
  0.8,0.8,
  0.4,0.8
], {
  red: 10,
  green: 100,
  blue: 150
})
);

function persegi(){
  var color = document.getElementById('color');
  var val = hexToRgb(color.value);
  p.color = val;
  l.color = val;

  p.draw();
  objects.push(p)
  l.draw();
  objects.push(l)
}

var objects = [];


function isInside(x, y, titikSudut){
  return titikSudut.x1 <= x && titikSudut.x3 >= x && titikSudut.y3 >= y && titikSudut.y1 <= y; 
}

const getCoorX = (x) => {
  var coorX = 0
  if(x >= 0){
    coorX = (x - 350) / 350;
  }
  return coorX;
}

const getCoorY = (y) => {
  var coorY = 0
  if(y >= 0){
    coorY = -1 * (y - 350) / 350;
  }
  return coorY;
}

let isObject = false;
let selected;
let idx;

canvas.onmousedown = function(event){
  selected = undefined;
  const x = getCoorX(event.clientX)
  const y = getCoorY(event.clientY)
  checkSelectedTitikSudut(x, y)
}

function checkSelectedTitikSudut(x, y){
  for(let obj of objects){
    if(isInside(x, y, obj.ts1)){
      selected = obj.ts1;
      idx = 1;
    }
    else if(isInside(x, y, obj.ts2)){
      selected = obj.ts2;
      idx = 2;
    }
    else if(isInside(x, y, obj.ts3)){
      selected = obj.ts3;
      idx = 3;
    }
    else if(isInside(x, y, obj.ts4)){
      selected = obj.ts4;
      idx = 4;
    }
  }
}

function drawAll(){
  objects.forEach(obj => {
    obj.draw();
  })
}

function mouseMoveOnDrag(target, whileMove) {
  var endMove = function () {
      window.removeEventListener('mousemove', whileMove);
      window.removeEventListener('mouseup', endMove);
  };

  target.addEventListener('mousedown', function (event) {
      event.stopPropagation();
      window.addEventListener('mousemove', whileMove);
      window.addEventListener('mouseup', endMove);   
  });
}

mouseMoveOnDrag(
  document.getElementById('canvas'),
  function (event){
    if(!selected){
      return
    }
    const x = getCoorX(event.clientX)
    const y = getCoorY(event.clientY)
    selected.move(x,y,idx);
  }
)