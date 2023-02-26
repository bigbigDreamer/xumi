import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import logoPrint from "./logoPrint.mjs";
import logger from "./logger.mjs";
import { generateConfig } from '../webpack/index.mjs'
import { generateDefaultServerConfig } from '../webpack/server/index.mjs';

const parentArgs = process.argv.slice(2);
class XmServer {
    constructor() {
        const baseConfig = generateConfig()
        this.complier = Webpack(baseConfig);
        this.server = new WebpackDevServer({
            ...generateDefaultServerConfig(this.complier, baseConfig),
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
