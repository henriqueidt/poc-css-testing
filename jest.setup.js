import "@testing-library/jest-dom";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { setDefaultOptions } from "jsdom-screenshot";

setDefaultOptions({
  launch: { args: ["--no-sandbox"] },
});
expect.extend({ toMatchImageSnapshot });
