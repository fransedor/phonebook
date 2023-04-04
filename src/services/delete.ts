import { TypedDocumentNode, gql } from "@apollo/client";

interface DeleteContactByIdVariable {
	id: number
}

interface DeleteContactByIdResponse {
	delete_contact_by_pk: {
		first_name: string;
		last_name: string;
		id: number;
	}
}
export const DELETE_CONTACT_BY_ID:TypedDocumentNode<DeleteContactByIdResponse, DeleteContactByIdVariable> = gql`
  mutation DeleteContactById($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;
