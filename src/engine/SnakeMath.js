export default class SnakeMath{
    constructor(){
        this.m = Math;
        this.mapProps = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
        for ( var i = 0; i < this.mathProps.length; i++ ) {
            this[ this.mathProps[ i ] ] = this.m[ this.mathProps[ i ] ];
        }
        this.m.TWO_PI = this.m.PI * 2;
    }
    isset (prop) {
        return typeof prop != 'undefined';
    }
    log () {
        if( this.isset( g.config ) && this.config.debug && window.console ){
            console.log( Array.prototype.slice.call( arguments ) );
        }
    }
//     g.m = Math;
//   g.mathProps = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
//   for ( var i = 0; i < g.mathProps.length; i++ ) {
//     g[ g.mathProps[ i ] ] = g.m[ g.mathProps[ i ] ];
//   }
//   g.m.TWO_PI = g.m.PI * 2;

//   /*================================================

//   Miscellaneous

//   ================================================*/

//   g.isset = function( prop ) {
//     return typeof prop != 'undefined';
//   };

//   g.log = function() {
//     if( g.isset( g.config ) && g.config.debug && window.console ){
//       console.log( Array.prototype.slice.call( arguments ) );
//     }
//   };
}