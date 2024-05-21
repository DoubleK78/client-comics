module.exports = {
    apps: {
        name: 'client-comics',
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        instances: 2,
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        listen_timeout: 10000, // PM2 will wait for maximum of 10 seconds to get "ready" signal from an instance.
        restart_delay: 10000, // Pnstances go down due to some unusual reason, PM2 will try to restart application instances automatically.
        max_memory_restart: '625M', // Restart app with exceed 80 percent memory
        env_prod: {
            NODE_ENV: 'production' // NODE_ENV: 'development' || NODE_ENV: 'test'
        }
    }
}