/** @type {import('webpack').Configuration.module.rules[0]}*/
import styleLoader from "./styleLoader.mjs";
import path from '../../lib/resolvePath.mjs';
export default {
    test: /\.less$/,
    use: [
        ...styleLoader,
        {
            loader: path.require.resolve('less-loader'),
            options: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    ]
}
