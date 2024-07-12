const envType = process.env.APP_ENV || 'local';

let envConfig;

switch (envType) {
    case 'dev':
        envConfig = require('./lib/envTypes/dev');
        break;
    case 'demo':
        envConfig = require('./lib/envTypes/demo');
        break;
    case 'prod':
        envConfig = require('./lib/envTypes/prod');
        break;
    default:
        envConfig = require('./lib/envTypes/local');
        break;
}

module.exports = envConfig;
