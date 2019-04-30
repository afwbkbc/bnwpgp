class Engine {

	constructor() {
		this.m = {};
		
		require( 'fs' ).readdirSync( './Module' ).forEach( ( file ) => {
			if ( file[ 0 ] != '_' ) {
				file = file.substring( 0, file.length - '.js'.length );
				this.m[ file ] = new ( require( './Module/' + file ) )();
			}
		});
	}
	
	Run() {
		
		var o;
		if ( !( o = this.m.CmdParser.Parse( process.argv ) ) )
			return;
		
		if ( o.data.postid && o.data.postid[ 0 ] != '#' )
			o.data.postid = '#' + o.data.postid;
		
		var exit_handler = ( message ) => {
			console.log( message );
			process.exit();
		};
		
		this.m.PGP
			.on( 'signed', ( signed_text ) => {
				o.data.text = signed_text;
				this.m.Connection
					.on( 'connect', () => this.m.Connection[ o.cmd[ 0 ].toUpperCase() + o.cmd.substring( 1 ) ]( o.data ) )
					.on( 'message', exit_handler)
					.on( 'error', exit_handler )
					.Connect( o.auth.jid, o.auth.password )
				;
			})
			.on( 'error', exit_handler )
			.Sign( o.data, o.gpguid )
		;
		
	}
}

module.exports = Engine;
