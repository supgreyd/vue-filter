module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '.'
        : '/',
    configureWebpack: {
        performance: {
            hints: "warning",
            maxAssetSize: 1048576,
            maxEntrypointSize: 1048576,
        }
    }
};
