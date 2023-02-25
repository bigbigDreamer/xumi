// 读取用户根目录配置
import fs from 'fs';

import path from './resolvePath.mjs';
import env from './getConfig.mjs';
import logger from "./logger.mjs";

function syncProjectConfig() {
    try {
        const config = path.require(path.appPath(env.XUMI_CONFIG_FILE));

        console.log(config);
    } catch (e) {
        logger.error(e.toString(), "Xumi: Read Config File Error!")
    }
}


export default syncProjectConfig;
