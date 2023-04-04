import { gql, TypedDocumentNode } from "@apollo/client";

export type ContactListInterface = ContactDetailType & { phones: PhoneNumberType[] };

export interface GetContactListResponse {
  contact: ContactListInterface[]
}

export type PhoneNumberType = {
  __typename?: string;
  number: string;
};
export type ContactDetailType = {
  __typename?: string;
  created_at?: string;
  first_name: string;
  id: number;
  last_name: string;
  updated_at?: string;
};

export interface ContactListVariables {
  limit?: number;
  offset?: number;
  order_by?: any;
  distinct_on?: any;
  where?: any;
}

export const GET_CONTACT_LIST: TypedDocumentNode<GetContactListResponse, ContactListVariables> = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

