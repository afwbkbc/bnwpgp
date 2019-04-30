class CmdParser extends require( './_Module' ) {
	
	Parse( args ) {
		
		args = args.splice( 2 );
		if ( args.length < 3 ) {
			console.log( 'Usage: node main.js <jid> <password> <gpguid> <command> ...' );
			return false;
		}
		
		var o = {
			auth: {
				jid: args[ 0 ],
				password: args[ 1 ],
			},
			data: {},
		};
		
		const commands = {
			post: [ 'text' ],
			comment: [ 'postid', 'text' ],
		};
			
		o.gpguid = args[ 2 ];
		o.cmd = args[ 3 ];
		
		args = args.splice( 3 );
		
		var cv, a;
		if ( !( cv = commands[ o.cmd = args[ 0 ] ] ) ) {
			console.log( 'Invalid command. Supported commands: ' + Object.keys( commands ).join( ', ' ) );
			return false;
		}
		
		args = args.splice( 1 );
		if ( args.length < cv.length ) {
			console.log( 'Usage: node main.js <jid> <password> ' + o.cmd + ' <' + cv.join( '> <' ) + '...>' );
			return false;
		}
		
		var i = 0;
		cv.forEach( ( c ) => o.data[ c ] = '' );
		args.forEach( ( a ) => o.data[ ( i < cv.length ) ? cv[ i++ ] : cv[ cv.length - 1 ] ] += a + ' ' );
		
		return o;
	}
	
}

module.exports = CmdParser;
