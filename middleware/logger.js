// Pretty console colors!
const colors = {
  reset: '\x1b[0m',
  blue: text => `\x1b[34m${text + colors.reset}`,
  green: text => `\x1b[32m${text + colors.reset}`,
  yellow: text => `\x1b[33m${text + colors.reset}`,
};

// Logger middleware
const logger = (req, res, next) => {
  console.log(
    `${colors.blue('[')}${colors.yellow(new Date().toISOString())}${colors.blue(
      ']'
    )} ${colors.green(req.method)} request made to to ${colors.blue(req.url)}`
  );

  next();
};

module.exports = logger;
