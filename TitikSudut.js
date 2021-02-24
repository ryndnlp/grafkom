class TitikSudut{
  
  constructor(x, y, changeSudut){
    this.rad = 0.025;
    this.x1 = x-this.rad;
    this.y1 = y-this.rad;
    this.x2 = x+this.rad;
    this.y2 = y-this.rad;
    this.x3 = x+this.rad;
    this.y3 = y+this.rad;
    this.x4 = x-this.rad;
    this.y4 = y+this.rad;
    this.changeSudut = changeSudut;
  }
  changeXY(x,y){
    this.x1 = x-this.rad;
    this.y1 = y-this.rad;
    this.x2 = x+this.rad;
    this.y2 = y-this.rad;
    this.x3 = x+this.rad;
    this.y3 = y+this.rad;
    this.x4 = x-this.rad;
    this.y4 = y+this.rad;
  }
  draw(){
    const arr = new Float32Array([
      this.x1,this.y1,
      this.x2,this.y2,
      this.x3,this.y3,
      this.x4,this.y4
    ])
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW)
    
    gl.uniform4fv(program.color, [0, 0, 0, 1.0])

    gl.enableVertexAttribArray(program.position)
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, arr.length / 2)
  }

  move(destX, destY, fromX, fromY){
    this.changeXY(destX, destY)
    this.changeSudut(destX, destY, fromX, fromY)
  }
}