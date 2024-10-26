/**
 * @author Giuseppe Piscopo
**/

function errorHandler(err, req, res, next) {
   console.error(err.stack);

   /*if (err instanceof MyCustomError) {
       return res.status(500).json({ 
                  error: 'Custom Error: Something went wrong' 
              });
   } else if (err instanceof TypeError) {
       return res.status(400).json({ error: 'Type Error: Bad request' });
   }*/

   res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
