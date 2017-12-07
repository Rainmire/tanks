class Map {
  // const imageX = 0;
  // const imageY = 0;
  constructor(imageObj){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.imageX = 0;
    this.imageY = -60;

    this.speed = 4;

    this.tankX = 500;
    this.tankY = 50;

    var imageWidth = imageObj.width;
    var imageHeight = imageObj.height;

    context.drawImage(imageObj, this.imageX, this.imageY);

    this.terrainMap = context.getImageData(0, 0, imageWidth, imageHeight);

    // this.terrainMap = imageData.data;
    document.onkeydown = this.keyDown.bind(this);
		document.onkeyup = this.keyUp.bind(this);

    this.left_key = false;
    this.right_key = false;
    this.space_key = false;
    this.jumping = false;

    this.initTank();
    this.frame();
  }
  initTank () {
    var tankCanvas = document.getElementById('tankCanvas');
    this.tankContext = tankCanvas.getContext('2d');

    this.tankMap = this.tankContext.createImageData(10,10);
    var tankData = this.tankMap.data;
    for(var i = 0, n = tankData.length; i < n; i += 4) {
      tankData[i] = 255;
      tankData[i + 1] = 0;
      tankData[i + 2] = 0;
      tankData[i + 3] = 255;
    }


    this.tankContext.putImageData(this.tankMap,this.tankX,this.tankY);
    // this.tankContext.drawImage(tankCanvas, 10, 10);

    // console.log(this.collisionTest(this.tankMap, this.terrainMap));
    // this.frame();

    //PIXEL SAMPLING
    let x = 100;
    let y = 110;
    let r = (y * this.terrainMap.width + x) * 4;
		let g = (y * this.terrainMap.width + x) * 4 + 1;
		let b = (y * this.terrainMap.width + x) * 4 + 2;
		let a = (y * this.terrainMap.width + x) * 4 + 3;
    console.log(this.terrainMap.data[r]);
    console.log(this.terrainMap.data[g]);
    console.log(this.terrainMap.data[b]);
    console.log(this.terrainMap.data[a]);
  }

  drawTank() {
    this.tankContext.clearRect(0, 0, this.terrainMap.width, this.terrainMap.height);
    this.tankContext.putImageData(this.tankMap,this.tankX,this.tankY);
  }

  frame() {
    this.moveTank();
    var that = this;
    setTimeout(function(){ that.frame(); }, 1000 / 60);
  }

  moveTank() {

    if (this.left_key) {
      for (let i=0; i < this.speed; i++) {
        if (this.tankX<0) {
          break;
        }
        //hill climbing
        let newX = this.tankX - 1;
  			if(this.collisionTest(newX, this.tankY, this.tankMap,this.terrainMap)){
          let newY = this.tankY;
  				for (let j=0; j < 1000; j++){
            newY-=1;
            if (!this.collisionTest(newX, newY, this.tankMap,this.terrainMap)){
              this.tankX = newX;
              this.tankY = newY;
              break;
            }
          }
  			}
        else {
          this.tankX = newX;
        }
      }
		}
    if (this.right_key) {
      // debugger;
      for (let i=0; i < this.speed; i++) {
        // debugger;
        if (this.tankX+this.tankMap.width>this.canvasWidth-1) {
          break;
        }
        //hill climbing
        let newX = this.tankX + 1;
  			if(this.collisionTest(newX, this.tankY, this.tankMap,this.terrainMap)){
          let newY = this.tankY;
  				for (let j=0; j < this.speed*2; j++){
            newY-=1;
            if (!this.collisionTest(newX, newY, this.tankMap,this.terrainMap)){
              this.tankX = newX;
              this.tankY = newY;
              break;
            }
          }
  			}
        else {
          this.tankX = newX;
        }
      }
    }

    //falling
    for (let i=0; i < this.speed*2; i++) {
      let newY = this.tankY + 1;
      if(!this.collisionTest(this.tankX, newY, this.tankMap, this.terrainMap)){
  			this.tankY = newY;
  		}
    }
    // this.tankContext.clearRect(this.tankX, this.tankY, this.tankMap.width, this.tankMap.height);
    // this.tankContext.clearRect(0, 0, 578, 400);
    //
    // this.tankContext.putImageData(this.tankMap,this.tankX,this.tankY);
    this.drawTank();
    // console.log(test);
  }

  collisionTest(x, y ,smallerObj, biggerObj) {
    for (let i = 0; i < smallerObj.width; i++) {
      for (let j = 0; j < smallerObj.height; j++) {
        if (this.getPixel(i+x, j+y,biggerObj)) {
          return true;
        }
      }
    }
    return false;

  }

  getPixel(x,y,map){
    if(x < 0 || y < 0 || x > map.width || y > map.height) return;
    let r = (y * map.width + x) * 4;
		let g = (y * map.width + x) * 4 + 1;
		let b = (y * map.width + x) * 4 + 2;
		let a = (y * map.width + x) * 4 + 3;
    if (map.data[r]===255 && map.data[g]===255 && map.data[b]===255) {
      return false;
    }
    // if (map.data[r]===85 && map.data[g]===142 && map.data[b]===213) {
    //   return true;
    // }

    return true;
    // return false;
  }

  // getPixel(x,y,map){
  //   if(x < 0 || y < 0 || x > map.width || y > map.height) return;
  //   let r = (y * map.width + x) * 4;
  //   let g = (y * map.width + x) * 4 + 1;
  //   let b = (y * map.width + x) * 4 + 2;
  //   let a = (y * map.width + x) * 4 + 3;

  //   // if (map.data[r]===85 && map.data[g]===142 && map.data[b]===213) {
  //   //   return true;
  //   // }
  //
  //   // return false;
  // }

  keyDown() {
    let KeyID = event.keyCode;
    if (KeyID === 37) {
				this.left_key = true;
		}
		if (KeyID === 39) {
			this.right_key = true;
		}
    if (KeyID === 32) {
			this.space_key = true;
		}
  }

  keyUp() {
    var KeyID = event.keyCode;
		if (KeyID === 37) {
			this.left_key = false;
		}
		if (KeyID === 39) {
			this.right_key = false;
		}
    if (KeyID === 32) {
			this.space_key = false;
		}
  }
}

export default Map;
