class Garis{
    constructor(vertices, color){
      this.vertices = vertices;
      this.color = color;
      if(!this.color){
        this.color = [100, 100, 100]
      }
      this.t1 = new Titik(this.vertices[0], this.vertices[1], this.changeSudut);
      this.t2 = new Titik(this.vertices[2], this.vertices[3], this.changeSudut);
    }
    
    draw(){
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW)
      gl.uniform4fv(program.color, [this.color[0]/255, this.color[1]/255, this.color[2]/255, 1.0])
  
      gl.enableVertexAttribArray(program.position)
      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)
  
      gl.drawArrays(gl.LINES, 0, this.vertices.length / 2);
      this.drawTitik();
    }
    drawTitik(){
      this.t1.draw();
      this.t2.draw();
    }
    changeSudut = (destX, destY) =>{
      this.ts1.changeXY(this.vertices[0], this.vertices[1]);
      this.ts2.changeXY(this.vertices[2], this.vertices[3]);
      drawAll()
    }
    changeColor(color){
      this.color = color;
      drawAll();
    }
  }
  
  //drag trus check di dalem/luar. titik terakhir - pusat cari max. 