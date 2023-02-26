import path from "../../lib/resolvePath.mjs";
import {dirname} from "path";

export default {
    test: /\.(js|ts)x?$/,    // add |ts
    include: path.appPath('./src'),
    exclude: /node_modules/,
    use: [{
        loader: path.require.resolve('swc-loader'),
        options: {
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true,
                    decorators: true,
                    dynamicImport: true
                },
                externalHelpers: true,
                transform: {
                    react: {
                        runtime: 'automatic'
                    }
                }
            },
            env: {
                targets: "Chrome >= 48",
                mode: 'usage',
                loose: true,
                coreJs: "3.26.1",
                bugfixes: true,
            }

        }
    }],
    sideEffects: true
};
