class MovableObject{
x = 120;
y = 280;
height = 150;
width = 100;
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