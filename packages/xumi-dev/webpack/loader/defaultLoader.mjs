import jtsxLoader from "./jtsxLoader.mjs";
import cssLoader from "./cssLoader.mjs";
import lessLoader from "./lessLoader.mjs";
import assetsLoader from "./assetsLoader.mjs";

function generateDefault() {
    /** @type {import('webpack').Configuration.module}*/
    return {
        rules: [
            jtsxLoader,
            cssLoader,
            lessLoader,
            ...assetsLoader
        ]
    }
}

export  default generateDefault;
