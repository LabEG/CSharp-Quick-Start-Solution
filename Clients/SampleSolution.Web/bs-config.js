
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

const { createProxyMiddleware } = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const proxy = createProxyMiddleware(
    (pathname, req) => pathname.match('^/api'),
    {
        target: "https://localhost:30103", // https://qss.labeg.ru https://localhost:30103
        secure: false
    }
);

module.exports = {
    https: true,
    open: false,
    watch: true,
    server: {
        baseDir: "./wwwroot/",
        middleware: [
            proxy,
            {
                route: "/",
                handle: function (req, res, next) {
                    res.writeHead(302, {
                        'Location': '/landing/'
                    });
                    res.end();
                    next();
                }
            },
            historyApiFallback({
                verbose: false,
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                rewrites: [
                    {
                      from: /^\/(\w+?)\/.*$/,
                      to: function(context) {
                        return `/${context.match[1]}/index.html`;
                      }
                    }
                  ]
              })
        ]
    }
};
