export default class SnakeStatePlay{
    constructor(states){
      this.name = 'play';
      this.states = states;

      this.states.addState( this );
      

    }
    init(){
      this.scoreElem = document.querySelector( '.score' );
      this.stageElem = document.querySelector( '.stage' );
      this.dimLong = 28;
      this.dimShort = 16;
      this.padding = 0.25;
      this.boardTiles = new g.Group();
      this.keys = {};
      this.foodCreateTimeout = null;
      this.score = 0;
      this.scoreElem.innerHTML = this.score;
      this.time = new g.Time();
      this.getDimensions();
      if( this.winWidth < this.winHeight ) {
        this.rows = this.dimLong;
        this.cols = this.dimShort;
      } else {
        this.rows = this.dimShort;
        this.cols = this.dimLong;
      }
      this.spacing = 1;
      this.grid = new g.Grid( this.cols, this.rows );
      this.resize();
      this.createBoardTiles();
      this.bindEvents();
      this.snake = new g.Snake({
        parentState: this
      });
      this.food = new g.Food({
        parentState: this
      });
    }
  getDimensions(){
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.activeWidth = this.winWidth - ( this.winWidth * this.padding );
    this.activeHeight = this.winHeight - ( this.winHeight * this.padding );
  }

  resize(){
    let _this = this.states.currentState();

    _this.getDimensions();

    _this.stageRatio = _this.rows / _this.cols;

    if( _this.activeWidth > _this.activeHeight / _this.stageRatio ) {
      _this.stageHeight = _this.activeHeight;
      _this.stageElem.style.height = _this.stageHeight + 'px';
      _this.stageWidth = Math.floor( _this.stageHeight /_this.stageRatio );
      _this.stageElem.style.width = _this.stageWidth + 'px';
    } else {
      _this.stageWidth = _this.activeWidth;
      _this.stageElem.style.width = _this.stageWidth + 'px';
      _this.stageHeight = Math.floor( _this.stageWidth * _this.stageRatio );
      _this.stageElem.style.height = _this.stageHeight + 'px';
    }

    _this.tileWidth = ~~( _this.stageWidth / _this.cols );
    _this.tileHeight = ~~( _this.stageHeight / _this.rows );
    _this.dimAvg = ( _this.activeWidth + _this.activeHeight ) / 2;
    _this.spacing = Math.max( 1, ~~( _this.dimAvg * 0.0025 ) );

    _this.stageElem.style.marginTop = ( -_this.stageElem.offsetHeight / 2 ) + _this.headerHeight / 2 + 'px';

    _this.boardTiles.each( 'updateDimensions' );
    _this.snake !== undefined && _this.snake.updateDimensions();
    _this.food !== undefined && _this.food.updateDimensions();
  }
  createBoardTiles(){
    for( var y = 0; y < this.rows; y++ ) {
      for( var x = 0; x < this.cols; x++ ) {
        this.boardTiles.add( new g.BoardTile({
          parentState: this,
          parentGroup: this.boardTiles,
          col: x,
          row: y,
          x: x * this.tileWidth,
          y: y * this.tileHeight,
          w: this.tileWidth - this.spacing,
          h: this.tileHeight - this.spacing
        }));
      }
    }
  }
  upOn() { this.states.currentState().keys.up = 1; }
  downOn() { this.states.currentState().keys.down = 1; }
  rightOn() { this.states.currentState().keys.right = 1; }
  leftOn() { this.states.currentState().keys.left = 1; }
  upOff() { this.states.currentState().keys.up = 0; }
  downOff() { this.states.currentState().keys.down = 0; }
  rightOff() { this.states.currentState().keys.right = 0; }
  leftOff () { this.states.currentState().keys.left = 0; }

  keyDown(){
    e.preventDefault();
    var e = ( e.keyCode ? e.keyCode : e.which ),
      _this = this.states.currentState();
    if( e === 38 || e === 87 ) { _this.upOn(); }
    if( e === 39 || e === 68 ) { _this.rightOn(); }
    if( e === 40 || e === 83 ) { _this.downOn(); }
    if( e === 37 || e === 65 ) { _this.leftOn(); }
  }
  buildEvents(){
    var _this = g.currentState();
    window.addEventListener( 'keydown', _this.keydown, false );
    window.addEventListener( 'resize', _this.resize, false );
  }
  step(){
    this.boardTiles.each( 'update' );
    this.boardTiles.each( 'render' );
    this.snake.update();
    this.snake.render();
    this.food.update();
    this.food.render();
    this.time.update();
  }

  exit(){
    window.removeEventListener( 'keydown', this.keydown, false );
    window.removeEventListener( 'resize', this.resize, false );
    this.stageElem.innerHTML = '';
    this.grid.tiles = null;
    this.time = null;
  }
}

