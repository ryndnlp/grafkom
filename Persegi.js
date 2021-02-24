var self;
class Persegi{
  constructor(vertices, color){
    this.vertices = vertices;
    this.color = color;
    if(!this.color){
      this.color = [100, 100, 100]
    }
    this.ts1 = new TitikSudut(this.vertices[0], this.vertices[1], this.changeSudut);
    this.ts2 = new TitikSudut(this.vertices[2], this.vertices[3], this.changeSudut);
    this.ts3 = new TitikSudut(this.vertices[4], this.vertices[5], this.changeSudut);
    this.ts4 = new TitikSudut(this.vertices[6], this.vertices[7], this.changeSudut);
  }
  
  draw(){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
    console.log(this.vertices)
    //console.log(this.ts1.join(this.ts2))
    gl.uniform4fv(program.color, [this.color[0]/255, this.color[1]/255, this.color[2]/255, 1.0])

    gl.enableVertexAttribArray(program.position)
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

    gl.drawArrays(gl.TRIANGLE_FAN, 0, this.vertices.length / 2);
    this.drawSudut();
  }
  drawSudut(){
    this.ts1.draw();
    this.ts2.draw();
    this.ts3.draw();
    this.ts4.draw();
  }
  changeSudut = (x, y, selected) =>{
    console.log('a')
    console.log(this)
    // this.vertices[0] = x
    // this.vertices[1] = y;
    //this.ts1.changeXY(x, y)
    console.log((selected-1)*2, selected*2-1)
    this.vertices[(selected-1)*2] = x
    this.vertices[selected*2-1] = y
    drawAll()
  }
}