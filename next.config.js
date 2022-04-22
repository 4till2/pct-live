module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false
        };

        return config;
    },
    env: {
        instagram: "4till2",
        twitter: "4till2",
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};
