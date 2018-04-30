const util = require("util");
const http = require("http");

const countImages = 10;

const repoParser = /<a href=\"\/repo\/tags\/(.+?)\">(.+?)<\/a>/g;
const imagesParser = /<tr>[\s\S]+?<a.+?>(.+?)<\/a>[\s\S]+?<abbr title=\"(.+?)\">[\s\S]+?data-href=\"(.+?)\"[\s\S]+?<\/tr>/g;

http
    .get(
    {
        host: "docker.dev.local",
        port: 8080,
        path: "/"
    },
    function (res) {
        res.setEncoding("utf8");

        let content = "";

        res.on("data", function (chunk) {
            content += chunk;
        });

        res.on("end", function () {
            let match = repoParser.exec(content);

            while (match != null) {
                console.log(" === ", match[1], match[2]);
                if (match[2].indexOf("samplesolution/") === 0) {
                    cleanRepository("/repo/tags/" + match[1]);
                }
                match = repoParser.exec(content);
            }
        });
    })
    .on("error", function (e) {
        console.log("Repositories list request error: " + e.message);
    });

function cleanRepository(url) {
    http
        .get(
        {
            host: "docker.dev.local",
            port: 8080,
            path: url
        },
        function (res) {
            res.setEncoding("utf8");

            let content = "";
            const images = [];

            res.on("data", function (chunk) {
                content += chunk;
            });

            res.on("end", function () {
                let match = imagesParser.exec(content);

                while (match != null) {
                    images.push([match[1], new Date(match[2]), match[3]]);
                    match = imagesParser.exec(content);
                }

                images
                    .filter((image) => {
                        return (
                            image[0] !== "dev_latest" &&
                            image[0] !== "release_latest" &&
                            image[0].indexOf("dev_") === 0
                        )
                    })
                    .sort((imageA, imageB) => {
                        return imageB[1].getTime() - imageA[1].getTime();
                    })
                    .filter((image, index) => {
                        return index >= countImages;
                    })
                    .forEach((image) => {
                        console.log("   - ", image[0], image[1], image[2]);
                        removeImage(image[2]);
                    });
            });
        })
        .on("error", function (e) {
            console.log("Repository images request error: " + e.message);
        });
}

function removeImage(url) {
    http
        .get(
        {
            host: "docker.dev.local",
            port: 8080,
            path: url
        },
        function (res) {
            res.setEncoding("utf8");
        })
        .on("error", function (e) {
            console.log("Image delete request error: " + e.message);
        });
}