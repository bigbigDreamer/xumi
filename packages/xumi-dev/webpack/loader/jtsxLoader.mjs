import path from "../../lib/resolvePath.mjs";
import {dirname} from "path";

export default {
    test: /\.(js|ts)x?$/,    // add |ts
    include: path.appPath('./src'),
    exclude: /node_modules/,
    use: [{
        loader: path.require.resolve('babel-loader'),
        options: {
            presets: [
                [path.require.resolve('@babel/preset-env'),
                    {
                        useBuiltIns: 'usage',
                        corejs: {
                            version: 3.22,
                            proposals: true,
                        },
                        // 补全浏览器bug
                        bugfixes: true,
                    },
                ],
                path.require.resolve('@babel/preset-typescript'),
                [
                    path.require.resolve('@babel/preset-react'),
                    {
                        runtime: 'automatic',
                    },
                ],
            ],
            plugins: [
                [
                    path.require.resolve('@babel/plugin-transform-runtime'),
                    {
                        useESModules: true,
                        absoluteRuntime: dirname(path.require.resolve('@babel/runtime/package.json')),
                    },
                ],
            ]
        }
    }],
    sideEffects: true
};
