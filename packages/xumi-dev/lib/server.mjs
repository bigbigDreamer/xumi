import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import detectPort from 'detect-port';
import { omit } from "lodash-es";
import logoPrint from "./logoPrint.mjs";
import logger from "./logger.mjs";
import { generateConfig } from '../webpack/index.mjs'

const parentArgs = process.argv.slice(2);
class XmServer {
    constructor() {
        const baseConfig = generateConfig()
        this.complier = Webpack(omit(baseConfig, ['devServer']));
        const devServerConf = baseConfig.devServer(this.complier, baseConfig);

        // @important: detectPort can't check 1000 levelDown port
        detectPort(devServerConf.port)
            .then(_port => {
                if (devServerConf.port === _port) {
                    logger.info(`port: ${devServerConf.port} was not occupied`);
                } else {
                    logger.warn(`port: ${devServerConf.port} was occupied, try port: ${_port}`);
                }

                this.server = new WebpackDevServer({
                    ...devServerConf,
                    port: _port
                }, this.complier);
                this.start();

                process.on('SIGINT', () => {
                    this.server.stop();
                    process.exit(1);
                });

                process.on('SIGTERM', () => {
                    this.server.stop();
                    process.exit(1);
                });
            })

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
