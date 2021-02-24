class Persegi{
  constructor(vertices, color){
    this.vertices = vertices;
    this.color = color;
    this.centerX = (this.vertices[0] + this.vertices[2]) / 2;
    this.centerY = (this.vertices[3] + this.vertices[5]) / 2;
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
  changeSudut = (destX, destY) =>{
    let diffX = destX - this.centerX;
    let diffY = destY - this.centerY;
    let len;
    if(Math.abs(diffX) > Math.abs(diffY)){
      len = Math.abs(diffX);
    }else{
      len = Math.abs(diffY);
    }
    
    this.vertices[0] = this.centerX - len;
    this.vertices[1] = this.centerY - len;
    this.vertices[2] = this.centerX + len;
    this.vertices[3] = this.centerY - len;
    this.vertices[4] = this.centerX + len;
    this.vertices[5] = this.centerY + len;
    this.vertices[6] = this.centerX - len;
    this.vertices[7] = this.centerY + len;
    
    this.ts1.changeXY(this.vertices[0], this.vertices[1]);
    this.ts2.changeXY(this.vertices[2], this.vertices[3]);
    this.ts3.changeXY(this.vertices[4], this.vertices[5]);
    this.ts4.changeXY(this.vertices[6], this.vertices[7]);
    drawAll()
  }
  changeColor(color){
    this.color = color;
    drawAll();
  }
  isInsideBentuk(x, y){
    
    return this.vertices[0] <= x && this.vertices[2] >= x && this.vertices[1] <= y && this.vertices[5] >= y
  }
}

//drag trus check di dalem/luar. titik terakhir - pusat cari max. 