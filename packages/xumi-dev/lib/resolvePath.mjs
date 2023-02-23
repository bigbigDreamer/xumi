import { resolve } from "path";
import fg from 'fast-glob';
import { createRequire } from 'module';

import { __dirname, __filename } from "../helper.mjs";

const require = createRequire(import.meta.url);

export default {
    appPath: path  => resolve(process.cwd(), path),
    cliAbsolutePath: path => resolve(__dirname, path),
    cliRelativePath: path => resolve(__filename, path),
    matchPath: path => fg.sync(path, { dot: true }),
    require
}
