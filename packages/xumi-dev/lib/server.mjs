import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import detect from 'detect-port';
import path from './resolvePath.mjs'
import logoPrint from "./logoPrint.mjs";
import logger from "./logger.mjs";
import { baseConfig } from '../webpack/index.mjs'

const parentArgs = process.argv.slice(2);
class XmServer {
    constructor() {
        this.complier = Webpack(baseConfig);
        this.server = new WebpackDevServer({
            static: {
                directory: path.appPath( "./dist")
            },
            compress: true,
            historyApiFallback: true,
            open: true,
            port: 8082,
            devMiddleware: {
                index: true,
                writeToDisk: true
            },
            client: {
                overlay: {
                    errors: true,
                    warnings: false,
                },
            },
        }, this.complier);
        this.start();
    }

    start() {
        try {
            this.server.startCallback((err) => {
                if(err) {
                    logger.error(err, "startCallbackError");
                    process.exit(1);
                }
                const [, o] = parentArgs;
                const [, isRestart] = o.split(',') || [];
                if(!Number(isRestart)) {
                    logoPrint();
                }
            })
        } catch (e) {
            logger.error(e, "startError");
            process.exit(1);
        }
    }
}

export default new XmServer();
