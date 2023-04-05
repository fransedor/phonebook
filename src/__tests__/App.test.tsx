import { render, screen } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { contactProviderMocks } from "../__mocks__/contact";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("App", () => {
  it("should render app", async () => {
    render(
      <MockedProvider mocks={contactProviderMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
		expect(await screen.findByText("Loading...")).toBeInTheDocument();
		expect(await screen.findByText("master", { exact: false})).toBeInTheDocument();
  });
	it("should favorite and unfavorite contact", async () => {
		render(
      <MockedProvider mocks={contactProviderMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
		expect(await screen.findByText("master", { exact: false})).toBeInTheDocument();
		await user.click(screen.getAllByTestId("fav-contact")[0]);
		await user.click(screen.getAllByTestId("unfav-contact")[0]);
	})
	it("should delete contact",async () => {
		render(
      <MockedProvider mocks={contactProviderMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
		expect(await screen.findByText("master", { exact: false})).toBeInTheDocument();
		await user.click(screen.getAllByTestId("delete-contact")[0]);
	})
});