function StatePlay() {
    this.name = 'play';
  }

  StatePlay.prototype.init = function() {
    this.scoreElem = document.querySelector( '.score' );
    this.stageElem = document.querySelector( '.stage' );
    this.dimLong = 28;
    this.dimShort = 16;
    this.padding = 0.25;
    this.boardTiles = new SnakeGroup();
    this.keys = {};
    this.foodCreateTimeout = null;
    this.score = 0;
    this.scoreElem.innerHTML = this.score;
    this.time = new SnakeTime();
    this.getDimensions();
    if( this.winWidth < this.winHeight ) {
      this.rows = this.dimLong;
      this.cols = this.dimShort;
    } else {
      this.rows = this.dimShort;
      this.cols = this.dimLong;
    }
    this.spacing = 1;
    this.grid = new SnakeGrid( this.cols, this.rows );
    this.resize();
    this.createBoardTiles();
    this.bindEvents();
    this.snake = new Snake({
      parentState: this
    });
    this.food = new SnakeFood({
      parentState: this
    });
  };

  StatePlay.prototype.getDimensions = function() {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.activeWidth = this.winWidth - ( this.winWidth * this.padding );
    this.activeHeight = this.winHeight - ( this.winHeight * this.padding );
  };

  StatePlay.prototype.resize = function() {
    var _this = this.states.currentState();

    _this.getDimensions();

    _this.stageRatio = _this.rows / _this.cols;

    if( _this.activeWidth > _this.activeHeight / _this.stageRatio ) {
      _this.stageHeight = _this.activeHeight;
      _this.stageElem.style.height = _this.stageHeight + 'px';
      _this.stageWidth = Math.floor( _this.stageHeight /_this.stageRatio );
      _this.stageElem.style.width = _this.stageWidth + 'px';
    } else {
      _this.stageWidth = _this.activeWidth;
      _this.stageElem.style.width = _this.stageWidth + 'px';
      _this.stageHeight = Math.floor( _this.stageWidth * _this.stageRatio );
      _this.stageElem.style.height = _this.stageHeight + 'px';
    }

    _this.tileWidth = ~~( _this.stageWidth / _this.cols );
    _this.tileHeight = ~~( _this.stageHeight / _this.rows );
    _this.dimAvg = ( _this.activeWidth + _this.activeHeight ) / 2;
    _this.spacing = Math.max( 1, ~~( _this.dimAvg * 0.0025 ) );

    _this.stageElem.style.marginTop = ( -_this.stageElem.offsetHeight / 2 ) + _this.headerHeight / 2 + 'px';

    _this.boardTiles.each( 'updateDimensions' );
    _this.snake !== undefined && _this.snake.updateDimensions();
    _this.food !== undefined && _this.food.updateDimensions();
  };

  StatePlay.prototype.createBoardTiles = function() {
    for( var y = 0; y < this.rows; y++ ) {
      for( var x = 0; x < this.cols; x++ ) {
        this.boardTiles.add( new g.BoardTile({
          parentState: this,
          parentGroup: this.boardTiles,
          col: x,
          row: y,
          x: x * this.tileWidth,
          y: y * this.tileHeight,
          w: this.tileWidth - this.spacing,
          h: this.tileHeight - this.spacing
        }));
      }
    }
  };

  StatePlay.prototype.upOn = function() { g.currentState().keys.up = 1; }
  StatePlay.prototype.downOn = function() { g.currentState().keys.down = 1; }
  StatePlay.prototype.rightOn = function() { g.currentState().keys.right = 1; }
  StatePlay.prototype.leftOn = function() { g.currentState().keys.left = 1; }
  StatePlay.prototype.upOff = function() { g.currentState().keys.up = 0; }
  StatePlay.prototype.downOff = function() { g.currentState().keys.down = 0; }
  StatePlay.prototype.rightOff = function() { g.currentState().keys.right = 0; }
  StatePlay.prototype.leftOff = function() { g.currentState().keys.left = 0; }

  StatePlay.prototype.keydown = function( e ) {
    e.preventDefault();
    var e = ( e.keyCode ? e.keyCode : e.which ),
      _this = g.currentState();
    if( e === 38 || e === 87 ) { _this.upOn(); }
    if( e === 39 || e === 68 ) { _this.rightOn(); }
    if( e === 40 || e === 83 ) { _this.downOn(); }
    if( e === 37 || e === 65 ) { _this.leftOn(); }
  };

  StatePlay.prototype.bindEvents = function() {
    var _this = g.currentState();
    window.addEventListener( 'keydown', _this.keydown, false );
    window.addEventListener( 'resize', _this.resize, false );
  };

  StatePlay.prototype.step = function() {
    this.boardTiles.each( 'update' );
    this.boardTiles.each( 'render' );
    this.snake.update();
    this.snake.render();
    this.food.update();
    this.food.render();
    this.time.update();
  };

  StatePlay.prototype.exit = function() {
    window.removeEventListener( 'keydown', this.keydown, false );
    window.removeEventListener( 'resize', this.resize, false );
    this.stageElem.innerHTML = '';
    this.grid.tiles = null;
    this.time = null;
  };

  g.addState( new StatePlay() );