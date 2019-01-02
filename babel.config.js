module.exports = {
  presets: [
    '@vue/app'
  ],
  env: {
    "test": {
        "presets": [
            ["env", { "targets": { "node": "current" } }]
        ],
        "plugins": [
            "transform-vue-jsx",
            "transform-object-assign",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-runtime"
        ]
    }
  }
}
