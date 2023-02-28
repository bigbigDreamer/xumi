import webpack from "webpack";
import fs from "fs";
import path from "../../lib/resolvePath.mjs";

function generateDefault(compiler, config) {

    let _progress;

    // 添加 ProgressPlugin 到编译器
    const progressPlugin = new webpack.ProgressPlugin((progress, message, moduleProgress, activeModules) => {
        _progress =progress;
    });

    // 向编译器添加进度插件
    progressPlugin.apply(compiler);

    return {
        static: {
            directory: path.appPath( "./dist")
        },
        port: 7070,
        compress: true,
        hot: true,
        historyApiFallback: true,
        open: true,
        devMiddleware: {
            index: true,
            writeToDisk: true
        },
        setupExitSignals: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        setupMiddlewares: (middlewares, devServer) => {
            const { app } = devServer;

            app.use('/startProgress', (req, res, next) => {
                res.json({progress: _progress});
            })


            middlewares.unshift({
                name: 'intersepter',
                path: '/',
                middleware: (req, res, next) => {
                        if(_progress < 1) {
                            const htmlPath = path.cliAbsolutePath('./beforeStart.html');
                            const html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
                            res.end(html);
                        } else {
                            next()
                        }
                },
            });
            return middlewares;
        }
    }
}

export default generateDefault;
