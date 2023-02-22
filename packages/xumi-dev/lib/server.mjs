import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
class XmServer {
    constructor() {
        this.complier = Webpack({});
        this.server = new WebpackDevServer({}, this.complier);
    }

    start() {
        this.server.startCallback(() => {
            console.log("Server Staring~~~");
        })
    }
}
