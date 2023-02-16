export default class SnakeTile{
    constructor(opt){
        this.parentState = opt.parentState;
        this.parentGroup = opt.parentGroup;
        this.col = opt.col;
        this.row = opt.row;
        this.x = opt.x;
        this.y = opt.y;
        this.w = opt.w;
        this.h = opt.h;
        this.color = null;
        this.scale = 1;
        this.rotation = 0;
        this.blur = 0;
        this.alpha = 1;
        this.borderRadius = 0;
        this.borderRadiusAmount = 0;
        this.elem = document.createElement( 'div' );
        this.elem.style.position = 'absolute';
        this.parentState.stageElem.appendChild( this.elem );
    }

    update(i){
        this.x = this.col * this.parentState.tileWidth;
        this.y = this.row * this.parentState.tileHeight;
        if( i == 0 ) {
        this.color = '#fff';
        this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.time.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
        if( this.parentState.snake.dir == 'n' ) {
            this.borderRadius = this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0 0';
        } else if( this.parentState.snake.dir == 's' ) {
            this.borderRadius = '0 0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '%';
        } else if( this.parentState.snake.dir == 'e' ) {
            this.borderRadius = '0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0';
        } else if( this.parentState.snake.dir == 'w' ) {
            this.borderRadius = this.borderRadiusAmount + '% 0 0 ' + this.borderRadiusAmount + '%';
        }
        } else {
            this.color = '#fff';
            this.blur = 0;
            this.borderRadius = '0';
        }
        this.alpha = 1 - ( i / this.parentState.snake.tiles.length ) * 0.6;
        this.rotation = ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 90;
        this.scale = 1 + ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 1;
    }

    updateDimensions(){
        this.w = this.parentState.tileWidth - this.parentState.spacing;
        this.h = this.parentState.tileHeight - this.parentState.spacing;
    }
    render(i){
        this.elem.style.left = this.x + 'px';
        this.elem.style.top = this.y + 'px';
        this.elem.style.width = this.w + 'px';
        this.elem.style.height = this.h + 'px';
        this.elem.style.backgroundColor = 'rgba(255, 255, 255, ' + this.alpha + ')';
        this.elem.style.boxShadow = '0 0 ' + this.blur + 'px #fff';
        this.elem.style.borderRadius = this.borderRadius;
    }
}

g.SnakeTile = function( opt ) {
    this.parentState = opt.parentState;
    this.parentGroup = opt.parentGroup;
    this.col = opt.col;
    this.row = opt.row;
    this.x = opt.x;
    this.y = opt.y;
    this.w = opt.w;
    this.h = opt.h;
    this.color = null;
    this.scale = 1;
    this.rotation = 0;
    this.blur = 0;
    this.alpha = 1;
    this.borderRadius = 0;
    this.borderRadiusAmount = 0;
    this.elem = document.createElement( 'div' );
    this.elem.style.position = 'absolute';
    this.parentState.stageElem.appendChild( this.elem );
  };

  g.SnakeTile.prototype.update = function( i ) {
    this.x = this.col * this.parentState.tileWidth;
    this.y = this.row * this.parentState.tileHeight;
    if( i == 0 ) {
      this.color = '#fff';
      this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.time.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
      if( this.parentState.snake.dir == 'n' ) {
        this.borderRadius = this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0 0';
      } else if( this.parentState.snake.dir == 's' ) {
        this.borderRadius = '0 0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '%';
      } else if( this.parentState.snake.dir == 'e' ) {
        this.borderRadius = '0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0';
      } else if( this.parentState.snake.dir == 'w' ) {
        this.borderRadius = this.borderRadiusAmount + '% 0 0 ' + this.borderRadiusAmount + '%';
      }
    } else {
      this.color = '#fff';
      this.blur = 0;
      this.borderRadius = '0';
    }
    this.alpha = 1 - ( i / this.parentState.snake.tiles.length ) * 0.6;
    this.rotation = ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 90;
    this.scale = 1 + ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 1;
  };

  g.SnakeTile.prototype.updateDimensions = function() {
    this.w = this.parentState.tileWidth - this.parentState.spacing;
    this.h = this.parentState.tileHeight - this.parentState.spacing;
  };

  g.SnakeTile.prototype.render = function( i ) {
    this.elem.style.left = this.x + 'px';
    this.elem.style.top = this.y + 'px';
    this.elem.style.width = this.w + 'px';
    this.elem.style.height = this.h + 'px';
    this.elem.style.backgroundColor = 'rgba(255, 255, 255, ' + this.alpha + ')';
    this.elem.style.boxShadow = '0 0 ' + this.blur + 'px #fff';
    this.elem.style.borderRadius = this.borderRadius;
  };