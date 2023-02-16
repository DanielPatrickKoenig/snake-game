export default class SnakeGrid{
    constructor(cols, rows){
        this.cols = cols;
        this.rows = rows;
        this.tiles = [];
        for( let x = 0; x < cols; x++ ) {
            this.tiles[ x ] = [];
            for( let y = 0; y < rows; y++ ) {
                this.tiles[ x ].push( 'empty' );
            }
        }
    }
    get(x, y){
        return this.tiles[ x ][ y ];
    }
    set(x, y, val){
        return this.tiles[ x ][ y ] = val;
    }
}

// g.Grid = function( cols, rows ) {
//     this.cols = cols;
//     this.rows = rows;
//     this.tiles = [];
//     for( var x = 0; x < cols; x++ ) {
//       this.tiles[ x ] = [];
//       for( var y = 0; y < rows; y++ ) {
//         this.tiles[ x ].push( 'empty' );
//       }
//     }
//   };

//   g.Grid.prototype.get = function( x, y ) {
//     return this.tiles[ x ][ y ];
//   };

//   g.Grid.prototype.set = function( x, y, val ) {
//     this.tiles[ x ][ y ] = val;
//   };