import { render, screen } from "@testing-library/react";
import FormInput from "../components/FormInput";

describe("Form Input", () => {
  it("should render ", () => {
     render(<FormInput name={"name"} />);
    expect(screen.getByTestId("form-input-name")).toBeInTheDocument();
  });
});