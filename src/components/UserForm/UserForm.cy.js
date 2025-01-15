import React from "react";
import UserForm from "./UserForm";

describe("<UserForm />", () => {
  it("renders", () => {
    cy.viewport(1024, 768);

    cy.mount(<UserForm />);

    cy.matchImageSnapshot("user-form");
  });
});
