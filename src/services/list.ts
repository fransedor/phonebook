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

type GetPhoneListResponse = {
  phone: Array<{ contact: ContactDetailType } & PhoneNumberType>;
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

export const GET_PHONE_LIST: TypedDocumentNode<GetPhoneListResponse, ContactListVariables> = gql`
  query GetPhoneList(
    $where: phone_bool_exp
    $distinct_on: [phone_select_column!]
    $limit: Int = 10
    $offset: Int = 0
    $order_by: [phone_order_by!]
  ) {
    phone(
      where: $where
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      contact {
        last_name
        first_name
        id
      }
      number
    }
  }
`;
