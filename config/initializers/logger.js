const winston = require('winston');
const expressWinston = require('express-winston');
const DailyRotateFile = require('winston-daily-rotate-file');

winston.addColors({ slack: 'magenta' });
winston.setLevels({ error: 0, slack: 1, warn: 2, info: 3, verbose: 4, debug: 5 });

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  handleExceptions: true,
  humanReadableUnhandledException: true,
  meta: false,
  json: false,
  colorize: true,
  timestamp: true,
  level: 'debug',
});

winston.add(DailyRotateFile, {
  name: 'logs',
  filename: 'logs/logs.log',
  datePattern: 'yyyy-MM-dd_',
  prepend: true,
  handleExceptions: false,
  humanReadableUnhandledException: true,
  meta: false,
  json: false,
  colorize: true,
  timestamp: true,
  level: 'debug',
});

winston.handleExceptions(new DailyRotateFile({
  name: 'exceptions',
  filename: 'logs/exceptions.log',
  datePattern: 'yyyy-MM-dd_',
  prepend: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  meta: true,
  json: false,
  colorize: true,
  timestamp: true,
}));

const loggedAsFormat = '(req.user._id || req.user.email ? req.user._id + "," + req.user.email : req.user)';
let msgFormat = '({{req.headers[\'x-forwarded-for\'] || req.ip}}) {{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}'; //eslint-disable-line
msgFormat += ` {{req.user ? "LOGGED_AS=" + ${loggedAsFormat} : "NOT_LOGGED"}}`;
msgFormat += ' {{JSON.stringify(req.body)}}';
msgFormat += ' {{res.body && res.body.error ? JSON.stringify(res.body) : ""}}';

const options = {
  winstonInstance: winston,
  meta: false,
  colorize: true,
  msg: msgFormat,
  ignoredRoutes: ['/lb', '/v1/lb', '/docs'],
  requestWhitelist: ['user', 'headers', 'method', 'httpVersion', 'url', 'query', 'ip'],
  bodyBlacklist: ['password', 'passwordConfirm', 'newPassword', 'newPasswordConfirm', 'doc', 'image', 'file'],
  responseWhitelist: ['statusCode', 'responseTime', 'body'],
  statusLevels: {
    success: 'info',
    warn: 'warn',
    error: 'error',
    debug: 'debug',
  },
  handleRequestOnlyOnce: true,
  preferHandleErrorRequest: true,
};

const errorOptions = Object.assign({}, options, {
  meta: true,
  skip: (err) => {
    if (err.name === 'UnauthorizedError' && err.message === 'jwt expired') return true;

    const ignoreErrors = ['TokenExpiredError'];
    return ignoreErrors.indexOf(err.name) >= 0;
  },
});


winston.exitOnError = false;

export const logger = winston;
export const expressWinstonMiddleware = expressWinston.logger(options);
export const expressWinstonErrorMiddleware = expressWinston.errorLogger(errorOptions);
