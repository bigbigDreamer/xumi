import { resolve } from 'path';
import { watch } from "chokidar";

class FileWatcher {

    static rootPath = process.cwd();
    static fileName = 'xm.config.js';
    constructor() {
        this.filePath = resolve(FileWatcher.rootPath, FileWatcher.fileName);
        this.watcher = watch(this.filePath, {
            cwd: '.'
        })
    }

    watch(fn) {
        this.watcher.on('change', fn);
    }
}

export default new FileWatcher();
