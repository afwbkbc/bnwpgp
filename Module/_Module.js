class Module {

	constructor() {
		this.h = {};
	}
	
	on( event, callback ) {
		if ( !this.h[ event ] )
			this.h[ event ] = [];
		this.h[ event ].push( callback );
		return this;
	}
	
	off( event, callback ) {
		if ( this.h[ event ] ) {
			var index = this.h[ event ].indexOf( callback );
			if ( index > -1 )
				this.h[ event ].splice( index, 1 );
		}
		return this;
	}
	
	emit( event ) {
		var args = [];
		for ( var k in arguments )
			if ( k > 0 )
				args.push( arguments[ k ] );
		if ( this.h[ event ] ) {
			for ( var k in this.h[ event ] )
				if ( this.h[ event ][ k ].apply( this, args ) === false )
					break;
		}
		return this;
	}

}

module.exports = Module;
