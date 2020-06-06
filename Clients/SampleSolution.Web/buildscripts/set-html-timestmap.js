const replace = require('replace-in-file');
const options = {
    files: [
        './wwwroot/*/index.html',
        './wwwroot/core/version.html'
    ],
    from: /{_VERSION_}/g,
    to: Date.now()
};

replace(options);