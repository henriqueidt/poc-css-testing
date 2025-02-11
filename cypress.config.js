const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin.js");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on);
    },
  },
  e2e: {
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on);
    },
  },
});
