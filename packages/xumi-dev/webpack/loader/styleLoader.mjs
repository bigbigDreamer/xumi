/** @type {import('webpack').Configuration.module.rules[0]}*/
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from '../../lib/resolvePath.mjs'
export default [
    {
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: path.require.resolve('css-loader'),
        options: {
            modules: {
                auto: true,
            },
        }
    },
    {
        loader: path.require.resolve('postcss-loader'),
        options: {
            postcssOptions: {
                plugins: [path.require(path.require.resolve('autoprefixer'))],
            },
        },
    },
]
