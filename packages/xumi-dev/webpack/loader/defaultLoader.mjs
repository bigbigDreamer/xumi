import jtsxLoader from "./jtsxLoader.mjs";
import cssLoader from "./cssLoader.mjs";
import lessLoader from "./lessLoader.mjs";
import assetsLoader from "./assetsLoader.mjs";
import swcLoader from "./swcLoader.mjs";

function generateDefault() {
    /** @type {import('webpack').Configuration.module}*/
    return {
        rules: [
            // jtsxLoader,
            swcLoader,
            cssLoader,
            lessLoader,
            ...assetsLoader
        ]
    }
}

export  default generateDefault;
