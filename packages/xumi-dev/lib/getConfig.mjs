import { config } from 'dotenv';
import path from './resolvePath.mjs'

export default config({
    path: path.cliAbsolutePath('.env')
}).parsed;
