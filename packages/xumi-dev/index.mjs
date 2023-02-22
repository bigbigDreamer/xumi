#!/usr/bin/env bun
import {createCommand} from "commander";
import fw from './lib/fileWatcher.mjs';
class CoreDev {
    constructor() {
        fw.watch(this.#startServer);
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
        const { port, https } = rest[0];
        console.log(rest)
        port && this.#handlePort(port);
        https && this.#handleHttps();
    }

    #handlePort() {
        console.log("处理 port")
    }

    #handleHttps() {
        console.log("处理 https")
    }

    #startServer() {
        console.log("启动");
    }
}

export default CoreDev;
