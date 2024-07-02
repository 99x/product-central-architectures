const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const envConfig = require('../../libs/environments/src/index');

const remotes = (isServer) => {
    const location = isServer ? 'ssr' : 'chunks';

    return {
        ${{values.remoteAppName}}: `${{values.remoteAppName}}@${envConfig.${{values.remoteAppName}}Url}/_next/static/${location}/remoteEntry.js`,
    };
};

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        svgr: false,
    },
    output: 'export',
    images: {
        domains: ['cdn.dummyjson.com', 'dummyjson.com', 'i.dummyjson.com'],
    },
    /**
     *
     * @param {import('webpack').Configuration} config
     * @returns {import('webpack').Configuration}
     */
    webpack(config, { isServer }) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'host',
                filename: 'static/chunks/remoteEntry.js',
                remotes: remotes(isServer),
                extraOptions: {
                    automaticAsyncBoundary: true,
                },
                exposes: {},
                shared: {},
            }),
        );

        return config;
    },
};

module.exports = withNx(nextConfig);
