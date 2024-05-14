import HomePage from ".";
import { render } from "@testing-library/react";

describe("HomePage", () => {
  it("Render title", () => {
    const { getByTestId } = render(<HomePage />);
    const title: HTMLElement = getByTestId("title");
    expect(title.textContent).toEqual("HomePage");
  });
});
