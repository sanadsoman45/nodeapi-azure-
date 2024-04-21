const passport = require("passport");
const BearerStrategy = require("passport-azure-ad").BearerStrategy;
require("dotenv").config();

passport.use(
  new BearerStrategy(
    {
      // Passport will use this URL to fetch the token validation information from Azure AD
      identityMetadata: `https://${process.env.authority}/${process.env.tenantID}/${process.env.version}/${process.env.discovery}`,
      issuer: `https://sts.windows.net/${process.env.tenantID}/`,
      clientID: process.env.clientID,
      audience: `${process.env.audience}`, 
      validateIssuer: process.env.validateIssuer,
      passReqToCallback: process.env.passReqToCallback,
      loggingLevel: process.env.loggingLevel,
      loggingNoPII: false,
      scope: ["access_as_user"],
    },
    function (token, done) {
      // Log the token value
      console.log("Received token:", token);
      return done(null, {}, token);
    }
  )
);

module.exports = function(req, res, next) {
  passport.authenticate("oauth-bearer", { session: false })(req, res, function(err) {
    if (err) { return next(err); }
    // Authentication successful, proceed to the next middleware or route handler
    next();
  });
};
