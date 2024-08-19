/** @type {import('next').NextConfig} */
/* const nextConfig = {
    future: { webpack5: true },
    webpack: (config, { }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    },
}; */
const nextConfig = {
    future: { webpack5: true },
    webpack: (config, { isServer }) => {
        // Disable canvas and encoding aliases
        if (!isServer) {
            config.resolve.alias.canvas = false;
            config.resolve.alias.encoding = false;
        }

        return config;
    },
};

export default nextConfig;


/* const nextConfig = {
    future: { webpack5: true },
    webpack: (config, { isServer }) => {
        // Disable canvas and encoding aliases
        if (!isServer) {
            config.resolve.alias.canvas = false;
            config.resolve.alias.encoding = false;
        }

        return config;
    },
};

module.exports = nextConfig; */
