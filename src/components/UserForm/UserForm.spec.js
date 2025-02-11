import React from "react";
import { render, screen } from "@testing-library/react";
import { generateImage } from "jsdom-screenshot";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

jest.setTimeout(10000);

test("assertion for component default UI", async () => {
  const user = userEvent.setup();
  render(<UserForm />);

  expect(screen.getByText("First Name:")).toBeInTheDocument();

  const screenshot = await generateImage();
  expect(screenshot).toMatchImageSnapshot();
});

test("can also test for component layout after its state has changed", async () => {
  const user = userEvent.setup();
  render(<UserForm />);

  await user.type(screen.getByLabelText("First Name:"), "Jackson");

  expect(screen.getByLabelText("First Name:")).toHaveValue("Jackson");

  const screenshot = await generateImage();
  expect(screenshot).toMatchImageSnapshot();
});
