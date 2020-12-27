import nodeResolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";
import babel from "@rollup/plugin-babel";

const isSourceMap = false;
const isRelease = process.env.NODE_ENV === "production";
const app = process.env.APP;

const getPlugins = (config) => {
    const plugins = [];
    const isESNext = config.isESNext;

    plugins.push(nodeResolve({
        mainFields: ["module", "jsnext:main", "main"],
        extensions: [".mjs", ".js", ".jsx", ".json"]
    }));

    plugins.push(commonJs({
        include: "node_modules/**"
    }));

    if (!isESNext) {
        plugins.push(babel({ babelHelpers: 'bundled' }));
    }

    plugins.push(string({
        include: "**/*.scss",
    }));

    plugins.push(replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }));

    if (isRelease) {
        plugins.push(terser({
            parse: {
                // parse options
            },
            compress: {
                // compress options
            },
            mangle: {
                 // mangle options
            },
            output: {
                // output options
                max_line_len: 500
            },
            toplevel: true,
            ecma: isESNext ? 2016 : 5
        }));
    }

    plugins.push(visualizer({
        filename: `.stats/${config.appName.toLowerCase().replace(" ", "_")}_stat.html`,
        title: config.appName,
        sourcemap: isSourceMap
    }));

    return plugins;
};

/**
 * Tasks
 */

const tasks = [];

if (app === "Landing_es2020") {
    tasks.push({
        input: "wwwroot.tmp/landing/scripts/Main.js",
        output: {
            file: "wwwroot/landing/scripts/main.es2020.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "LandingES2019", isESNext: true })
    });
}

if (app === "Landing_es5") {
    tasks.push({
        input: "wwwroot.tmp/landing/scripts/Main.js",
        output: {
            file: "wwwroot/landing/scripts/main.es5.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "LandingES5", isESNext: false })
    });
}

if (app === "Cabinet_es2020") {
    tasks.push({
        input: "wwwroot.tmp/cabinet/scripts/Main.js",
        output: {
            file: "wwwroot/cabinet/scripts/main.es2020.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "CabinetES2019", isESNext: true })
    });
}

if (app === "Cabinet_es5") {
    tasks.push({
        input: "wwwroot.tmp/cabinet/scripts/Main.js",
        output: {
            file: "wwwroot/cabinet/scripts/main.es5.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "CabinetES5", isESNext: false })
    });
}

if (app === "Admin_es2020") {
    tasks.push({
        input: "wwwroot.tmp/admin/scripts/Main.js",
        output: {
            file: "wwwroot/admin/scripts/main.es2020.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "AdminES2019", isESNext: true })
    });
}

if (app === "Admin_es5") {
    tasks.push({
        input: "wwwroot.tmp/admin/scripts/Main.js",
        output: {
            file: "wwwroot/admin/scripts/main.es5.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "AdminES5", isESNext: false })
    });
}

if (app === "Login_es2020") {
    tasks.push({
        input: "wwwroot.tmp/login/scripts/Main.js",
        output: {
            file: "wwwroot/login/scripts/main.es2020.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "LoginES2019", isESNext: true })
    });
}

if (app === "Login_es5") {
    tasks.push({
        input: "wwwroot.tmp/login/scripts/Main.js",
        output: {
            file: "wwwroot/login/scripts/main.es5.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "LoginES5", isESNext: false })
    });
}

if (app === "Polyfills_es2020") {
    tasks.push({
        input: "wwwroot.tmp/core/scripts/polyfills.es2020.js",
        output: {
            file: "wwwroot/core/scripts/polyfills.es2020.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "PolyfillsES2019", isESNext: true })
    });
}

if (app === "Polyfills_es5") {
    tasks.push({
        input: "wwwroot.tmp/core/scripts/polyfills.es5.js",
        output: {
            file: "wwwroot/core/scripts/polyfills.es5.min.js",
            format: "iife",
            sourcemap: isSourceMap
        },
        plugins: getPlugins({ appName: "PolyfillsES5", isESNext: false })
    });
}

/*tasks.push({
    input: "wwwroot.tmp/core/scripts/pwa.serviceworker.js",
    output: {
        file: "wwwroot/pwa.serviceworker.min.js",
        format: "iife",
        sourcemap: isSourceMap
    },
    plugins: getPlugins({appName: "ServiceWorker", tsconfig: "tsconfig.pwa.json"})
});*/

export default tasks;
