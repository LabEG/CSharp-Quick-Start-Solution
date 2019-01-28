// Include gulp
const gulp = require('gulp');
const browserSync = require("browser-sync").create();

gulp.task(
    'browsersync',
    function () {

        return browserSync.init(
            {

                port: 13000,
                ui: {
                    port: 13008,
                    weinre: {
                        port: 13009
                    }
                },
                proxy: {
                    target: "localhost:8087/sch/",
                    ws: true,
                    proxyReq: [ // Modify the server request before it hits your application
                        function (proxyReq) {
                            proxyReq.setHeader('X-Special-Proxy-Test-Header', 'test');
                        }
                    ],
                    proxyRes: [ // Modify the server response after it's returned from the proxy
                        function (proxyRes, req, res) {
                            // console.log(proxyRes.headers);
                        }
                    ]
                },
                files: "**/*.{css,js,html,jsp}"
            }
        );
    }
);
