class Connection extends require( './_Module' ) {
	
	constructor() {
		super();
		
		this.xmpp = require( 'node-xmpp' );
	}
	
	Connect( jid, password ) {
		
		this.connection = new this.xmpp.Client({
			jid: jid,
			password: password,
		});
		
		this.connection
			.on( 'error', ( data ) => {
				this.emit( 'error', data );
			})
			.on( 'offline', () => this.emit( 'disconnect' ) )
			.on( 'online', ( data ) => this._Send( 'interface simplified' ) )
			.on( 'stanza', ( stanza ) => {
				if ( stanza.attrs.from == 'bnw@bnw.im' ) {
					var body = stanza.getChild( 'body' );
					if ( body ) {
						var message = body.getText();
						if ( message == 'OK. Interface changed.' )
							this.emit( 'connect' );
						else
							this.emit( 'message', message );
					}
				}
			})
		;
		
	}

	Post( data ) {
		var str = '';
		if ( data.tags )
			data.tags.split( ',' ).forEach( tag => str += '*' + tag + ' ' );
		str += data.text;
		this._Send( str );
	}
	
	Comment( data ) {
		this._Send( data[ 'postid' ].trim() + ' ' + data[ 'text' ] );
	}
	
	_Send( msg ) {
		var stanza = new this.xmpp.Element( 'message', { to: 'bnw@bnw.im', type: 'chat', id: '123456' } ).c( 'body' ).t( msg );
		this.connection.send( stanza.tree() );
	}
		
}

module.exports = Connection;
