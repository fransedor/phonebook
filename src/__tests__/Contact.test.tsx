import { render, screen } from "@testing-library/react";
import Contact, { ContactProps } from "../components/Contact";
import mockContact, { contactProviderMocks, mockContactWithMultiPhoneNumber } from "../__mocks__/contact";
import { ApolloProvider } from "@apollo/client";
import {MockedProvider} from "@apollo/client/testing";
import client from "../services/client";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
//const actual = jest.requireActual("../services/client.ts");
//const mockClient = jest.spyOn(actual, "default");

const mockReadQuery = jest.fn();
mockReadQuery.mockReturnValue(mockContactWithMultiPhoneNumber)
Object.defineProperty(client, "readQuery", {	
	value: mockReadQuery,
	configurable: true,
})

const renderContact = (props?: Partial<ContactProps>) => {
	render(
		<MockedProvider mocks={contactProviderMocks} addTypename={false}>
			<Contact
				contact={mockContact}
				onDelete={jest.fn()}
				onEdit={jest.fn()}
				onFavorite={jest.fn()}
				refetch={jest.fn()}
				{...props}
			/>
		</MockedProvider>
	);
}
describe("Contact", () => {
  it("should render not favorite contact", () => {
		renderContact()
    expect(screen.getByTestId("contact-container")).toBeInTheDocument();
    expect(screen.getByText("master", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("020")).toBeInTheDocument();
    expect(screen.getByTestId("edit-contact")).toBeInTheDocument();
    expect(screen.getByTestId("fav-contact")).toBeInTheDocument();
    expect(screen.getByTestId("delete-contact")).toBeInTheDocument();
  });
  it("should render favorite contact", () => {
		renderContact({ isFavorite: true })
    expect(screen.getByTestId("contact-container")).toBeInTheDocument();
    expect(screen.getByText("master", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("020")).toBeInTheDocument();
    expect(screen.getByTestId("edit-contact")).toBeInTheDocument();
    expect(screen.getByTestId("unfav-contact")).toBeInTheDocument();
    expect(screen.getByTestId("delete-contact")).toBeInTheDocument();
  });
	it("should trigger onclick for edit, favorite, and delete", async () => {
		renderContact();
		await user.click(screen.getByTestId("edit-contact"));
		await user.click(screen.getByTestId("fav-contact"));
		await user.click(screen.getByTestId("delete-contact"));
	})
	it("should trigger onclick for unfav", async () => {
		renderContact({ isFavorite: true });
		await user.click(screen.getByTestId("unfav-contact"));
	});
	it("should trigger on close in EditContactDialog", async () => {
		renderContact();
		await user.click(screen.getByTestId("edit-contact"));
		await user.click(screen.getByTestId("dialog"));
	})
	it("should render contact with multiple phone number", () => {
		renderContact({ contact: mockContactWithMultiPhoneNumber});
		expect(screen.getByText("020", { exact: false })).toBeInTheDocument();
		expect(screen.getByText("123", { exact: false })).toBeInTheDocument();
	})
});
