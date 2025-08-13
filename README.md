# poc-css-testing

The intent of this repository is to test and compare different approaches for testing UI, CSS and styles in general.

## What are we comparing?

- Performance (how long does it take to run the tests)
- Resistance to refactor (how hard it is to update the tests after code changes)
- Automation (how automated each strategy is, with less human interaction needed)
- How accurate are the tests (less false positives / false negatives)

## Chromatic

- Needs storybook stories to work
- Automatic tests against different browsers and devices
- Figma integration
- Team review and approval
- `$$$`

![Chromatic Diff](images/chromatic-changes.png)
![Chromatic Review](images/chromatic-review.png)

## Cypress

- Original lib (https://github.com/jaredpalmer/cypress-image-snapshot) very outdated (last update was in 2021)
- Fork from original lib being mantained (https://github.com/simonsmith/cypress-image-snapshot)
- Cypress comes up with several presets, which can be used to test across different viewports: https://docs.cypress.io/api/commands/viewport#Arguments

Using the presets, we can do many automated assertions among different device sizes and get the delta on the changes in a visual way:

```javascript
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
```

![User Form iPhone X Diff](cypress/snapshots/src/components/UserForm/UserForm.cy.js/__diff_output__/user-form-iphone-x.diff.png)

## BackstopJS

- Support for multiple viewports in config file
- URL centric
- Centralized in config file
- Several easy to use setup options for each scenario

```javascript
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],

    "scenarios": [
    {
      "label": "BackstopJS Homepage",
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "http://localhost:3000/",
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true
    }
  ],
```

![iPhone  Diff](images/backstopJS-report.png)

## JEST + jsdom-screenshot

- Able to add screenshot verification among existing jest tests
- Able to test different component states not only with different props, but after using userEvents to modify it!

```javascript
test("assertion for component default UI", async () => {
  render(<UserForm />);

  expect(screen.getByText("First Name:")).toBeInTheDocument();

  const screenshot = await generateImage();
  expect(screenshot).toMatchImageSnapshot();
});

test("can also test for component layout after its state has changed", async () => {
  const user = userEvent.setup();
  render(<UserForm />);

  await user.type(screen.getByLabelText("First Name:"), "John");

  expect(screen.getByLabelText("First Name:")).toHaveValue("John");

  const screenshot = await generateImage();
  expect(screenshot).toMatchImageSnapshot();
});
```

![Diff after userEvent](src/components/UserForm/__image_snapshots__/__diff_output__/user-form-spec-js-renders-component-and-matches-image-snapshot-1-snap-diff.png)
