const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp"); // http://sharp.pixelplumbing.com/en/stable/api-constructor/ , https://developers.google.com/speed/webp/docs/cwebp

(async () => {
    const files = await new Promise((resolve, reject) => {
        glob("wwwrootsrc/**/*.{jpeg,jpg,png}", {}, async (er, files) => {
            !er ? resolve(files) : reject(er);
        });
    });

    let completed = 1;
    await Promise.all(
        files.map(async file => {
            const isManifest =
                file.indexOf("wwwrootsrc/core/content/images/manifest/") === 0;
            const outFile = file.replace(/^wwwrootsrc/, "wwwroot");
            const outDir = path.dirname(outFile);

            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, {recursive: true});
            }

            const origin = sharp(file);

            if (isManifest) {
                await origin.toFile(outFile);
                console.log(
                    `Complete image ${completed++} of ${files.length}:`,
                    file
                );
                return;
            }

            const size1920 = origin.resize({width: 1920});
            await size1920.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-1920w.$1")
            );
            await size1920.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-1920w.webp")
            );

            const size960 = origin.resize({width: 960});
            await size960.toFile(outFile.replace(/\.(jpeg|jpg|png)$/, "-960w.$1"));
            await size960.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-960w.webp")
            );

            const size480 = origin.resize({width: 480});
            await size480.toFile(outFile.replace(/\.(jpeg|jpg|png)$/, "-480w.$1"));
            await size480.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-480w.webp")
            );

            const size240 = origin.resize({width: 240});
            await size240.toFile(outFile.replace(/\.(jpeg|jpg|png)$/, "-240w.$1"));
            await size240.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-240w.webp")
            );

            const size120 = origin.resize({width: 120});
            await size120.toFile(outFile.replace(/\.(jpeg|jpg|png)$/, "-120w.$1"));
            await size120.toFile(
                outFile.replace(/\.(jpeg|jpg|png)$/, "-120w.webp")
            );

            console.log(`Complete image ${completed++} of ${files.length}:`, file);
        })
    );
})();