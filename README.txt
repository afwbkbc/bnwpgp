# bnwpgp
Handy command-line tool to post PGP-signed messages

Prerequisites:
- Node.js + npm
- Private certificate created and/or imported to gpg

Installation:
git clone https://github.com/afwbkbc/bnwpgp.git &&
cd bnwpgp &&
npm install

Usage:
node main.js <jid> <password> <gpg user> <command> [<arguments>] <text...>

Examples:
node main.js kek@jabber.ru 'sds6S%Dsdg' gpg_bnw_huita post 'kek'
node main.js kek@jabber.ru 'sds6S%Dsdg' gpg_bnw_huita comment '#123456' 'kek'
node main.js kek@jabber.ru 'sds6S%Dsdg' gpg_bnw_huita comment '#123456/789' 'kek'
node main.js kek@jabber.ru 'sds6S%Dsdg' gpg_bnw_huita comment 123456 'kek'
node main.js kek@jabber.ru 'sds6S%Dsdg' gpg_bnw_huita comment '#123456' '
kek1
kek2
kek3
'
