import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import path from '../../lib/resolvePath.mjs';

function generateDefault() {

    /** @type {import('webpack').Configuration.plugins}*/
    return [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/build.[contenthash:10].css',
            ignoreOrder: true,
        }),
        new HtmlWebpackPlugin({
            template: path.cliAbsolutePath('./template.ejs'),
            title: 'XuMi App'
        }),
        new CleanWebpackPlugin(),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] :percent (:elapsed s)`,
        }),
]
}


export default generateDefault;
