module.exports = {
    apps: [{
        name: 'fuxi',
        script: './dist/app.js',

        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        // args: 'one two',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development',
            port: 9222
        },
        env_production: {
            NODE_ENV: 'production',
            port: 9222
        }
    }]
};
