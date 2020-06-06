module.exports = {
    parser: 'postcss-scss',
    plugins: [
        require('@csstools/postcss-sass')(/* node-sass options */),
        require('autoprefixer'),
        require('cssnano')({
            safe: true,
        })
    ]
};
