import { render } from "@testing-library/react";
import HomePage from ".";

test("Home: Renders HomePage", () => {
  const { getByText } = render(<HomePage />);
  const helloElement = getByText("HomePage");
  expect(helloElement.textContent).toEqual("HomePage");
});
