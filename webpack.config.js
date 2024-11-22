const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: "production",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                    },
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts', '.json']
    },

    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build')
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: '.env', to: '.' },
                { from: 'package.json', to: '.' },
                { from: 'prisma', to: 'prisma' },
            ],
        })
    ]
};
