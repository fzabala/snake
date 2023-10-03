import { screen, waitFor } from "@testing-library/react";
import { renderWithRouterAndProviders } from "./utils";
import App from "../App";
import { mswServer } from "./mocks/server";
import { tasksHandlerException, tasksHandlerValidationError } from "./mocks/handlers";

// Enable API mocking before tests.
beforeAll(() => mswServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => mswServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => mswServer.close());

test("renders app successfully", () => {
  renderWithRouterAndProviders(<App />);
  const homePageHeading = screen.getByText(/Homepage/i);
  expect(homePageHeading).toBeInTheDocument();
});

test("fetches products", async () => {
  const { container } = renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const productNameElement = await screen.findByText(/product one name/i);
  expect(productNameElement).toBeInTheDocument();
  const productDescriptionElement = await screen.findByText(/product one long description/i);
  expect(productDescriptionElement).toBeInTheDocument();

  expect(container.getElementsByClassName("ProductGrid")).toHaveLength(1);
  expect(container.getElementsByClassName("Product")).toHaveLength(2);
});

test("show error message", async () => {
  mswServer.use(tasksHandlerException);
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const errorMessage = await screen.findByText(
    /something went wrong/i
  );
  expect(errorMessage).toBeInTheDocument();
});

test("show validation error message", async () => {
  mswServer.use(tasksHandlerValidationError);
  renderWithRouterAndProviders(<App />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();

  const errorMessage = await screen.findByText(
    /Validation errors/i
  );
  expect(errorMessage).toBeInTheDocument();
  const errorMessage2 = await screen.findByText(
    /Fields with errors/i
  );
  expect(errorMessage2).toBeInTheDocument();
  const fieldErrorMessage = await screen.findByText(
    /some-field/i
  );
  expect(fieldErrorMessage).toBeInTheDocument();
  const fieldErrorMessage2 = await screen.findByText(
    /some-error/i
  );
  expect(fieldErrorMessage2).toBeInTheDocument();
});
