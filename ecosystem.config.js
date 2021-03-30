module.exports = {
    apps: [
        {
            name: "zhuoming-ts",
            script: "src/index.ts",
            watch: true,
            env_prod: {
                "NODE_ENV": "prod",
            }
        }
    ]
}