
/**
 * @author  Giuseppe Piscopo, giuseppe.piscopo@guest.telecomitalia.it
**/

const moment = require('moment');

function dateToCustomFormat(date, format='YYYY-MM-DDTHH:mm:ss') {
   if (!(date instanceof Date)) throw new Error('Argument should be instanceof Date');
      return moment(date).format(format);
}

module.exports.dateToCustomFormat = dateToCustomFormat;
