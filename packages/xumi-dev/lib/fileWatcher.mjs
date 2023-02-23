import { watch } from "chokidar";
import env from './getConfig.mjs';
import logger from "./logger.mjs";
import path from './resolvePath.mjs';

class FileWatcher {

    static rootPath = process.cwd();
    constructor() {
        this.filePath = path.appPath(env.XUMI_CONFIG_FILE);
        this.watcher = watch(this.filePath, {
            cwd: '.'
        });
    }

    watch(fn) {
        logger.notice('The file listening service is ready. The service will be automatically restarted ~');
        this.watcher.on('change', fn);
    }
}

export default new FileWatcher();
