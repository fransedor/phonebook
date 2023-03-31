import { gql, TypedDocumentNode } from "@apollo/client";
import { ContactDetailType, PhoneNumberType } from "./list";

interface EditContactByIdVariables {
  id: number;
  _set: ContactDetailType;
}

interface EditContactByIdResponse {
  update_contact_by_pk: ContactDetailType & { phones: PhoneNumberType[] };
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

interface EditPhoneNumberVariables {
	pk_columns: {
		number: string;
		contact_id: number
	}
	new_phone_number: string;
}

interface EditPhoneNumberResponse {
	update_phone_by_pk: {
		contact: ContactDetailType & { phones: PhoneNumberType[]}
	}
}
export const EDIT_PHONE_NUMBER = gql`
  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number: String!) {
    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;
