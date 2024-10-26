
/**
 * @author  Giuseppe Piscopo, giuseppe.piscopo@guest.telecomitalia.it
**/

const {randomBytes} = require('crypto');
const blake2b = require('blake2b');

const BLAKE2B_SALT_SIZE = 16;
const DIGEST_SIZE = 32;


// Compute hash of a message using a salt
function computeHash(msg, salt){
   let hash = null;
   salt = Buffer.from(salt, 'hex');
   const hasher = blake2b(DIGEST_SIZE, undefined, salt);
   data = hasher.update(Buffer.from(msg));
   hash = data.digest('hex')
   return hash;
}

// Generate hash of a message and the used salt
function computeSaltedHash(msg){
   let hash = null;
   let salt = null;
   salt = randomBytes(BLAKE2B_SALT_SIZE);
   const hasher = blake2b(DIGEST_SIZE, undefined, salt);
   hash = hasher.update(Buffer.from(msg));

   hash = hash.digest('hex');
   salt = salt.toString('hex');

   return {hash, salt};
}

module.exports.computeHash = computeHash;
module.exports.computeSaltedHash = computeSaltedHash;
