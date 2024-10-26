/**
 * @author Giuseppe Piscopo
**/

const pino = require('pino');

const levels = {
   emerg: 80,
   alert: 70,
   crit: 60,
   error: 50,
   warn: 40,
   notice: 30,
   info: 20,
   debug: 10,
};

const transport = pino.transport({
   targets: [
     /*{
       target: 'pino/file',
       options: { destination: `${__dirname}/server.log` },
     },*/
     {
       target: 'pino-pretty',
       options: {
         singleLine: true,
         append: false,
         colorize: false,
         translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l o",
         customPrettifiers: {},
       }
     },
   ],
 });

module.exports = pino(
   {
      level: process.env.PINO_LOG_LEVEL || 'info',
      customLevels: levels,
      useOnlyCustomLevels: true,
      formatters: {
         /*bindings: (bindings) => {
            return { pid: bindings.pid, host: bindings.hostname };
         },*/
         level: (label) => {
            return { level: label.toUpperCase() };
         },
      },
      timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
      //timestamp: pino.stdTimeFunctions.isoTime,
   },
   //transport
);
