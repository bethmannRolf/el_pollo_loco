class MovableObject{
x;
y;
img;



//loadImage(''img/test.png')
loadImage(path){
    this.img = new Image()
    this.img.src = path;

}


moveRight(){
    console.log('Moving Right')
}

moveLeft(){

}


}