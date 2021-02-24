var canvas = document.createElement('canvas')
canvas.width = window.innerHeight
canvas.height = window.innerHeight
var main = document.getElementById('main');
main.appendChild(canvas);
canvas.id = 'canvas'

// ---- Init ----- //

var gl = canvas.getContext('webgl');

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
// ----  ----- //
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


let p;

function makePersegi(){
  var persegiTs = document.getElementById('persegiTs');
  var persegiVal = persegiTs.value.split(',');
  persegiVal = persegiVal.map(v => parseFloat(v));
  
  persegiVal = new Float32Array([...persegiVal]);
  
  p = new Persegi(persegiVal, [0, 200, 0]);

  p.draw();
  objects.push(p);
  drawAll();
}

let pol;

function makePoligon(){
  pol = new Poligon(5, [0, 0, 200], 0.0, 0.0);
  pol.draw()
}

//Global vars
var objects = [];
var fromX;
var fromY;
var destX;
var destY;

let selectedTS;

canvas.onmouseup = function(event){
  if(!selectedTS){
    return
  }
  destX = getCoorX(event.clientX)
  destY = getCoorY(event.clientY)
  selectedTS.move(destX, destY);
  if(!selectedObj){
    return;
  }
  var color = document.getElementById('color');
  var val = hexToRgb(color.value);
  selectedObj.changeColor(val);
}

var selectedObj;

function checkSelectedObject(x, y){
  selectedObj = undefined;
  for(let obj of objects){
    if(isInsideBentuk(x, y, obj)){
      selectedObj = obj;
      break;
    }
  }
}

function checkSelectedTitikSudut(x, y){
  for(let obj of objects){
    if(isInsideSudut(x, y, obj.ts1)){
      selectedTS = obj.ts1;
    }
    else if(isInsideSudut(x, y, obj.ts2)){
      selectedTS = obj.ts2;
    }
    else if(isInsideSudut(x, y, obj.ts3)){
      selectedTS = obj.ts3;
    }
    else if(isInsideSudut(x, y, obj.ts4)){
      selectedTS = obj.ts4;
    }
  }
}

function drawAll(){
  objects.forEach(obj => {
    obj.draw();
  })
}

canvas.onmousedown = function(event){
  selectedTS = undefined;
  fromX = getCoorX(event.clientX)
  fromY = getCoorY(event.clientY)

  checkSelectedTitikSudut(fromX, fromY)

  selectedObj = undefined;
  checkSelectedObject(fromX, fromY)

  var color = document.getElementById('color');
  var val = hexToRgb(color.value);

  if(selectedObj){
    selectedObj.color = val;
    drawAll()
  }
}

function exportFile(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objects));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "file.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importFile(){
  objects = [];
  let file = document.getElementById("file");

  let { files } = file;
  let [ uploaded ] = files;

  if (files) {

    var reader = new FileReader();
    reader.readAsText(uploaded, "UTF-8");

    reader.onload = function (e) {
      const res = JSON.parse(e.target.result);
      res.forEach(item => {
        console.log(item)
        if(item.tipe == 'persegi'){
          let v = [];
          Object.values(item.vertices).forEach(val => {v.push(val)});
          v = new Float32Array([...v]);
          item.vertices = v;
          objects.push(new Persegi(v, item.color));
        }
      })
      console.log(objects)
      drawAll()
    }
    reader.onerror = function(e){
      console.log('Error');
    }
  }
}

function showHelp(){
  var help = document.getElementById('help');
  if(help.style.display == 'none'){
    help.style.display = 'block';
  }else{
    help.style.display = 'none';
  }
}