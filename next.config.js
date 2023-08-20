/** @type {import('next').NextConfig} */
const {version} = require('./package.json');

const nextConfig = {
    experimental: {
        appDir: true,
    },
    publicRuntimeConfig: {
        version,
    },
}

module.exports = nextConfig
