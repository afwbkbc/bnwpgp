class PGP extends require( './_Module' ) {
	
	constructor() {
		super();
		
		this.gpg = require( 'node-gpg' );
	}
	
	Sign( data, uid ) {
		
		var toenc = new Date().toString() + '\n';
		if ( data.postid )
			toenc += 'Reply to ' + data.postid + '\n';
		
		toenc += '\n' + data.text.trim() + '\n\n\* posted with bnwpgp ( https://github.com/afwbkbc/bnwpgp )\n';
		
		var t = this.gpg.sign( toenc, uid ).then( ( result ) => {
			this.emit( 'signed', result );
		}, ( error ) => {
			this.emit( 'error', error );
		});
			
		return data; 
	}
	
}

module.exports = PGP;
