import { dirname } from 'path';
import webpack from 'webpack';
import env from '../lib/getConfig.mjs';
import path from '../lib/resolvePath.mjs';


/** @type {import('webpack').Configuration}*/
const config = {
    mode: 'production',
    entry: path.appPath(`./src/${env.INPUT_FILE_NAME}`),
    output: {
        filename: 'js/[name].js',
        path: path.appPath('./dist'),
        publicPath: '/',
        chunkFilename: 'js/[name].js',
        clean: true,
        crossOriginLoading: 'anonymous',
        hashDigestLength: 10,
    },
    resolve: {
        preferAbsolute: true,
        extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
        modules: [
            'node_modules',
            path.cliAbsolutePath('../../node_modules'), // some babel helpers in this project
        ],
    },
    resolveLoader: {
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,    // add |ts
                include: path.appPath('./src'),
                exclude: /node_modules/,
                use: [{
                    loader: path.require.resolve('babel-loader'),
                    options: {
                        presets: [[
                            path.require.resolve('@babel/preset-env'),
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3.18,
                                    proposals: true,
                                },
                                // 补全浏览器bug
                                bugfixes: true,
                            },
                        ], path.require.resolve('@babel/preset-typescript')],
                        plugins: [
                            [
                                path.require.resolve('@babel/plugin-transform-runtime'),
                                {
                                    absoluteRuntime: dirname(path.require.resolve('@babel/runtime/package.json')),
                                },
                            ],
                        ]
                    }
                }],
                sideEffects: true
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
    }
}
export default config;
