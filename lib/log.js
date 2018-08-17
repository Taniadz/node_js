var winston = require("winston");
var ENV = process.env.NODE_ENV;


function getLogger(modelr) {
    var path = module.filename.split("/").slice(-2).join('/');
    return winston.createLogger({
        transports: [

            new winston.transports.Console({
                level: ENV == 'development' ? 'debug' : 'error',
                label: path
            })
        ],

    });
}
module.exports = getLogger;