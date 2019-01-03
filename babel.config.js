module.exports = {
  presets: [
    '@vue/app'
  ],
  env: {
    "test": {
        "presets": [
            ["@babel/preset-env", { "targets": { "node": "current" } }]
        ],
        "plugins": [
            "transform-vue-jsx",
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
        ]
    }
  }
}
