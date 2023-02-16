import jstrig from 'jstrig';
export default class SnakeGame{
    constructor({ x, y, width, height }){
        this.direction = { x: 1, y: 0};
        this.start = { x, y };
        this.width = width;
        this.height = height;
        this.onMove = null;
        this.gameOver = false;
        this.onPartAdded = null;
        this.onFoodPlaced = null;
        this.onGameOver = null;
        this.moveSize = 4;
        this.length = 5;
        this.food = {x: Math.floor(Math.random()*(width-(1 * this.moveSize))), y: Math.floor(Math.random()*(height-(1 * this.moveSize)))};
        this.isPlaying = true;
    }
    playGame(notFirst){
        let index = 0;
        if(!notFirst) {
            this.direction = { x: 1, y: 0};
            this.gameOver = false;
            this.isPlaying = true;
            this.placeFood();
            this.parts = [{ x: this.start.x, y: this.start.y, _x: this.start.x + (this.direction.x*-1), _y: this.start.y + (this.direction.y*-1) }];
            [...new Array(this.length).keys()].forEach(item => {
                this.addPart(this.parts[index]._x, this.parts[index]._y);
                index++;
            });
        }
        if(this.isPlaying) {
            this.afterMove();
            this.move();
        }
        
        setTimeout(() => {
            if(!this.gameOver) this.playGame(true);
        }, 100);
        
    }
    move(){
        console.log(this.parts.length);
        this.followHead();
        this.parts[0].x += this.direction.x * this.moveSize;
        this.parts[0].y += this.direction.y * this.moveSize;
        if(this.parts[0].x >= this.width) this.parts[0].x = 0;
        if(this.parts[0].y >= this.height) this.parts[0].y = 0;
        if(this.parts[0].x < 0) this.parts[0].x = this.width - (1 * this.moveSize);
        if(this.parts[0].y < 0) this.parts[0].y = this.height - (1 * this.moveSize);
        if(this.onMove) this.onMove(this.parts);
        if(jstrig.distance(this.parts[0], this.food) < this.moveSize) {
            this.placeFood();
            this.addPart(this.parts[this.parts.length-1].x, this.parts[this.parts.length-1].y);
        }
        if(this.checkForCrash()){
            this.gameOver = true;
            this.isPlaying = false;
            if(this.onGameOver) this.onGameOver();
        }
        
    }
    afterMove(){
        for(let i = 0; i < this.parts.length; i++){
            this.parts[i]._x = this.parts[i].x;
            this.parts[i]._y = this.parts[i].y;
        }
        
    }
    followHead(){
        for(let i = 1; i < this.parts.length; i++){
            this.parts[i].x = this.parts[i-1]._x;
            this.parts[i].y = this.parts[i-1]._y;
            this.parts[i].active = true;
        }
    }
    addPart(x, y){
        this.parts.push({x, y, _x: x, _y: y, active: false});
        if(this.onPartAdded) this.onPartAdded({x, y});
        
    }
    placeFood(){
        this.food = {x: Math.floor(Math.random()*(this.width-(1 * this.moveSize))), y: Math.floor(Math.random()*(this.height-(1 * this.moveSize)))};
        if(this.onFoodPlaced) this.onFoodPlaced();
    }

    changeDirection(x, y){
        if(x && this.direction.x){
            return;
        }
        if(y && this.direction.y){
            return;
        }
        this.direction = {x, y};
    }

    checkForCrash(){
        const activeParts = this.parts.filter(item => item.active);
        const crashedParts = activeParts.filter(item => jstrig.distance(item, this.parts[0]) < this.moveSize);
        return crashedParts.length;
    }
    
}