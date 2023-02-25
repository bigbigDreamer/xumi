import env from '../lib/getConfig.mjs';
import path from '../lib/resolvePath.mjs';
import { generateDefaultPlugins } from './plugin/index.mjs';
import { generateDefaultLoaders } from "./loader/index.mjs";
import { generateDefaultOptimization } from './optimization/index.mjs';


/** @type {import('webpack').Configuration}*/
const config = {
    mode: 'development',
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
        // fallback: {
        //     assert: path.require.resolve('assert'),
        //     buffer: path.require.resolve('buffer'),
        //     constants: path.require.resolve('constants-browserify'),
        //     crypto: path.require.resolve('crypto-browserify'),
        //     domain: path.require.resolve('domain-browser'),
        //     events: path.require.resolve('events'),
        //     http: path.require.resolve('stream-http'),
        //     https: path.require.resolve('https-browserify'),
        //     os: path.require.resolve('os-browserify/browser'),
        //     path: path.require.resolve('path-browserify'),
        //     punycode: path.require.resolve('punycode'),
        //     process: path.require.resolve('process/browser'),
        //     querystring: path.require.resolve('querystring-es3'),
        //     stream: path.require.resolve('stream-browserify'),
        //     string_decoder: path.require.resolve('string_decoder'),
        //     sys: path.require.resolve('util'),
        //     timers: path.require.resolve('timers-browserify'),
        //     tty: path.require.resolve('tty-browserify'),
        //     url: path.require.resolve('url'),
        //     util: path.require.resolve('util'),
        //     vm: path.require.resolve('vm-browserify'),
        //     zlib: path.require.resolve('browserify-zlib'),
        // }
    },
    resolveLoader: {
        modules: ['node_modules'],
    },
    module: {
        ...generateDefaultLoaders()
    },
    plugins: [
        ...generateDefaultPlugins(),
    ],
    optimization: {
        ...generateDefaultOptimization()
    }
}
export default config;
