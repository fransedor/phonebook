import { DELETE_CONTACT_BY_ID } from "../services/delete";
import { GET_CONTACT_LIST } from "../services/list";

const mockContact = {
  created_at: "2023-04-04T01:38:33.782379+00:00",
  first_name: "master",
  id: 2659,
  last_name: "mister",
  phones: [
    {
      number: "020",
      __typename: "phone",
    },
  ],
  __typename: "contact",
};

export const mockContactWithMultiPhoneNumber = {
	created_at: "2023-04-04T01:38:33.782379+00:00",
  first_name: "master",
  id: 2659,
  last_name: "mister",
  phones: [
    {
      number: "020",
      __typename: "phone",
    },
    {
      number: "123",
      __typename: "phone",
    },
  ],
  __typename: "contact",
}

export const contactProviderMocks = [
  {
    request: {
      query: GET_CONTACT_LIST,
    },
    result: {
      data: {
        contact: [mockContactWithMultiPhoneNumber]
      }
    }
  },
  {
    request: {
      query: DELETE_CONTACT_BY_ID,
			variables: {
				id: 2659
			}
    },
    result: {
      data: {
        delete_contact_by_pk: {
					first_name: "Hello",
					last_name: "Hello",
					id: 1
				}
      }
    }
  },
	{
    request: {
      query: GET_CONTACT_LIST,
    },
    result: {
      data: {
        contact: [mockContactWithMultiPhoneNumber]
      }
    }
  },
];

export default mockContact
