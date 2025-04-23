module.exports = {
  apps: [
    {
      name: 'shopper-next',
      script: 'npm run start',
      env: {
        NODE_OPTIONS: '--max-old-space-size=4096',
      },
    },
  ],
}
