import TerserPlugin from 'terser-webpack-plugin';

function generateOptimization() {

    /** @type {import('webpack').Configuration.optimization}*/
    return {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: entrypoint => `${entrypoint.name}-runtime`,
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                // `terserOptions` options will be passed to `swc` (`@swc/core`)
                // Link to options - https://swc.rs/docs/config-js-minify
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    mangle: true,
                    compress: true
                },
            }),
        ],

    }
}


export default generateOptimization;
