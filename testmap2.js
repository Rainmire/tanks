class Map {
  // const imageX = 0;
  // const imageY = 0;
  constructor(imageObj){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    this.imageX = 0;
    this.imageY = 0;

    this.tankX = 0;
    this.tankY = 0;

    var imageWidth = imageObj.width;
    var imageHeight = imageObj.height;

    context.drawImage(imageObj, this.imageX, this.imageY);

    this.terrainMap = context.getImageData(this.imageX, this.imageY, imageWidth, imageHeight);
    // this.terrainMap = imageData.data;

    this.drawTank();
    // this.frame();
  }
  drawTank () {
    var tankCanvas = document.getElementById('tankCanvas');
    var tankContext = tankCanvas.getContext('2d');

    // var imageX = 69;
    // var imageY = 50;
    // var imageWidth = imageObj.width;
    // var imageHeight = imageObj.height;

    /***
    tankContext.fillStyle = "red";
    tankContext.fillRect(this.tankX+this.imageX, this.tankY+this.imageY, 10,10);

    // this.context.drawImage(imageObj, imageX, imageY);
    //
    var imageData = tankContext.getImageData(this.imageX, this.imageY, 10, 10);
    this.tankMap = imageData.data;

    for(var i = 0, n = this.tankMap.length; i < n; i += 4) {
      var red = this.tankMap[i];
      var green = this.tankMap[i + 1];
      var blue = this.tankMap[i + 2];
      var alpha = this.tankMap[i + 3];
      console.log(red+", "+green+", "+blue+", "+alpha);
    }
    ***/

    // var data = this.imageData.data;
    //

    // tankContext.fillStyle = "red";
    var imageData = tankContext.createImageData(10,10);
    var tankMap = imageData.data;
    for(var i = 0, n = tankMap.length; i < n; i += 4) {
      tankMap[i] = 255;
      tankMap[i + 1] = 0;
      tankMap[i + 2] = 0;
      tankMap[i + 3] = 255;
    }


    tankContext.putImageData(imageData,this.tankX,this.tankY);
    // tankContext.drawImage(tankCanvas, 10, 10);

    // console.log(this.collisionTest(this.terrainMap, tankMap));
  }

  // frame() {
  //   this.moveTank();
  //   var that = this;
  //   setTimeout(function(){ that.frame(); }, 1000 / 60);
  // }
  //
  // moveTank() {
  //   //falling
  //
  // }

  collisionTest(smallerObj, biggerObj) {

    for (let i = 0; i < smallerObj.height; i++) {
      for (let j = 0; j < smallerObj.width; j++) {

      }
    }

    for (let i = 0; i < smallerObj.data.length; i++) {

    }

  }

  getPixel(x,y,map){
    if(x < 0 || y < 0 || x > map.width || y > map.height) return;
    let r = (y * map.width + x) * 4;
		let g = (y * map.width + x) * 4 + 1;
		let b = (y * map.width + x) * 4 + 2;
		let a = (y * map.width + x) * 4 + 3;

    if (map.data[r]===0 && map.data[g]===0 && map.data[b]===0 && map.data[a]===0) {
      return true;
    }
    return false;
  }



}

export default Map;