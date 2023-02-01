module.exports = [
  {
    name: "api",
    script: "src/index.js",
    exec_mode: "cluster",
    instances: "max",
  },
]
