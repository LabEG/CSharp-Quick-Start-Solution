
const fs = require('fs');
fs.writeFileSync(
    "./node_modules/google-libphonenumber/dist/libphonenumber.js",
    "module.exports={PhoneNumberUtil:{getInstance(){return null;}}}"
);
