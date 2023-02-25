/** @type {import('webpack').Configuration.module.rules[0]}*/
import styleLoader from "./styleLoader.mjs";
export default {
    test: /\.css$/,
    use: styleLoader
}
