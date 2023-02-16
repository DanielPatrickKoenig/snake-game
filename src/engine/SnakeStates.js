export default class SnakeStates{
    constructor(){
        this.states = {};
        this.state = null;
    }

    addState(state){
        this.states[ state.name ] = state;
    }
    setState(name){
        if( this.state ) {
            this.states[ this.state ].exit();
        }
        this.state = name;
        this.states[ g.state ].init();
    }
    currentState(){
        this.states[this.state];
    }
}

g.states = {};

  g.addState = function( state ) {
    g.states[ state.name ] = state;
  };

  g.setState = function( name ) {
    if( g.state ) {
      g.states[ g.state ].exit();
    }
    g.state = name;
    g.states[ g.state ].init();
  };

  g.currentState = function() {
    return g.states[ g.state ];
  };