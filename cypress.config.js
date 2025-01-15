import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "@simonsmith/cypress-image-snapshot/plugin.js";

export default defineConfig({
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
