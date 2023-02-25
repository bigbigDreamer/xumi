import path from '../../lib/resolvePath.mjs';

export default [
    {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        generator: {
            filename: 'static/images/[name].[contenthash][ext]',
        },
    },
    {
        test: /\.svg$/,
        type: 'asset',
        generator: {
            filename: 'static/images/[name].[contenthash][ext]',
        },
        use: [
            {
                loader: path.require.resolve('svg-sprite-loader'),
            },
            path.require.resolve('svgo-loader'),
        ]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
            filename: 'static/fonts/[name].[contenthash][ext]',
        },
    }
]
