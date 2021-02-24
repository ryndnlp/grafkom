class Poligon{
  constructor(sides, color, x, y){
    this.sides = sides;
    this.color = color;
    if(!this.color){
      this.color = [100, 100, 100]
    }
    this.vertices = [];
    this.x = x;
    this.y = y;
    for (let i = 0; i < this.sides; i++) {
      this.vertices.push(Math.cos(2 * Math.PI * i / sides) + this.x, Math.sin(2 * Math.PI * i / sides) + this.y);
    }
  }
  draw(){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
    gl.uniform4fv(program.color, [this.color[0]/255, this.color[1]/255, this.color[2]/255, 1.0])

    gl.enableVertexAttribArray(program.position)
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)
    console.log(this.vertices)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length / 2);
  }
  changeColor(color){
    this.color = color;
    drawAll();
  }
}