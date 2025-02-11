import React from "react";
import UserForm from "./UserForm";
import { sizes } from "../../utils/test-utils.js";

export const sizes = [
  "ipad-2",
  "ipad-mini",
  "iphone-x",
  "iphone-xr",
  "macbook-13",
  "macbook-15",
  "samsung-note9",
  "samsung-s10",
];

describe("<UserForm />", () => {
  sizes.forEach((size) => {
    it(`renders on ${size}`, () => {
      cy.viewport(size);

      cy.mount(<UserForm />);

      cy.matchImageSnapshot(`user-form-${size}`);
    });
  });
});
