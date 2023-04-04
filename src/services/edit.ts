import { gql, TypedDocumentNode } from "@apollo/client";
import { ContactDetailType, ContactListInterface, PhoneNumberType } from "./list";

interface EditContactByIdVariables {
  id: number;
  _set: Partial<ContactDetailType>;
}

interface EditContactByIdResponse {
  update_contact_by_pk: ContactListInterface;
}

export const EDIT_CONTACT_BY_ID: TypedDocumentNode<
  EditContactByIdResponse,
  EditContactByIdVariables
> = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
