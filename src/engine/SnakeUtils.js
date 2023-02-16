export default class SnakeUtils{
    constructor(m){
        this.m = m;
    }
    rand(min, max){
        return this.m.random() * ( max - min ) + min;
    }
    randInt(min, max){
        return this.m.floor( g.m.random() * ( max - min + 1) ) + min;
    }
}
// g.util = {};

//   /*================================================

//   Random

//   ================================================*/
  
//   g.util.rand = function( min, max ) {
//     return g.m.random() * ( max - min ) + min;
//   };

//   g.util.randInt = function( min, max ) {
//     return g.m.floor( g.m.random() * ( max - min + 1) ) + min;
//   };