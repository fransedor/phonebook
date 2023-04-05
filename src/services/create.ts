import { gql, TypedDocumentNode } from "@apollo/client";
import { ContactDetailType, PhoneNumberType } from "./list";

interface AddContactWithPhonesVariables {
  first_name: string;
  last_name: string;
  phones: PhoneNumberType[];
}

interface AddContactWithPhonesResponse {
  insert_contact: {
    returning: Array<ContactDetailType & { phones: PhoneNumberType[] }>;
  };
}

export const ADD_CONTACT_WITH_PHONES: TypedDocumentNode<
  AddContactWithPhonesResponse,
  AddContactWithPhonesVariables
> = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

interface AddNumberToContactVariables {
	contact_id: number;
	phone_number: string;
}

interface AddNumberToContactResponse {
	insert_phone: {
		returning: {
			contact: ContactDetailType & { phones: PhoneNumberType[]}
		}
	}
}

export const ADD_NUMBER_TO_CONTACT:TypedDocumentNode<AddNumberToContactResponse, AddNumberToContactVariables> = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;