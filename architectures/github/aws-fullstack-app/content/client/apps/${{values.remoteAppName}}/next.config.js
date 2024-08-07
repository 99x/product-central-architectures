const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        svgr: false,
    },
    output: 'export',
    /**
     *
     * @param {import('webpack').Configuration} config
     * @returns {import('webpack').Configuration}
     */
    webpack(config) {
        config.plugins.push(
            new NextFederationPlugin({
                name: '${{values.remoteAppName}}',
                filename: 'static/chunks/remoteEntry.js',
                remotes: {},
                extraOptions: {
                    automaticAsyncBoundary: true,
                },
                exposes: {
                    './page': './pages/index.tsx',
                },
                shared: {},
            }),
        );

        return config;
    },
};

module.exports = withNx(nextConfig);
