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
