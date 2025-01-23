import React from "react";
import { render } from "@testing-library/react";
import { generateImage } from "jsdom-screenshot";
import UserForm from "./UserForm";

jest.setTimeout(10000);

test("renders component and matches image snapshot", async () => {
  render(<UserForm />);
  const screenshot = await generateImage();

  expect(screenshot).toMatchImageSnapshot();
});
