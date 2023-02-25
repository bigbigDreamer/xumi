#!/usr/bin/env bun
import {createCommand} from "commander";
import {fork} from 'child_process';
import path from './lib/resolvePath.mjs';
import fw from './lib/fileWatcher.mjs';
import  syncProjectConfig from './lib/syncProjectConfig.mjs';

import logger from "./lib/logger.mjs";
class CoreDev {
    constructor() {

    }

    register() {
        const program = createCommand('DEV');

        program
            .usage('dev <options>')
            //@ts-ignore
            .option('-p,--port  <port>', 'server port', '8080')
            .option('--https', 'need start server with https')
            .option('-d,--debug', "start debug mode")
            .action(this.#handleOption)
            .parse(process.argv)
    }

    #handleOption = (...rest) => {
        const { port, https, debug } = rest[0];
        debug && (() => {
            logger.level = 'verbose';
        })()
        logger.verbose(rest)
        port && this.#handlePort(port);
        https && this.#handleHttps();
        syncProjectConfig();
        const serverQuit = this.#startServer();
        fw.watch((...rest) => this.#handleFw({ ...rest, serverQuit }));
    }

    #handlePort() {
        console.log("处理 port")
    }

    #handleHttps() {
        console.verbose("处理 https")
    }

    #startServer(isRestart) {
        let serverProcess;
        try {
            // args: [port, isRestart]
            serverProcess =  fork(
                path.cliAbsolutePath('./lib/server.mjs'),
        [['port', 8080], ['isRestart', isRestart ? 1 : 0]]
            );

            serverProcess.on('exit', code => code && process.exit(code));

            return () => serverProcess.kill();
        } catch (e) {
            logger.error(e.toString(), "openChildProcessError");
            return () => {
                process.exit(1);
            }
        }
    }

    #handleFw({ serverQuit }) {
        serverQuit();
        this.#startServer({ isRestart: true });
    }
}

export default CoreDev;
