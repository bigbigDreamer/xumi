function generateOptimization() {

    /** @type {import('webpack').Configuration.optimization}*/
    return {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`,
        },
    }
}


export default generateOptimization;
